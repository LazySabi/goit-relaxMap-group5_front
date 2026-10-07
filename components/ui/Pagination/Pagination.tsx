"use client";

import { useSyncExternalStore } from "react";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

type PageItem = number | "dots-start" | "dots-end";

const getItems = (page: number, total: number, size: number): PageItem[] => {
  if (total <= size + 1) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const start = Math.max(1, Math.min(page - Math.floor((size - 1) / 2), total - size));
  const items: PageItem[] = [];

  if (start > 1) items.push(1, "dots-start");
  for (let i = start; i < start + size && i < total; i += 1) items.push(i);
  if (start + size < total) items.push("dots-end");
  items.push(total);

  return items.filter(
    (item, index) => !(item === "dots-start" && items[index + 1] === 2),
  );
};

const TABLET_QUERY = "(min-width: 768px)";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia(TABLET_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const isTablet = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(TABLET_QUERY).matches,
    () => true,
  );
  const size = isTablet ? 3 : 2;

  if (totalPages <= 1) return null;

  const items = getItems(page, totalPages, size);

  return (
    <nav className={css.pagination} aria-label="Сторінки">
      <button
        type="button"
        className={`${css.button} ${css.arrow}`}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Попередня сторінка"
      >
        <Icon name="arrow_back" aria-hidden="true" />
      </button>

      {items.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            className={`${css.button} ${css.page}`}
            onClick={() => item !== page && onChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        ) : (
          <span key={item} className={css.dots}>
            ...
          </span>
        ),
      )}

      <button
        type="button"
        className={`${css.button} ${css.arrow}`}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Наступна сторінка"
      >
        <Icon name="arrow_forward" aria-hidden="true" />
      </button>
    </nav>
  );
}
