'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getLocationTypes, getRegions } from '@/lib/api/locationsApi';
const SPRITE = '/sprite.svg';
import css from './FilterPanel.module.css';

const SORT_OPTIONS = [
  { value: 'popular', label: 'За популярністю' },
  { value: 'rating', label: 'За рейтингом' },
  { value: 'newest', label: 'Новіші спочатку' },
];

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`${css.chevron} ${open ? css.chevronOpen : ''}`}
      width="16"
      height="16"
      aria-hidden="true"
    >
      <use href={`${SPRITE}#keyboard_arrow_down`} />
    </svg>
  );
}

export default function FilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: regions = [] } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: Infinity,
  });
  const { data: types = [] } = useQuery({
    queryKey: ['location-types'],
    queryFn: getLocationTypes,
    staleTime: Infinity,
  });

  const region = searchParams.get('region') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const selectedTypes =
    searchParams.get('type')?.split(',').filter(Boolean) ?? [];

  const updateParams = useCallback(
    (patch: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([k, v]) =>
        v ? params.set(k, v) : params.delete(k),
      );
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  useEffect(() => {
    if (search.trim() === (searchParams.get('search') ?? '')) return;
    const t = setTimeout(() => updateParams({ search: search.trim() }), 400);
    return () => clearTimeout(t);
  }, [search, searchParams, updateParams]);

  const [typesOpen, setTypesOpen] = useState(false);
  const typesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!typesRef.current?.contains(e.target as Node)) setTypesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggleType = (slug: string) => {
    const next = selectedTypes.includes(slug)
      ? selectedTypes.filter((s) => s !== slug)
      : [...selectedTypes, slug];
    updateParams({ type: next.join(',') });
  };

  return (
    <div className={css.panel}>
      <input
        className={`${css.control} ${css.search}`}
        type="search"
        placeholder="Пошук"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={`${css.selectWrap} ${css.region}`}>
        <select
          className={css.control}
          value={region}
          onChange={(e) => updateParams({ region: e.target.value })}
        >
          <option value="">Регіон</option>
          {regions.map((r) => (
            <option key={r._id} value={r.slug}>
              {r.region}
            </option>
          ))}
        </select>
        <Chevron />
      </div>

      <div className={`${css.selectWrap} ${css.type}`} ref={typesRef}>
        <button
          type="button"
          className={`${css.control} ${css.typeBtn}`}
          onClick={() => setTypesOpen((o) => !o)}
          aria-expanded={typesOpen}
        >
          {selectedTypes.length
            ? `Тип локації (${selectedTypes.length})`
            : 'Тип локації'}
        </button>
        <Chevron open={typesOpen} />

        {typesOpen && (
          <ul className={css.typeList}>
            {types.map((t) => (
              <li key={t._id}>
                <label className={css.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(t.slug)}
                    onChange={() => toggleType(t.slug)}
                  />
                  <span>{t.type}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`${css.selectWrap} ${css.sort}`}>
        <select
          className={css.control}
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
        >
          <option value="" disabled hidden>
            Сортування
          </option>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
    </div>
  );
}