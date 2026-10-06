"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { updateMe, type ApiError } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEditProfileModal } from "@/lib/store/editProfileModalStore";
import Modal from "@/components/ui/Modal/Modal";
import css from "./EditProfileModal.module.css";

type EditProfileValues = {
  name: string;
  avatar: File | null;
};

const MAX_AVATAR_SIZE = 1024 * 1024; // 1 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(32, "Ім'я має містити не більше 32 символів"),
  avatar: Yup.mixed<File>()
    .nullable()
    .test(
      "fileType",
      "Можна завантажити тільки JPG або PNG",
      (file) => !file || ALLOWED_TYPES.includes(file.type),
    )
    .test(
      "fileSize",
      "Розмір фото має бути менше 1 МБ",
      (file) => !file || file.size < MAX_AVATAR_SIZE,
    ),
});

const AvatarPreview = ({ file, url }: { file: File | null; url: string }) => {
  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Image
      src={previewUrl ?? url}
      alt="Аватар користувача"
      width={117}
      height={117}
      className={css.avatar}
      unoptimized={Boolean(previewUrl)}
    />
  );
};

export default function EditProfileModal() {
  const isOpen = useEditProfileModal((state) => state.isOpen);
  const close = useEditProfileModal((state) => state.close);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (
    values: EditProfileValues,
    { setSubmitting }: FormikHelpers<EditProfileValues>,
  ) => {
    const name = values.name.trim();
    const formData = new FormData();

    if (name && name !== user.name) formData.append("name", name);
    if (values.avatar) formData.append("avatar", values.avatar);

    if (!formData.has("name") && !formData.has("avatar")) {
      close();
      return;
    }

    try {
      const updatedUser = await updateMe(formData);
      setUser(updatedUser);
      queryClient.setQueryData(["currentUser"], updatedUser);
      toast.success("Профіль оновлено");
      close();
    } catch (error) {
      toast.error(
        (error as ApiError).response?.data?.message ??
          "Не вдалося оновити профіль. Спробуйте ще раз.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal onClose={close} className={css.modal}>
      <h2 className={css.title}>Редагувати профіль</h2>

      <Formik<EditProfileValues>
        initialValues={{ name: "", avatar: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, setFieldTouched, isSubmitting }) => (
          <Form className={css.form} noValidate>
            <div className={css.field}>
              <span className={css.label}>Аватар</span>
              <div className={css.upload}>
                <AvatarPreview
                  file={values.avatar}
                  url={user.avatarUrl || "/avatar-placeholder.svg"}
                />
                <button
                  type="button"
                  className={css.uploadButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Завантажити фото
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="avatar"
                  accept="image/jpeg,image/png"
                  className={css.fileInput}
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] ?? null;
                    setFieldValue("avatar", file);
                    setFieldTouched("avatar", true, false);
                  }}
                />
              </div>
              <ErrorMessage name="avatar" component="p" className={css.error} />
            </div>

            <div className={css.field}>
              <label htmlFor="edit-profile-name" className={css.label}>
                Ім’я
              </label>
              <Field
                id="edit-profile-name"
                name="name"
                type="text"
                placeholder="Введіть нове ім’я"
                autoComplete="name"
                className={css.input}
              />
              <ErrorMessage name="name" component="p" className={css.error} />
            </div>

            <div className={css.actions}>
              <button type="button" className={css.cancelButton} onClick={close}>
                Відмінити
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Збереження..." : "Зберегти"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
