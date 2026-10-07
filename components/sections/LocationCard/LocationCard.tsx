import Image from 'next/image';
import Link from 'next/link';
import type { Location } from '@/lib/api/locationsApi';
import RatingStars from '@/components/ui/RatingStars/RatingStars';
import css from './LocationCard.module.css';

type Props = {
  location: Location;
  typeName?: string;
};

export default function LocationCard({ location, typeName }: Props) {
  const rate = Number(location.rate) || 0;

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

        <div className={css.rating}>
          <RatingStars value={rate} />
        </div>

        <h3 className={css.name}>{location.name}</h3>

        <Link
          href={`/locations/${location._id}`}
          className={css.btn}
          prefetch={false}
        >
          Переглянути локацію
        </Link>
      </div>
    </article>
  );
}