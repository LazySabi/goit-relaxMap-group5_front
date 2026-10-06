import CheckBoxIcon from "../../ui/Icons/CheckBoxIcon";
import FilterIcon from "../../ui/Icons/FilterIcon";
import CommunityIcon from "../../ui/Icons/CommunityIcon";
import css from "./KeyAdvantages.module.css";

const advantages = [
  {
    Icon: CheckBoxIcon,
    title: "Реальні відгуки",
    description:
      "Користувачі діляться чесними враженнями, щоб ви робили правильний вибір.",
  },
  {
    Icon: FilterIcon,
    title: "Зручні фільтри",
    description:
      "Шукайте за типом локації, регіоном, наявністю зручностей та іншими критеріями.",
  },
  {
    Icon: CommunityIcon,
    title: "Спільнота мандрівників",
    description:
      "Додавайте власні улюблені місця та діліться своїми неймовірними знахідками.",
  },
];

const KeyAdvantages = () => {
  return (
    <section className={css.section} id="advantages" aria-labelledby="advantages-title">
      <div className={`container ${css.inner}`}>
        <h2 id="advantages-title" className={`secondary-headding ${css.title}`}>
          Ключові переваги
        </h2>

        <ul className={css.list}>
          {advantages.map(({ Icon, title, description }) => (
            <li key={title} className={css.card}>
              <Icon className={css.icon} aria-hidden="true" />
              <h3 className={css.cardTitle}>{title}</h3>
              <p className={css.cardText}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KeyAdvantages;
