"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMap } from "react-icons/fi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

import css from "./SignUpPage.module.css";

interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: SignUpValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(32, "Ім'я має містити не більше 32 символів")
    .required("Вкажіть ім'я"),
  email: Yup.string()
    .trim()
    .email("Вкажіть коректну пошту")
    .required("Вкажіть пошту"),
  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .max(64, "Пароль має містити не більше 64 символів")
    .required("Вкажіть пароль"),
});

const getErrorMessage = (err: unknown): string => {
  const responseMessage = (
    err as { response?: { data?: { message?: unknown } } }
  )?.response?.data?.message;

  if (typeof responseMessage === "string" && responseMessage) {
    return responseMessage;
  }

  return err instanceof Error ? err.message : "Не вдалося зареєструватися";
};

const SignUpPage = () => {
  const router = useRouter();

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

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              setStatus(null);

              try {
                const user = await register({
                  name: values.name.trim(),
                  email: values.email.trim(),
                  password: values.password,
                });

                useAuthStore.getState().setUser(user);

                router.push("/profile");
              } catch (err) {
                setStatus(getErrorMessage(err));
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting, status }) => (
              <Form className={css.form} noValidate>
                <div className={css.field}>
                  <label className={css.label} htmlFor="name">
                    Ім&apos;я<span className={css.required}>*</span>
                  </label>

                  <Field
                    autoComplete="name"
                    className={`${css.input} ${
                      errors.name && touched.name ? css.inputError : ""
                    }`}
                    id="name"
                    name="name"
                    placeholder="Ваше ім'я"
                    type="text"
                  />

                  <ErrorMessage
                    className={css.fieldError}
                    component="p"
                    name="name"
                  />
                </div>

                <div className={css.field}>
                  <label className={css.label} htmlFor="email">
                    Пошта<span className={css.required}>*</span>
                  </label>

                  <Field
                    autoComplete="email"
                    className={`${css.input} ${
                      errors.email && touched.email ? css.inputError : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="hello@relaxmap.ua"
                    type="email"
                  />

                  <ErrorMessage
                    className={css.fieldError}
                    component="p"
                    name="email"
                  />
                </div>

                <div className={css.field}>
                  <label className={css.label} htmlFor="password">
                    Пароль<span className={css.required}>*</span>
                  </label>

                  <Field
                    autoComplete="new-password"
                    className={`${css.input} ${
                      errors.password && touched.password
                        ? css.inputError
                        : ""
                    }`}
                    id="password"
                    name="password"
                    placeholder="********"
                    type="password"
                  />

                  <ErrorMessage
                    className={css.fieldError}
                    component="p"
                    name="password"
                  />
                </div>

                <button
                  className={css.submitButton}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Реєстрація..." : "Зареєструватись"}
                </button>

                {status && <p className={css.error}>{status}</p>}
              </Form>
            )}
          </Formik>
        </div>

        <p className={css.footer}>© 2025 Relax Map</p>
      </section>
    </main>
  );
};

export default SignUpPage;