export type EntityList<T> = {
  displayedItems?: T[],
  error: string | undefined,
  filter: Record<string, string | null | undefined>,
  isFetching: boolean,
  isLoading: boolean,
  items: T[] | undefined,
  refresh: () => Promise<void>,
  selectedItem?: T,
  setFilter: (key: string, value?: string | null) => void,
  setSelectedItem: (item: T | undefined) => void,
}