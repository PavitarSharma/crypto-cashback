import { useState } from "react";

const useAppState = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return {
    openDrawer,
    setOpenDrawer,
  };
};

export default useAppState;
