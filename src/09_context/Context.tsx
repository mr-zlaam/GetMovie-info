import { MoviesData } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

interface ContextValue {
  useGetInfo: MoviesData | null;
  setUseGetInfo: React.Dispatch<SetStateAction<MoviesData | null>>;
}

const context = createContext<ContextValue | null>(null);

export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [useGetInfo, setUseGetInfo] = useState<MoviesData | null>(null);
  return (
    <context.Provider value={{ useGetInfo, setUseGetInfo }}>
      {children}
    </context.Provider>
  );
};

export const UseModalContext = (): ContextValue => {
  const value = useContext(context);
  if (!value) {
    throw new Error("useModalContext must be used within a Provider");
  }
  return value;
};
