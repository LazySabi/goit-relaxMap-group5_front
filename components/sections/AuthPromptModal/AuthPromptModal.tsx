"use client";

import Link from "next/link";
import Modal from "@/components/ui/Modal/Modal";
import css from "./AuthPromptModal.module.css";

interface AuthPromptModalProps {
  onClose: () => void;
  text?: string;
}

export default function AuthPromptModal({
  onClose,
  text = "Щоб залишити відгук вам треба увійти, якщо ще немає облікового запису зареєструйтесь",
}: AuthPromptModalProps) {
  return (
    <Modal onClose={onClose} className={css.modal}>
      <h2 className={css.title}>Помилка під час додавання відгуку</h2>
      <p className={css.text}>{text}</p>

      <div className={css.actions}>
        <Link href="/sign-in" className={css.secondary}>
          Увійти
        </Link>
        <Link href="/sign-up" className={css.primary}>
          Зареєструватися
        </Link>
      </div>
    </Modal>
  );
}