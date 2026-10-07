// import RatingStars from "../../ui/RatingStars/RatingStars";
// import css from "./ReviewsCard.module.css";

// export interface Review {
//   _id: string;
//   rate: number;
//   description: string;
//   userName: string;
//   locationId?: {
//     _id: string;
//     name: string;
//   };
// }

// const ReviewCard = ({ review }: { review: Review }) => {
//   return (
//     <div className={css.card}>
//       <RatingStars value={review.rate} />

//       <p className={css.text}>{review.description}</p>

//       <div className={css.authorInfo}>
//         <p className={css.author}>{review.userName}</p>

//         {review.locationId?.name && (
//           <p className={css.type}>{review.locationId.name}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewCard;
import StarRating from "./StarRating";

export interface Review {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  locationType?: string;
  locationName?: string;
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className={css.card}>
      <StarRating rate={review.rate} />

      <p className={css.text}>{review.description}</p>
      <div className={css.authorInfo}>
        <p className={css.author}>{review.userName}</p>
        {review.locationName && (
          <p className={css.type}>{review.locationName}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
