"use client";

import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import "swiper/css";

import LocationCard from "@/components/sections/LocationCard/LocationCard";
import {
  getPopularLocations,
  getLocationTypes,
  type Location,
} from "@/lib/api/locationsApi";

import css from "./PopularLocations.module.css";

const PopularLocations = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: types = [] } = useQuery({
    queryKey: ["location-types"],
    queryFn: getLocationTypes,
    staleTime: Infinity,
  });


  const typeNames = Object.fromEntries(
    (Array.isArray(types) ? types : []).map((type) => [type.slug, type.type]),
  );

  const {
    data: locations = [],
    isLoading,
    isError,
  } = useQuery<Location[]>({
    queryKey: ["popular-locations"],
    queryFn: async () => {
      const data = await getPopularLocations();
    
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60,
  });

  const hasLocations = locations.length > 0;

  return (
    <section
      className={css.section}
      aria-labelledby="popular-locations-title"
    >
      <div className={`container ${css.container}`}>
        <div className={css.header}>
          <h2 id="popular-locations-title" className={css.title}>
            Популярні локації
          </h2>

          <Link href="/locations" className={css.allLocations}>
            Всі локації
          </Link>
        </div>

        {isLoading && <p className={css.message}>Завантаження...</p>}

        {!isLoading && isError && (
          <p className={css.message}>
            Не вдалося завантажити популярні локації.
          </p>
        )}

        {!isLoading && !isError && hasLocations && (
          <>
            <Swiper
              className={css.slider}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={locations.length > 3}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1440: { slidesPerView: 3 },
              }}
            >
              {locations.map((location) => (
                <SwiperSlide key={location._id} className={css.slide}>
                  <LocationCard
                    location={location}
                    typeName={typeNames[location.locationType]}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={css.controls}>
              <button
                type="button"
                className={css.arrowButton}
                aria-label="Попередня локація"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FiArrowLeft />
              </button>

              <button
                type="button"
                className={css.arrowButton}
                aria-label="Наступна локація"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FiArrowRight />
              </button>
            </div>
          </>
        )}

        {!isLoading && !isError && !hasLocations && (
          <p className={css.message}>Популярних локацій поки немає.</p>
        )}
      </div>
    </section>
  );
};

export default PopularLocations;