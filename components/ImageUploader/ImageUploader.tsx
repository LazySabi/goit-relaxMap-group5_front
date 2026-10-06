'use client';

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Image from 'next/image';

import styles from './ImageUploader.module.css';

type ImageUploaderProps = {
  file: File | null;
  imageUrl?: string;
  onChange: (file: File | null) => void;
};

export default function ImageUploader({
  file,
  imageUrl,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    onChange(selectedFile);
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const displayedImage = preview || imageUrl;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Обкладинка</p>

      <div className={styles.uploadArea}>
        {displayedImage ? (
          <Image
            className={styles.preview}
            src={displayedImage}
            alt="Обкладинка локації"
            fill
            unoptimized
          />
        ) : (
          <Image
            className={styles.placeholderIcon}
            src="/image-placeholder.svg"
            alt=""
            width={96}
            height={80}
            aria-hidden="true"
          />
        )}
      </div>

      <input
        ref={inputRef}
        className={styles.input}
        id="images"
        name="images"
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleImageChange}
      />

      <button
        className={styles.uploadButton}
        type="button"
        onClick={handleUploadClick}
      >
        Завантажити фото
      </button>
    </div>
  );
}