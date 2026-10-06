'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getLocations,
  getLocationTypes,
  type LocationsQuery,
  type LocationsSort,
} from '@/lib/api/locationsApi';

import LocationCard from '../LocationCard/LocationCard';
import css from './LocationsGrid.module.css';

const PER_PAGE = 9;

const SORT_VALUES: LocationsSort[] = ['popular', 'rating', 'newest'];

export default function LocationsGrid() {
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLUListElement>(null);

  const sortParam = searchParams.get('sort');

  const sort: LocationsSort = SORT_VALUES.includes(sortParam as LocationsSort)
    ? (sortParam as LocationsSort)
    : 'popular';

  const query: LocationsQuery = {
    search: searchParams.get('search') ?? undefined,
    region: searchParams.get('region') ?? undefined,
    type: searchParams.get('type') ?? undefined,
    limit: PER_PAGE,
    sort,
  };

  const { data: types = [], isLoading: isTypesLoading } = useQuery({
    queryKey: ['location-types'],
    queryFn: getLocationTypes,
    staleTime: Infinity,
  });

  const typeNames = Object.fromEntries(
    (Array.isArray(types) ? types : []).flatMap((type) => [
      [type.slug, type.type],
      [type._id, type.type],
      [type.type, type.type],
    ]),
  );

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['locations', query],
    queryFn: ({ pageParam }) => getLocations({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const allLocations = data?.pages.flatMap((page) => page.data ?? []) ?? [];

  const locations = Array.from(
    new Map(allLocations.map((location) => [location._id, location])).values(),
  );

  const handleShowMore = async () => {
    const previousCount = locations.length;

    await fetchNextPage();

    requestAnimationFrame(() => {
      gridRef.current?.children[previousCount]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  if (
    isLoading ||
    isTypesLoading ||
    (isFetching && !isFetchingNextPage && locations.length === 0 && !isError)
  ) {
    return (
      <div className={css.loader} role="status" aria-label="Завантаження" />
    );
  }

  // Помилка запиту більше не маскується під "Нічого не знайдено"
  if (isError && locations.length === 0) {
    console.error('Помилка завантаження локацій:', error);

    return (
      <div className={css.empty}>
        <p className={css.emptyTitle}>Не вдалося завантажити локації</p>
        <p>Перевірте з'єднання та спробуйте ще раз.</p>
        <button type="button" className={css.moreBtn} onClick={() => refetch()}>
          Спробувати знову
        </button>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className={css.empty}>
        <p className={css.emptyTitle}>Нічого не знайдено</p>
        <p>Спробуйте змінити пошуковий запит або фільтри.</p>
      </div>
    );
  }

  return (
    <>
      <ul className={css.grid} ref={gridRef}>
        {locations.map((location) => (
          <li key={location._id} className={css.item}>
            <LocationCard
              location={location}
              typeName={typeNames[location.locationType] ?? location.locationType}
            />
          </li>
        ))}
      </ul>

      {isFetchingNextPage && (
        <div className={css.loader} role="status" aria-label="Завантаження" />
      )}

      {hasNextPage && (
        <div className={css.more}>
          <button
            type="button"
            className={css.moreBtn}
            onClick={handleShowMore}
            disabled={isFetchingNextPage}
          >
            Показати ще
          </button>
        </div>
      )}
    </>
  );
}