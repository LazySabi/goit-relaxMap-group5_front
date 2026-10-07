'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import LocationForm from '@/components/LocationForm/LocationForm';
import {
  getLocationById,
  type Location,
} from '@/lib/api/locationsApi';
import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './EditLocationPage.module.css';

export default function EditLocationPage() {
  const params = useParams<{ locationId: string }>();
  const locationId = params.locationId;
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLocation = async () => {
      try {
        setIsLoading(true);
        setError('');

        // 1. Хто зараз залогінений (по cookie, а не по localStorage)
        let me;
        try {
          me = await getMe();
          setUser(me);
        } catch {
          router.replace('/sign-in');
          return;
        }

        const data = await getLocationById(locationId);

        // 2. Редагувати може тільки автор локації
        const ownerId = data.ownerId ?? data.author?.id;
        if (String(ownerId) !== String(me._id)) {
          toast.error('Редагувати можна тільки власні локації.');
          router.replace(`/locations/${locationId}`);
          return;
        }

        setLocation(data);
      } catch (error) {
        console.error(error);
        setError('Не вдалося завантажити дані місця.');
      } finally {
        setIsLoading(false);
      }
    };

    loadLocation();
  }, [locationId, router, setUser]);

  if (isLoading) {
    return <p className={css.message}>Завантаження...</p>;
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!location) {
    return <p className={css.message}>Завантаження...</p>;
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
