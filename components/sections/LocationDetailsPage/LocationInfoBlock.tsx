import Link from 'next/link';
import styles from './LocationInfoBlock.module.css';

type LocationInfoBlockProps = {
  name: string;
  region: string;
  locationType: string;
  author: {
    id: string;
    name: string;
  };
};

export default function LocationInfoBlock({
  name,
  region,
  locationType,
  author,
}: LocationInfoBlockProps) {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{name}</h1>

      <dl className={styles.details}>
        <div className={styles.row}>
          <dt className={styles.label}>Регіон</dt>
          <dd className={styles.value}>{region}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.label}>Тип локації</dt>
          <dd className={styles.value}>{locationType}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.label}>Автор</dt>
          <dd className={styles.value}>
            <Link
              href={`/profile/${encodeURIComponent(author.id)}`}
              className={styles.authorLink}
            >
              {author.name}
            </Link>
          </dd>
        </div>
      </dl>
    </div>
  );
}