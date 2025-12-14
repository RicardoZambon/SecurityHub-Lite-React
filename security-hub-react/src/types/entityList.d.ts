export type EntityList<T> = {
  error: string | undefined,
  filterFn: (items: T[] | undefined, filter: Record<string, string | null | undefined>) => T[] | undefined,
  getItemId: (item: T) => string,
  isFetching: boolean,
  isLoading: boolean,
  items: T[] | undefined,
  refresh: () => Promise<void>,
}