import clsx from "clsx";
import css from "./RatingStars.module.css";
import Icon from "../Icon/Icon";

// 0.0 ---- (0.5 - <value>) ---- 0.5 ---- (0.5 + <value>) ---- 1.0
// Empty           |            Half            |             Full
const HALF_STAR_VALUE_MARGIN = 0.2999;

interface RatingStarsProps {
  value: number;
  className?: string;
}

export default function RatingStars({ value, className }: RatingStarsProps): React.ReactNode {
  const stars = new Array(5)
    .fill(Math.max(0, Math.min(5, value)))
    .map((v, idx) => {
      if (v - idx >= 0.5 + HALF_STAR_VALUE_MARGIN) return "star_filled";
      else if (v - idx >= 0.5 - HALF_STAR_VALUE_MARGIN) return "star_half";
      else return "star_empty";
    })
    .map((v, idx) => <Icon key={idx} name={v} />);

  return <div className={clsx(css["rating-stars"], className)}>{stars}</div>;
}
