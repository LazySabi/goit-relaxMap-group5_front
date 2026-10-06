import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/lib/api/locationsApi";
import css from "./LocationInfoBlock.module.css";
import StarRating from "@/components/sections/ReviewsBlock/StarRating";

type LocationInfoBlockProps = {
  location: Location;
};

export default function LocationInfoBlock({
  location,
}: LocationInfoBlockProps) {
  const author = location.author;

  return (
    <section className={css.section}>
      <div className={css.layout}>
        <div className={css.content}>
        <div className={css.rating}>
  <StarRating rate={location.rate} />
  <span className={css.rateValue}>·{location.rate.toFixed(1)}</span>
</div>

          <h1 className={css.title}>{location.name}</h1>

          <p className={css.text}>
            <span>Регіон:</span> {location.region}
          </p>

          <p className={css.text}>
            <span>Тип локації:</span> {location.locationType}
          </p>

          <p className={css.text}>
  <span>Автор статті:</span>{" "}
  <Link href={`/profile/${location.author?.id}`} className={css.authorLink}>
    {author?.name}
  </Link>
</p>
        </div>

        <div className={css.gallery}>
          <Image
            src={location.image}
            alt={location.name}
            fill
            priority
            className={css.image}
            sizes="(min-width: 1440px) 60vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}