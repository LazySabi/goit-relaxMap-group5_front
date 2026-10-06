"use client";

import type { ReactNode } from "react";
import css from "./ReviewsBlock.module.css";
import ReviewCard from "./ReviewsCard";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedbacks } from "@/lib/api/feedbacks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedbacks", locationId ?? "all"],
    queryFn: () => fetchFeedbacks(locationId),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження відгуків</p>;

 return (
    <section className={css.section}>
      <div className={css.header}>
        <h2 className={css.title}>{title}</h2>
        {action}
      </div>

      {data?.feedbacks.length === 0 && (
        <p className={css.empty}>Відгуків поки немає. Будьте першим!</p>
      )}

      <div className={css.swiperWrapper}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${css.prev}`,
            nextEl: `.${css.next}`,
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: { slidesPerView: 2 },
            1440: { slidesPerView: 3 },
          }}
        >
          {data?.feedbacks.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={css.prev} aria-label="Попередній">
          ←
        </button>
        <button className={css.next} aria-label="Наступний">
          →
        </button>
      </div>
    </section>
  );
};
export default ReviewsBlock;
