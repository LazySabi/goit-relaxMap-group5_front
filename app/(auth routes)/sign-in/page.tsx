"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { FiMap } from "react-icons/fi";

import { signInValidationSchema } from "@/lib/api/validation/authValidation";

import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";

interface SignInValues {
  email: string;
  password: string;
}

const initialValues: SignInValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: SignInValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    try {
      /*
        Це тимчасова перевірка, доки backend-команда не надасть:
        - точний endpoint для входу;
        - формат request body;
        - формат response;
        - адресу профілю після авторизації.

        Тут згодом буде приблизно так:

        const { data } = await axiosClient.post("/auth/login", values);
        router.push(`/profile/${data.user._id}`);
      */

      console.log("Sign in values:", values);
      useAuthStore.getState().setUser(user);

      await new Promise((resolve) => {
        setTimeout(resolve, 700);
      });

      toast.success("Вхід успішно виконано");
      router.push("/");
    } catch {
      toast.error("Не вдалося виконати вхід. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={css.page}>
      <section className={css.authSection}>
        <Link className={css.logo} href="/">
          <FiMap aria-hidden="true" className={css.logoIcon} size={24} />
          <span>Relax Map</span>
        </Link>

        <div className={css.formContainer}>
          <nav className={css.authNav} aria-label="Навігація авторизації">
            <Link className={css.navLink} href="/sign-up">
              Реєстрація
            </Link>

            <Link
              aria-current="page"
              className={`${css.navLink} ${css.activeLink}`}
              href="/sign-in"
            >
              Вхід
            </Link>
          </nav>

          <h1 className={css.title}>Вхід</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, isSubmitting, touched }) => (
              <Form className={css.form} noValidate>
                <div className={css.field}>
                  <label className={css.label} htmlFor="email">
                    Пошта<span className={css.required}>*</span>
                  </label>

                  <Field
                    autoComplete="email"
                    className={`${css.input} ${
                      touched.email && errors.email ? css.inputError : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="hello@relaxmap.ua"
                    type="email"
                  />

                  <ErrorMessage
                    className={css.errorMessage}
                    component="p"
                    name="email"
                  />
                </div>

                <div className={css.field}>
                  <label className={css.label} htmlFor="password">
                    Пароль<span className={css.required}>*</span>
                  </label>

                  <Field
                    autoComplete="current-password"
                    className={`${css.input} ${
                      touched.password && errors.password ? css.inputError : ""
                    }`}
                    id="password"
                    name="password"
                    placeholder="********"
                    type="password"
                  />

                  <ErrorMessage
                    className={css.errorMessage}
                    component="p"
                    name="password"
                  />
                </div>

                <button
                  className={css.submitButton}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Вхід..." : "Увійти"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
