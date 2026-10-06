<<<<<<< HEAD
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
=======
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { authStore } from "@/lib/store/authStore";
import css from "./SignUpPage.module.css";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const user = await register({ email, password });

      authStore.getState().setUser(user);

      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
>>>>>>> 317cfdc58ab34cea00c529a1bc02cc9d6f72f643
    </main>
  );
};

export default SignUpPage;
