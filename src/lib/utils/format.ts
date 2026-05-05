import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'd MMM yyyy')
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  return `${format(new Date(start), 'd MMM')} – ${format(new Date(end), 'd MMM yyyy')}`
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatCurrency(amount: number, currency = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-AU').format(n)
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}
