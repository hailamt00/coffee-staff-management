export type SortDirection = 'asc' | 'desc'

export type SortState<T> = {
  key: keyof T
  direction: SortDirection
}

export function sortData<T extends Record<string, any>>(
  data: T[],
  sort?: SortState<T> | null
): T[] {
  if (!sort) return data

  const { key, direction } = sort

  return [...data].sort((a, b) => {
    const x = a[key]
    const y = b[key]

    if (x == null && y == null) return 0
    if (x == null) return direction === 'asc' ? -1 : 1
    if (y == null) return direction === 'asc' ? 1 : -1

    if (x === y) return 0
    return x > y
      ? direction === 'asc' ? 1 : -1
      : direction === 'asc' ? -1 : 1
  })
}
