import css from "./ReviewsCard.module.css";
import StarRating from "./StarRating";

export interface Review {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  locationType?: string;
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className={css.card}>
      <StarRating rate={review.rate} />
      <p className={css.text}> {review.description}</p>
      <p className={css.author}> {review.userName}</p>
      {review.locationType && <p className={css.type}>{review.locationType}</p>}
    </div>
  );
};
export default ReviewCard;
