"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster toastOptions={{ position: "top-center", duration: 3000 }} />
    </Provider>
  );
};

export default ReduxProvider;
