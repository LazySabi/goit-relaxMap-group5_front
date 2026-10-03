import styles from './LocationDescription.module.css';

interface LocationDescriptionProps {
  description: string;
}

export default function LocationDescription({
  description,
}: LocationDescriptionProps) {
  return (
    <section className={styles.wrapper}>
      <p className={styles.text}>{description}</p>
    </section>
  );
}