import KeyAdvantages from "../KeyAdvantages/KeyAdvantages";
import PopularLocations from "../PopularLocations/PopularLocations";
import css from "./HomePage.module.css";
import ReviewsBlock from "../ReviewsBlock/ReviewsBlock";

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
      <ReviewsBlock />
    </div>
  );
};

export default HomePage;
