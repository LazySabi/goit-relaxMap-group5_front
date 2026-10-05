import Link from "next/link";
import clsx from "clsx";
import css from "./AuthNav.module.css";

interface AuthNavProps {
  activeTab: "login" | "register";
}

const AuthNav = ({ activeTab }: AuthNavProps) => {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.item}>
          <Link
            href="/sign-up"
            className={clsx(css.link, activeTab === "register" && css.active)}
          >
            Реєстрація
          </Link>
        </li>
        <li className={css.item}>
          <Link
              href="/sign-in"
            className={clsx(css.link, activeTab === "login" && css.active)}
          >
            Вхід
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;
