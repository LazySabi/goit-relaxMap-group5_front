import LocationDescription from './LocationDescription';
import LocationGallery from './LocationGallery';
import LocationInfoBlock from './LocationInfoBlock';
import styles from './LocationDetailsPage.module.css';

type LocationDetailsPageProps = {
  location: {
    name: string;
    image: string;
    description: string;
    region: string;
    locationType: string;
    author: {
      id: string;
      name: string;
    };
  };
};

export default function LocationDetailsPage({
  location,
}: LocationDetailsPageProps) {
  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.hero}>
        <div className={styles.gallery}>
          <LocationGallery
            image={location.image}
            name={location.name}
          />
        </div>

        <div className={styles.info}>
          <LocationInfoBlock
            name={location.name}
            region={location.region}
            locationType={location.locationType}
            author={location.author}
          />
        </div>
      </div>

      <LocationDescription description={location.description} />
    </div>
  );
}