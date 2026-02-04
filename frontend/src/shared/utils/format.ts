export const formatMoney = (value?: number | null): string =>
  value != null ? value.toLocaleString('en-US') : '0'

export const formatDate = (value?: string | null): string =>
  value ? new Date(value).toLocaleDateString('vi-VN') : '—'
