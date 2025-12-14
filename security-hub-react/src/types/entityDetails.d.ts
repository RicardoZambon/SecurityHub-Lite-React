export type EntityDetails<T> = {
  error: string | undefined,
  isFetching: boolean,
  isLoading: boolean,
  item: T | undefined,
}
