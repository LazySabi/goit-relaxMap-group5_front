"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import css from "./LogoutModal.module.css";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const router = useRouter();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = () => {
    logout()
      .then(() => {
        clearIsAuthenticated();
        onClose();
        router.replace("/");
      })
      .catch(() => {
        toast.error("Не вдалося вийти. Спробуйте ще раз.");
      });
  };

  return (
    <Modal onClose={onClose} className={css.modal}>
      <div className={css.content}>
        <h2 className={css.title}>Ви точно хочете вийти?</h2>
        <p className={css.text}>Ми будемо сумувати за вами!</p>
      </div>

      <div className={css.actions}>
        <Button variant="secondary" onClick={onClose}>
          Відмінити
        </Button>

        <Button variant="primary" onClick={handleLogout}>
          Вийти
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
