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
  return (
    <div className={css.homePage}>
      <KeyAdvantages />
      <PopularLocations />
    </div>
  );
};

export default HomePage;
