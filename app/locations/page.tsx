import { Suspense } from 'react';
import LocationsPage from '../../components/sections/LocationsPage/LocationsPage';

export default function Locations() {
  return (
    <Suspense>
      <LocationsPage />
    </Suspense>
  );
}