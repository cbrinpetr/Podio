import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getAllEntities } from '@/lib/data/entities'
import type { EntitySummary } from '@/types/entity'

export const metadata: Metadata = {
  title: 'Map',
  description: 'Explore the ACT innovation ecosystem on an interactive map.',
}

const MapView = dynamic(
  () => import('@/components/map/map-view').then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading map…</div>
      </div>
    ),
  }
)

export default function MapPage() {
  const entities = getAllEntities() as unknown as EntitySummary[]

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="container flex items-center justify-between py-4 flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold">Innovation Map</h1>
          <p className="text-sm text-muted-foreground">Physical locations across the ACT</p>
        </div>
      </div>
      <div className="flex-1 container pb-4 min-h-0">
        <MapView entities={entities} />
      </div>
    </div>
  )
}
