import LocationInfoBlock from "./LocationInfoBlock";
import LocationDescription from "./LocationDescription";
import type { Location } from "@/lib/api/locationsApi";
import ReviewsSection from "./ReviewsSection";
import css from "./LocationDetailsPage.module.css";

type Props = {
  location: Location;
};

export default function LocationDetailsPage({ location }: Props) {
  return (
    <main className={css.page}>
      <div className="container">
        <LocationInfoBlock location={location} />
        <LocationDescription description={location.description} />
        <ReviewsSection locationId={location._id} />
      </div>
    </main>
  );
}