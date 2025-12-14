export type EntityList<T> = {
  // Grid
  error: string | undefined,
  getItemId: (item: T) => string,
  isFetching: boolean,
  isLoading: boolean,
  items: T[] | undefined,
  refresh: () => Promise<void>,

  // Filter
  filterFn: (items: T[] | undefined, filter: Record<string, string | null | undefined>) => T[] | undefined,
}