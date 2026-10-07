import css from "./StarRating.module.css";

const SPRITE = "/sprite.svg";

interface StarRatingProps {
  rate: number;
  size?: number;
}

export default function StarRating({ rate, size = 16 }: StarRatingProps) {

  const value = Math.min(5, Math.max(0, Math.round((Number(rate) || 0) * 2) / 2));

  return (
    <div
      className={css.stars}
      role="img"
      aria-label={`Рейтинг ${value} з 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const icon =
          value >= star
            ? "star_filled"
            : value >= star - 0.5
              ? "star_half"
              : "star_empty";

        return (
          <svg
            key={star}
            className={css.star}
            width={size}
            height={size}
            aria-hidden="true"
          >
            <use href={`${SPRITE}#${icon}`} />
          </svg>
        );
      })}
    </div>
  );
}