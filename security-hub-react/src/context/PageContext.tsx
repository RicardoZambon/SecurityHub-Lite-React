import { createContext, useContext, useState } from "react";

type PageContextState = {
  filter: Record<string, string | null | undefined>;
  setFilter: (key: string, value?: string | null) => void;
};

const PageContext = createContext<PageContextState | undefined>(undefined);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});  

  function handleSetFilter(key: string, value?: string | null) {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }

  return (
    <PageContext.Provider value={{ filter: filter, setFilter: handleSetFilter }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const ctx: PageContextState | undefined = useContext(PageContext);
  if (!ctx) {
    throw new Error("usePage must be used inside PageProvider");
  }
  return ctx;
}
