"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, onClose, className }: ModalProps) => {
  let container;

  if (typeof window !== "undefined") {
    container = document.body;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    container &&
    createPortal(
      <div className={css.backdrop} onClick={onClose}>
        <div
          className={`${css.modal} ${className ?? ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className={css.closeButton}
            onClick={onClose}
            aria-label="Закрити"
          >
            <Icon name="close" />
          </button>

          {children}
        </div>
      </div>,
      container,
    )
  );
};

export default Modal;
