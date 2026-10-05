"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { useRouter } from "next/navigation";

import KeyAdvantages from "../KeyAdvantages/KeyAdvantages";

import PopularLocations from "../PopularLocations/PopularLocations";

import css from "./HomePage.module.css";

// Домашня сторінка збирає блоки, які роблять різні учасники команди.
// Далі по мірі готовності додаються:
// <Hero />                — Асура

// <KeyAdvantages />       — Костя (готово)
// <PopularLocations />    — Артем
// <LastReviews />         — Дмитро
// AllRestPlaces / map     — Олександра

const HomePage = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      router.push("/locations");
      return;
    }

    router.push(`/locations?search=${encodeURIComponent(query)}`);
  };
  return (
    <div className={css.homePage}>
      <section className={css.hero}>
        <div className={css.container}>
          <div className={css.heroContent}>
            <h1 className={css.heroTitle}>
              Відкрий для себе Україну. Знайди ідеальне місце для відпочинку
            </h1>

            <p className={css.heroDescription}>
              Тисячі перевірених локацій з реальними фото та відгуками від
              мандрівників
            </p>

            <form className={css.searchForm} onSubmit={handleSubmit}>
              <input
                className={css.searchInput}
                type="search"
                placeholder="Введіть назву, тип або регіон..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <button className={css.searchButton} type="submit">
                Знайти місце
              </button>
            </form>
          </div>
        </div>
      </section>
      <KeyAdvantages />
      <PopularLocations />
    </div>
  );
};

export default HomePage;
