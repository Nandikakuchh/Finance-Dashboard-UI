import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { transactionsData } from "../data/mockData.ts";

// ✅ Transaction Type
export type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

// ✅ Context Type
type AppContextType = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  role: "viewer" | "admin";
  setRole: React.Dispatch<React.SetStateAction<"viewer" | "admin">>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

// ✅ Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// ✅ Provider Props
type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  // ✅ Load from localStorage (better UX)
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : transactionsData;
  });

  const [role, setRole] = useState<"viewer" | "admin">("viewer");
  const [search, setSearch] = useState<string>("");

  // ✅ Persist dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Save transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ✅ Save dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        search,
        setSearch,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};