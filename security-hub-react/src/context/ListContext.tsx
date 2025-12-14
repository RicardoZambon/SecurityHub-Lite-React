import { createContext, useContext, useState } from "react";

type ListViewContextState = {
  filter: Record<string, string | null | undefined>;
  selectedItemId?: string;
  setFilter: (key: string, value?: string | null) => void;
  setSelectedItemId: (id: string | undefined) => void;
  //setFixedFilter: (fixedFilter: Record<string, string | null | undefined>) => void;
};

const ListViewContext = createContext<ListViewContextState | undefined>(undefined);

export function ListViewProvider({
  children,
}: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<Record<string, string | null | undefined>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  function handleSetFilter(key: string, value?: string | null) {
    setFilter(prevFilter => ({
      ...prevFilter,
      [key]: value
    }));
  }

  return (
    <ListViewContext.Provider value={{
      filter: filter,
      selectedItemId: selectedItemId,
      setFilter: handleSetFilter,
      setSelectedItemId: (itemId: string | undefined) => setSelectedItemId(itemId),
      //setFixedFilter: (fixedFilter: Record<string, string | null | undefined>) => { setFilter(fixedFilter); },
    }}>
      {children}
    </ListViewContext.Provider>
  );
}

export function useListView() {
  const ctx: ListViewContextState | undefined = useContext(ListViewContext);
  if (!ctx) {
    throw new Error("useListView must be used inside ListViewProvider");
  }
  return ctx;
}
