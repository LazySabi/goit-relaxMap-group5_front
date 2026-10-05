import Icon from "../Icon/Icon";
import css from "./SliderArrows.module.css";
interface SliderArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}
const SliderArrows = ({ onPrev, onNext }: SliderArrowsProps) => {
  return (
    <div className={css.sliderArrows}>
      <button type="button" onClick={onPrev} className={css.arrowButton}>
        <Icon name="arrow_back" />
      </button>
      <button type="button" onClick={onNext} className={css.arrowButton}>
        <Icon name="arrow_forward" />
      </button>
    </div>
  );
};
export default SliderArrows;
