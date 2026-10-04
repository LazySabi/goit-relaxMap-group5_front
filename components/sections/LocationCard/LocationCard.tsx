import Image from 'next/image';
import Link from 'next/link';
import type { Location } from '@/lib/api/locationsApi';
import css from './LocationCard.module.css';

type Props = {
  location: Location;
  typeName?: string;
};

export default function LocationCard({ location, typeName }: Props) {
  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image
          src={location.image}
          alt={location.name}
          fill
          sizes="(min-width: 1440px) 421px, (min-width: 768px) 50vw, 100vw"
          className={css.image}
        />
      </div>

      <div className={css.info}>
        <p className={css.type}>{typeName ?? location.locationType}</p>

        {/* TODO: <Rating value={location.rate} />*/}
        <div className={css.rating} aria-hidden="true" />

        <h3 className={css.name}>{location.name}</h3>

        <Link href={`/locations/${location._id}`} className={css.btn}>
          Переглянути локацію
        </Link>
      </div>
    </article>
  );
}