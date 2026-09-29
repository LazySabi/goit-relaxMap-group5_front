'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import LocationForm from '@/components/LocationForm/LocationForm';
import {
  getLocationById,
  type Location,
} from '@/lib/api/locationsApi';

import css from './EditLocationPage.module.css';

export default function EditLocationPage() {
  const params = useParams<{ locationId: string }>();
  const locationId = params.locationId;

  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLocation = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getLocationById(locationId);

        setLocation(data);
      } catch (error) {
        console.error(error);
        setError('Не вдалося завантажити дані місця.');
      } finally {
        setIsLoading(false);
      }
    };

    loadLocation();
  }, [locationId]);

  if (isLoading) {
    return <p className={css.message}>Завантаження...</p>;
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!location) {
    return <p className={css.error}>Місце не знайдено.</p>;
  }

  return (
    <LocationForm
      mode="edit"
      locationId={locationId}
      initialData={{
        image: location.image,
        name: location.name,
        type: location.locationType,
        region: location.region,
        description: location.description,
      }}
    />
  );
}