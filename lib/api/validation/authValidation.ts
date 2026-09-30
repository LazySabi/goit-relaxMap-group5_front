import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Введіть коректну пошту")
    .required("Пошта є обов’язковою"),

  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Пароль є обов’язковим"),
});

export const signUpValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім’я має містити щонайменше 2 символи")
    .max(40, "Ім’я має містити не більше 40 символів")
    .required("Ім’я є обов’язковим"),

  email: Yup.string()
    .trim()
    .email("Введіть коректну пошту")
    .required("Пошта є обов’язковою"),

  password: Yup.string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .required("Пароль є обов’язковим"),
});
