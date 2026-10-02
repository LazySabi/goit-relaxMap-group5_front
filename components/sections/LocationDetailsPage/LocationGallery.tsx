import Image from 'next/image';
import styles from './LocationGallery.module.css';

type LocationGalleryProps = {
  image: string;
  name: string;
};

export default function LocationGallery({
  image,
  name,
}: LocationGalleryProps) {
  return (
    <div className={styles.gallery}>
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 1440px) 55vw, 100vw"
        className={styles.image}
      />
    </div>
  );
}