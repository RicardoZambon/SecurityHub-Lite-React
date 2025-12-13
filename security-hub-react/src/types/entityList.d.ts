export type EntityList<T> = {
  displayedItems?: T[],
  error: string | undefined,
  filter: Record<string, string | null | undefined>,
  isLoading: boolean,
  items: T[] | undefined,
  refresh: () => Promise<void>,
  setFilter: (key: string, value?: string | null) => void,
}