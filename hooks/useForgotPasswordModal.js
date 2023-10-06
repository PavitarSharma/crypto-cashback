import { create } from "zustand";

const useForgotPasswordModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useForgotPasswordModal;
