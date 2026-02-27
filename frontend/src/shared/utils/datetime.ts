export type DateInput = string | Date | null | undefined

export const VIETNAM_TIME_ZONE = 'Asia/Ho_Chi_Minh'
const VIETNAM_LOCALE = 'vi-VN'
const TIMEZONE_SUFFIX_REGEX = /([zZ]|[-+]\d{2}:\d{2})$/

function getDatePartsInVietnam(date: Date): { day: string; year: string; month: string } {
  const parts = new Intl.DateTimeFormat(VIETNAM_LOCALE, {
    timeZone: VIETNAM_TIME_ZONE,
    day: '2-digit',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(date)

  const map: Record<string, string> = {}
  parts.forEach(part => {
    if (part.type !== 'literal') {
      map[part.type] = part.value
    }
  })

  return {
    day: map.day ?? '00',
    year: map.year ?? '0000',
    month: map.month ?? '00',
  }
}

export function parseDateInput(value: DateInput): Date | null {
  if (!value) return null

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const trimmed = value.trim()
  if (!trimmed) return null

  const hasOffset = TIMEZONE_SUFFIX_REGEX.test(trimmed)
  const normalized = hasOffset ? trimmed : `${trimmed}Z`
  const parsed = new Date(normalized)

  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function formatDateInVietnam(value: DateInput): string {
  const parsed = parseDateInput(value)
  if (!parsed) return '-'

  const { day, year, month } = getDatePartsInVietnam(parsed)
  return `${day}/${month}/${year}`
}

export function formatTimeInVietnam(value: DateInput): string {
  const parsed = parseDateInput(value)
  if (!parsed) return '-'

  return new Intl.DateTimeFormat(VIETNAM_LOCALE, {
    timeZone: VIETNAM_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(parsed)
}

export function formatDateTimeInVietnam(value: DateInput): string {
  const parsed = parseDateInput(value)
  if (!parsed) return '-'

  const datePart = formatDateInVietnam(parsed)
  const timePart = formatTimeInVietnam(parsed)
  return `${datePart} ${timePart}`
}

export function formatRevenueHeaderDateTime(value: DateInput): string {
  const parsed = parseDateInput(value)
  if (!parsed) return '-'

  const datePart = formatDateInVietnam(parsed)
  const timeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: VIETNAM_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(parsed)

  const map: Record<string, string> = {}
  timeParts.forEach(part => {
    if (part.type !== 'literal') {
      map[part.type] = part.value
    }
  })

  const hour = map.hour ?? '00'
  const minute = map.minute ?? '00'

  return `${datePart} ${hour}:${minute}`
}
