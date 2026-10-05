import css from "./StarRating.module.css";

interface StarRatingProps {
  rate: number;
}

export default function StarRating({ rate }: StarRatingProps) {
  return (
    <div className={css.stars}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rate >= star;
        const half = !filled && rate >= star - 0.5;

        return (
          <span key={star} className={css.star}>
            {filled ? "★" : half ? "⯨" : "☆"}
          </span>
        );
      })}
    </div>
  );
}
