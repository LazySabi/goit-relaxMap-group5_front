"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { FiMap } from "react-icons/fi";

import { signInValidationSchema } from "@/lib/validation/authValidation";
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
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      console.log("Sign in values:", values);

      /*
        Тут згодом буде запит до backend, наприклад:

        const { data } = await axiosClient.post("/auth/login", values);

        Після того як backend підтвердить endpoint і response:
        router.push(`/profile/${data.user._id}`);
      */

      toast.success("Форма успішно пройшла валідацію");
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
            {({ errors, touched, isSubmitting }) => (
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
