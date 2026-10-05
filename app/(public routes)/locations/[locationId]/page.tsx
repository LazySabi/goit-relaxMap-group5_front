import LocationDetailsPage from '../../../../components/sections/LocationDetailsPage/LocationDetailsPage';

const testLocation = {
  name: 'Тестова локація',
  image: '/location-test.png',
  description:
    'Це тестовий опис локації для перевірки відображення сторінки.',
  region: 'Київська область',
  locationType: 'Парк',
  rate: 0,
  author: {
    id: 'test-author',
    name: 'Тестовий автор',
  },
};

export default function LocationPage() {
  return <LocationDetailsPage location={testLocation} />;
}