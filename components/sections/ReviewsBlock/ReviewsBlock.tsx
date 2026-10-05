"use client";

import css from "./ReviewsBlock.module.css";
import ReviewCard from "./ReviewsCard";
import { useQuery } from "@tanstack/react-query";
import { fetchFeedbacks } from "@/lib/api/feedbacks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ReviewsBlock = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => fetchFeedbacks(),
  });

  console.log("FEEDBACKS:", data);

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження відгуків </p>;

  return (
    <section className={css.section}>
      <h2 className={css.title}>Останні відгуки</h2>
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
