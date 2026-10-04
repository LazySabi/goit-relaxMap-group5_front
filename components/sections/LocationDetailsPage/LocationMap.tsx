import styles from './LocationMap.module.css';

interface LocationMapProps {
  lat?: number;
  lng?: number;
}

export default function LocationMap({ lat, lng }: LocationMapProps) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Location on map</h2>
      {lat && lng ? (
        <div className={styles.mapPlaceholder}>
          Map: {lat}, {lng}
        </div>
      ) : (
        <div className={styles.mapPlaceholder}>Map is unavailable</div>
      )}
    </section>
  );
}