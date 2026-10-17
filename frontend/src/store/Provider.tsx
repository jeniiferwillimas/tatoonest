"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { loadFromStorage } from "./slices/authSlice";

const HydratedContext = createContext(false);
export const useHydrated = () => useContext(HydratedContext);

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    store.dispatch(loadFromStorage());
    setHydrated(true);
  }, []);

  return (
    <Provider store={store}>
      <HydratedContext.Provider value={hydrated}>
        {children}
      </HydratedContext.Provider>
    </Provider>
  );
}
