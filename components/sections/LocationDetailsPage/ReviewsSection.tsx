import Link from "next/link";
import ReviewsBlock from "../ReviewsBlock/ReviewsBlock";
import css from "./ReviewsSection.module.css";

type ReviewsSectionProps = {
  locationId: string;
};

export default function ReviewsSection({ locationId }: ReviewsSectionProps) {
  return (
    <ReviewsBlock
      locationId={locationId}
      title="Відгуки"
      action={
        <Link
          href={`/locations/${locationId}/review`}
          scroll={false}
          className={css.button}
        >Залишити відгук</Link>
      }
    />
  );
}