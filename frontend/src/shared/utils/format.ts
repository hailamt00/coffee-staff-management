export const formatMoney = (value?: number | null): string =>
  value != null ? Math.round(value).toLocaleString('vi-VN') : '0'

export const formatDate = (value?: string | null): string =>
  value ? new Date(value).toLocaleDateString('vi-VN') : '—'
