export const MAP_DEFAULT_CENTER: [number, number] = [-35.2809, 149.13]
export const MAP_DEFAULT_ZOOM = 12
export const MAP_MIN_ZOOM = 9
export const MAP_MAX_ZOOM = 18

// ACT bounding box
export const ACT_BOUNDS: [[number, number], [number, number]] = [
  [-35.92, 148.76], // SW
  [-35.12, 149.4],  // NE
]

export const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// Marker colours by entity type
export const MARKER_COLOURS: Record<string, string> = {
  organisation: '#2563EB',
  program: '#7C3AED',
  grant: '#059669',
  investor: '#D97706',
  network: '#EA580C',
  space: '#0891B2',
  university: '#4F46E5',
  government: '#475569',
  'service-provider': '#DB2777',
  'event-series': '#9333EA',
  mentor: '#0D9488',
}
