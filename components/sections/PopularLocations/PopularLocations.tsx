"use client";

import { useEffect, useRef, useState } from "react";
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
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const swiperRef = useRef<SwiperType | null>(null);

  // Получаем список типов локаций
  const { data: types = [] } = useQuery({
    queryKey: ["location-types"],
    queryFn: getLocationTypes,
    staleTime: Infinity,
  });

  // Создаём соответствие: slug → название
  // hory → Гори
  // more → Море
  const typeNames = Object.fromEntries(
    types.map((type) => [type.slug, type.type]),
  );

  useEffect(() => {
    const loadPopularLocations = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getPopularLocations();

        setLocations(data);
      } catch (error) {
        console.error(error);
        setError("Не вдалося завантажити популярні локації.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularLocations();
  }, []);

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

        {isLoading && (
          <p className={css.message}>Завантаження...</p>
        )}

        {!isLoading && error && (
          <p className={css.message}>{error}</p>
        )}

        {!isLoading && !error && locations.length > 0 && (
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
                768: {
                  slidesPerView: 2,
                },
                1440: {
                  slidesPerView: 3,
                },
              }}
            >
              {locations.map((location) => (
                <SwiperSlide
                  key={location._id}
                  className={css.slide}
                >
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

        {!isLoading && !error && locations.length === 0 && (
          <p className={css.message}>
            Популярних локацій поки немає.
          </p>
        )}
      </div>
    </section>
  );
};

export default PopularLocations;