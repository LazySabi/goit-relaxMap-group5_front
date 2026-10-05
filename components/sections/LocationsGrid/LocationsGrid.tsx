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

  const { data: types = [] } = useQuery({
    queryKey: ['location-types'],
    queryFn: getLocationTypes,
    staleTime: Infinity,
  });
  const typeNames = Object.fromEntries(types.map((t) => [t.slug, t.type]));

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['locations', query],
    queryFn: ({ pageParam }) => getLocations({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.totalPages ? last.page + 1 : undefined,
  });

  const allLocations = data?.pages.flatMap((p) => p.data) ?? [];
  const locations = Array.from(
    new Map(allLocations.map((loc) => [loc._id, loc])).values(),
  );

  const handleShowMore = async () => {
    const prevCount = locations.length;
    await fetchNextPage();
    requestAnimationFrame(() => {
      gridRef.current?.children[prevCount]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  if (
    isLoading ||
    (isFetching && !isFetchingNextPage && locations.length === 0)
  ) {
    return (
      <div className={css.loader} role="status" aria-label="Завантаження" />
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
        {locations.map((loc) => (
          <li key={loc._id} className={css.item}>
            <LocationCard
              location={loc}
              typeName={typeNames[loc.locationType]}
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