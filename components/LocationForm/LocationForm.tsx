'use client';

import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import ImageUploader from '../ImageUploader/ImageUploader';
import {
  createLocation,
  updateLocation,
  getLocationTypes,
  getRegions,
  type LocationType,
  type Region,
} from '@/lib/api/locationsApi';

import styles from './LocationForm.module.css';

type LocationFormValues = {
  images: File | null;
  name: string;
  type: string;
  region: string;
  description: string;
};

type LocationFormProps = {
  mode?: 'create' | 'edit';
  locationId?: string;
  initialData?: {
    image?: string;
    name: string;
    type: string;
    region: string;
    description: string;
  };
};

const emptyInitialValues: LocationFormValues = {
  images: null,
  name: '',
  type: '',
  region: '',
  description: '',
};

/* =========================
   CREATE VALIDATION
   ========================= */

const createValidationSchema = Yup.object({
  images: Yup.mixed<File>()
    .nullable()
    .required('Додайте фото')
    .test(
      'fileType',
      'Можна завантажити тільки JPG або PNG',
      (file) =>
        !file ||
        ['image/jpeg', 'image/png'].includes(file.type),
    )
    .test(
      'fileSize',
      'Розмір фото має бути менше 1 МБ',
      (file) => !file || file.size < 1024 * 1024,
    ),

  name: Yup.string()
    .required('Введіть назву місця')
    .min(
      3,
      'Назва повинна містити щонайменше 3 символи',
    )
    .max(
      96,
      'Назва повинна містити не більше 96 символів',
    ),

  type: Yup.string()
    .required('Оберіть тип місця')
    .max(
      64,
      'Тип місця повинен містити не більше 64 символів',
    ),

  region: Yup.string()
    .required('Оберіть регіон')
    .max(
      64,
      'Регіон повинен містити не більше 64 символів',
    ),

  description: Yup.string()
    .required('Додайте опис місця')
    .min(
      20,
      'Опис повинен містити щонайменше 20 символів',
    )
    .max(
      6000,
      'Опис повинен містити не більше 6000 символів',
    ),
});

/* =========================
   EDIT VALIDATION
   ========================= */

const editValidationSchema = createValidationSchema.shape({
  images: Yup.mixed<File>()
    .nullable()
    .test(
      'fileType',
      'Можна завантажити тільки JPG або PNG',
      (file) =>
        !file ||
        ['image/jpeg', 'image/png'].includes(file.type),
    )
    .test(
      'fileSize',
      'Розмір фото має бути менше 1 МБ',
      (file) => !file || file.size < 1024 * 1024,
    ),
});

/* =========================
   COMPONENT
   ========================= */

export default function LocationForm({
  mode = 'create',
  locationId,
  initialData,
}: LocationFormProps) {
  const [locationTypes, setLocationTypes] = useState<
    LocationType[]
  >([]);

  const [regions, setRegions] = useState<Region[]>([]);

  const [isLoadingOptions, setIsLoadingOptions] =
    useState(true);

  const [optionsError, setOptionsError] = useState('');

  const isEditMode = mode === 'edit';

  /* =========================
     LOAD TYPES + REGIONS
     ========================= */

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setIsLoadingOptions(true);
        setOptionsError('');

        const [typesData, regionsData] =
          await Promise.all([
            getLocationTypes(),
            getRegions(),
          ]);

        setLocationTypes(typesData);
        setRegions(regionsData);
      } catch (error) {
        console.error(error);

        setOptionsError(
          'Не вдалося завантажити типи місць та регіони.',
        );
      } finally {
        setIsLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  /* =========================
     INITIAL VALUES
     ========================= */

  const initialValues: LocationFormValues = initialData
    ? {
        images: null,
        name: initialData.name,
        type: initialData.type,
        region: initialData.region,
        description: initialData.description,
      }
    : emptyInitialValues;

  const optionsUnavailable =
    isLoadingOptions || Boolean(optionsError);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        {isEditMode
          ? 'Редагування місця'
          : 'Додавання нового місця'}
      </h1>

      {optionsError && (
        <p className={styles.error}>
          {optionsError}
        </p>
      )}

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={
          isEditMode
            ? editValidationSchema
            : createValidationSchema
        }
        onSubmit={async (values) => {
          if (isEditMode) {
            if (!locationId) {
              throw new Error('Location ID is required for editing');
            }

            await updateLocation(locationId, values);
            return;
          }

          await createLocation(values);
        }}
      >
        {({
          values,
          setFieldValue,
          resetForm,
          isSubmitting,
        }) => (
          <Form className={styles.form}>
            {/* IMAGE */}

            <ImageUploader
              file={values.images}
              imageUrl={initialData?.image}
              onChange={(file) =>
                setFieldValue('images', file)
              }
            />

            <ErrorMessage
              name="images"
              component="p"
              className={styles.error}
            />

            {/* NAME */}

            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="name"
              >
                Назва місця
              </label>

              <Field
                className={styles.input}
                id="name"
                name="name"
                type="text"
                placeholder="Введіть назву місця"
              />

              <ErrorMessage
                name="name"
                component="p"
                className={styles.error}
              />
            </div>

            {/* TYPE */}

            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="type"
              >
                Тип місця
              </label>

              <Field
                className={styles.select}
                id="type"
                name="type"
                as="select"
                disabled={optionsUnavailable}
              >
                <option value="" disabled>
                  {isLoadingOptions
                    ? 'Завантаження...'
                    : 'Оберіть тип місця'}
                </option>

                {locationTypes.map(
                  (locationType) => (
                    <option
                      key={locationType._id}
                      value={locationType.slug}
                    >
                      {locationType.type}
                    </option>
                  ),
                )}
              </Field>

              <ErrorMessage
                name="type"
                component="p"
                className={styles.error}
              />
            </div>

            {/* REGION */}

            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="region"
              >
                Регіон
              </label>

              <Field
                className={styles.select}
                id="region"
                name="region"
                as="select"
                disabled={optionsUnavailable}
              >
                <option value="" disabled>
                  {isLoadingOptions
                    ? 'Завантаження...'
                    : 'Оберіть регіон'}
                </option>

                {regions.map((region) => (
                  <option
                    key={region._id}
                    value={region.slug}
                  >
                    {region.region}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name="region"
                component="p"
                className={styles.error}
              />
            </div>

            {/* DESCRIPTION */}

            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="description"
              >
                Детальний опис
              </label>

              <Field
                className={styles.textarea}
                id="description"
                name="description"
                as="textarea"
                placeholder="Детальний опис локації"
              />

              <ErrorMessage
                name="description"
                component="p"
                className={styles.error}
              />
            </div>

            {/* BUTTONS */}

            <div className={styles.actions}>
              <button
                className={styles.publishButton}
                type="submit"
                disabled={
                  isSubmitting ||
                  optionsUnavailable
                }
              >
                {isSubmitting
                  ? isEditMode
                    ? 'Зберігаємо...'
                    : 'Публікуємо...'
                  : isEditMode
                    ? 'Зберегти'
                    : 'Опублікувати'}
              </button>

              <button
                className={styles.cancelButton}
                type="button"
                onClick={() => resetForm()}
                disabled={isSubmitting}
              >
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}