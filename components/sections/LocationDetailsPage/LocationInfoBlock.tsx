import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/lib/api/locationsApi";
import css from "./LocationInfoBlock.module.css";

type LocationInfoBlockProps = {
  location: Location;
  authorName: string;
};

export default function LocationInfoBlock({
  location,
}: LocationInfoBlockProps) {
  return (
    <section className={css.section}>
      <div className={css.layout}>
        <div className={css.content}>

        {/* треба буде замінити цей блок на імпортований блок з рейтингом */}
        <div className={css.rating}>
            <span aria-hidden="true">★★★★★</span>
            <span>{location.rate}</span>
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
          <Link
            href={`/profile/${location.ownerId}`}
            className={css.authorLink}
          >
            {/* Автор статті буде додано після появи потрібного API-маршруту */}
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