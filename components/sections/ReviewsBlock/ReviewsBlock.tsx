"use client";

import { useRef, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";

import { fetchFeedbacks } from "@/lib/api/feedbacks";
import ReviewCard from "./ReviewsCard";
import css from "./ReviewsBlock.module.css";

interface ReviewsBlockProps {
  locationId?: string;
  title?: string;
  action?: ReactNode;
}

const ReviewsBlock = ({
  locationId,
  title = "Останні відгуки",
  action,
}: ReviewsBlockProps) => {

  const swiperRef = useRef<SwiperType | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedbacks", locationId ?? "all"],
    queryFn: () => fetchFeedbacks(locationId),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження відгуків</p>;


  const feedbacks = Array.isArray(data?.feedbacks) ? data.feedbacks : [];

  return (
    <section className={css.section}>
      <div className={css.header}>
        <h2 className={css.title}>{title}</h2>
        {action}
      </div>

      {feedbacks.length === 0 ? (
        <p className={css.empty}>Відгуків поки немає. Будьте першим!</p>
      ) : (
        <div className={css.swiperWrapper}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              768: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
          >
            {feedbacks.map((review) => (
              <SwiperSlide key={review._id} className={css.slide}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.controls}>
            <button
              type="button"
              className={css.prev}
              aria-label="Попередній відгук"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              ←
            </button>
            <button
              type="button"
              className={css.next}
              aria-label="Наступний відгук"
              onClick={() => swiperRef.current?.slideNext()}
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsBlock;