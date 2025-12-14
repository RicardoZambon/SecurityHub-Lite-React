import { useCallback, useState } from 'react';
import type { GridSelection } from '../../types/gridSelection';

// A simple in-memory store to keep selection states per list grid instance.
const selectionStore: { [key: string]: string | undefined } = {};

export function useListGridSelection(storeKey: string): GridSelection {
  const [selectedItem, setSelectedItem] = useState(selectionStore);

  const handleSelection = useCallback((itemId: string | undefined) => {
    // Saves in memory state.
    selectionStore[storeKey] = itemId;

    // Updates local state to trigger re-render.
    const newStore = { ...selectedItem, [storeKey]: itemId };
    setSelectedItem(newStore);
  }, []);

  return {
    selectedItemId: selectedItem[storeKey],
    setSelectedItem: handleSelection,
  };
}