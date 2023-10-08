"use client";

import { store } from "@/redux/store";
import { Provider, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Toaster } from "react-hot-toast";
import { injectStore } from "@/redux/api/http";

injectStore(store);
const ReduxProvider = ({ children }) => {
  // const {user} = useSelector(AuthState)

  // console.log(user);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        {children}
      </PersistGate>

      <Toaster toastOptions={{ position: "top-center", duration: 3000 }} />
    </Provider>
  );
};

export default ReduxProvider;
