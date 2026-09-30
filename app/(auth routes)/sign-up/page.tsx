import Link from "next/link";
import { FiMap } from "react-icons/fi";

import css from "./SignUpPage.module.css";

const SignUp = () => {
  return (
    <main className={css.page}>
      <section className={css.authSection}>
        <Link className={css.logo} href="/">
          <FiMap aria-hidden="true" className={css.logoIcon} size={24} />
          <span>Relax Map</span>
        </Link>

        <div className={css.formContainer}>
          <nav className={css.authNav} aria-label="Навігація авторизації">
            <Link
              aria-current="page"
              className={`${css.navLink} ${css.activeLink}`}
              href="/sign-up"
            >
              Реєстрація
            </Link>

            <Link className={css.navLink} href="/sign-in">
              Вхід
            </Link>
          </nav>

          <h1 className={css.title}>Реєстрація</h1>

          <form className={css.form}>
            <div className={css.field}>
              <label className={css.label} htmlFor="name">
                Ім&apos;я<span className={css.required}>*</span>
              </label>

              <input
                autoComplete="name"
                className={css.input}
                id="name"
                name="name"
                placeholder="Ваше ім’я"
                type="text"
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="email">
                Пошта<span className={css.required}>*</span>
              </label>

              <input
                autoComplete="email"
                className={css.input}
                id="email"
                name="email"
                placeholder="hello@relaxmap.ua"
                type="email"
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor="password">
                Пароль<span className={css.required}>*</span>
              </label>

              <input
                autoComplete="new-password"
                className={css.input}
                id="password"
                name="password"
                placeholder="********"
                type="password"
              />
            </div>

            <button className={css.submitButton} type="submit">
              Зареєструватися
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
