export type BaseUseReturn<T> = {
  displayedItems?: T[],
  error: string | null,
  filter: Record<string, string | undefined>,
  isLoading: boolean,
  items: T[] | undefined,
  refresh: () => Promise<void>,
  setFilter: (key: string, value?: string) => void,
}