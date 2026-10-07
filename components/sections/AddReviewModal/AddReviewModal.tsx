"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Modal from "@/components/ui/Modal/Modal";
import { createFeedback } from "@/lib/api/feedbacks";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AddReviewModal.module.css";

interface AddReviewModalProps {
  locationId: string;
  onClose: () => void;
}

interface ReviewFormValues {
  rate: number;
  description: string;
}

const initialValues: ReviewFormValues = {
  rate: 0,
  description: "",
};

const reviewSchema = Yup.object({
  rate: Yup.number()
    .min(1, "Оберіть оцінку")
    .max(5, "Максимальна оцінка — 5")
    .required("Оберіть оцінку"),
  description: Yup.string()
    .trim()
    .min(1, "Напишіть ваш відгук")
    .max(200, "Максимум 200 символів")
    .required("Напишіть ваш відгук"),
});

export default function AddReviewModal({
  locationId,
  onClose,
}: AddReviewModalProps) {
  const queryClient = useQueryClient();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleSubmit = async (values: ReviewFormValues) => {
    try {
      await createFeedback({
        locationId,
        rate: values.rate,
        description: values.description.trim(),
      });

      await queryClient.invalidateQueries({
        queryKey: ["feedbacks", locationId],
      });

      toast.success("Дякуємо за відгук!");
      onClose();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        clearIsAuthenticated();
        toast.error("Сесія завершилась. Увійдіть знову.");
        return;
      }

      toast.error("Помилка під час додавання відгуку");
    }
  };

  return (
    <Modal onClose={onClose} className={css.modal}>
      <h2 className={css.title}>Залишити відгук</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.field}>
              <span className={css.label}>Ваш відгук</span>

              

            <div className={css.field}>
              <label htmlFor="review-description" className={css.label}>
                Відгук
              </label>

              <Field
                as="textarea"
                id="review-description"
                name="description"
                rows={5}
                maxLength={200}
                placeholder="Напишіть ваш відгук"
                className={css.textarea}
              />

              <span className={css.counter}>
                {values.description.length}/200
              </span>

              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </div>

<div className={css.stars} role="radiogroup" aria-label="Оцінка">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={values.rate === star}
                    aria-label={`${star} з 5`}
                    className={
                      star <= values.rate
                        ? `${css.star} ${css.starActive}`
                        : css.star
                    }
                    onClick={() => setFieldValue("rate", star)}
                  >
                    ★
                  </button>
                ))}
              </div>

              <ErrorMessage name="rate" component="span" className={css.error} />
            </div>
            <div className={css.actions}>
              <button
                type="button"
                className={css.secondary}
                onClick={onClose}
                disabled={isSubmitting}
              >
                Відмінити
              </button>

              <button
                type="submit"
                className={css.primary}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Надсилаємо..." : "Надіслати"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}