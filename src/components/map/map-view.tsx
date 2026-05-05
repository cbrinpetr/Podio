'use client'

import { useEffect, useRef, useState } from 'react'
import type { EntitySummary } from '@/types/entity'
import { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM, MAP_MIN_ZOOM, MAP_MAX_ZOOM, TILE_URL, TILE_ATTRIBUTION, MARKER_COLOURS } from '@/lib/constants/map'
import { getEntityType } from '@/lib/constants/taxonomy'
import { EntityTypeBadge } from '@/components/entity/entity-type-badge'
import Link from 'next/link'

interface MapViewProps {
  entities: EntitySummary[]
}

export function MapView({ entities }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [selected, setSelected] = useState<EntitySummary | null>(null)

  const mappable = entities.filter(
    (e) => e.location?.latitude && e.location?.longitude && !e.location.isVirtual
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return
    if (mapInstanceRef.current) return // already initialised

    // Dynamic import to avoid SSR issues with Leaflet
    Promise.all([import('leaflet')]).then(([L]) => {
      if (!mapRef.current || mapInstanceRef.current) return

      // Fix default icon path issue in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: MAP_DEFAULT_CENTER,
        zoom: MAP_DEFAULT_ZOOM,
        minZoom: MAP_MIN_ZOOM,
        maxZoom: MAP_MAX_ZOOM,
      })

      L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION }).addTo(map)

      mappable.forEach((entity) => {
        if (!entity.location?.latitude || !entity.location?.longitude) return

        const colour = MARKER_COLOURS[entity.entityType] ?? '#2563EB'
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
            <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z" fill="${colour}" stroke="white" stroke-width="2"/>
            <circle cx="14" cy="14" r="5" fill="white"/>
          </svg>`

        const icon = L.divIcon({
          html: svg,
          className: '',
          iconSize: [28, 36],
          iconAnchor: [14, 36],
          popupAnchor: [0, -36],
        })

        const marker = L.marker([entity.location.latitude, entity.location.longitude], { icon })
        marker.addTo(map)
        marker.on('click', () => setSelected(entity))
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="h-full w-full rounded-xl" />

      {/* Selected entity panel */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] rounded-xl border bg-background shadow-lg p-4 sm:left-auto sm:right-4 sm:w-80">
          <button
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <EntityTypeBadge type={selected.entityType} className="mb-2" />
          <h3 className="font-semibold leading-snug mb-1">{selected.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{selected.shortDescription}</p>
          {selected.location && !selected.location.isVirtual && (
            <p className="text-xs text-muted-foreground mb-3">
              {[selected.location.suburb, selected.location.state].filter(Boolean).join(', ')}
            </p>
          )}
          <Link
            href={`/directory/${selected.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View details →
          </Link>
        </div>
      )}

      {/* Stats overlay */}
      <div className="absolute top-4 left-4 z-[1000] rounded-lg border bg-background/90 backdrop-blur px-3 py-2 text-xs text-muted-foreground shadow">
        {mappable.length} location{mappable.length !== 1 ? 's' : ''} shown
      </div>
    </div>
  )
}
