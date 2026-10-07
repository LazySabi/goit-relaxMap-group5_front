import { create } from "zustand";

type EditProfileModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useEditProfileModal = create<EditProfileModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
