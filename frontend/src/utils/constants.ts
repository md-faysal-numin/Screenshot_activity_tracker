export const ROLES = {
  OWNER: 'owner',
  EMPLOYEE: 'employee',
} as const

export const GROUPBY_OPTIONS = [
  { value: 'all', label: 'All Screenshots' },
  { value: '5min', label: '5 Minutes' },
  { value: '10min', label: '10 Minutes' },
] as const

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333'