import { formatDateInVietnam } from '@/shared/utils/datetime'

export const formatMoney = (value?: number | null): string =>
  value != null ? Math.round(value).toLocaleString('en-US') : '0'

export const formatDate = (value?: string | null): string =>
  formatDateInVietnam(value)
