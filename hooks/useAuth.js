import { useCallback, useState } from "react";

const useAuth = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [page, setPage] = useState(0);

  const handleOpenAuthModal = useCallback(() =>
    setOpenAuthModal((state) => !state)
  );

  const handleCloseAuthModal = useCallback(() => setOpenAuthModal(false), []);
  return {
    openAuthModal,
    setOpenAuthModal,
    handleOpenAuthModal,
    handleCloseAuthModal,
    page,
    setPage,
  };
};

export default useAuth;
