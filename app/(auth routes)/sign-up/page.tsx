"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMap } from "react-icons/fi";

import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

import css from "./SignUpPage.module.css";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const user = await register({
        name,
        email,
        password,
      });

      useAuthStore.getState().setUser(user);

      router.push("/profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Не вдалося зареєструватися",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.page}>
      <section className={css.authSection}>
        <Link className={css.logo} href="/">
          <FiMap aria-hidden="true" className={css.logoIcon} />
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

          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.field}>
              <label className={css.label} htmlFor="name">
                Ім&apos;я<span className={css.required}>*</span>
              </label>

              <input
                className={css.input}
                id="name"
                name="name"
                placeholder="Ваше ім'я"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button
              className={css.submitButton}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Реєстрація..." : "Зареєструватись"}
            </button>

            {error && <p className={css.error}>{error}</p>}
          </form>
        </div>

        <p className={css.footer}>© 2025 Relax Map</p>
      </section>
    </main>
  );
};

export default SignUpPage;
