import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { listEntitiesFromDB } from '@/lib/data/db-entities'
import { EntityGrid } from '@/components/directory/entity-grid'
import { FilterPanel } from '@/components/directory/filter-panel'
import { SearchBar } from '@/components/directory/search-bar'
import { FilterPanelSheet } from './filter-panel-sheet'
import type { FilterState, EntityTypeSlug, SectorSlug, AudienceSlug, StageSlug } from '@/types/entity'

export const metadata: Metadata = {
  title: 'Directory',
  description: 'Browse and filter all innovation resources in the ACT ecosystem.',
}

interface PageProps {
  searchParams: {
    q?: string
    type?: string | string[]
    sector?: string | string[]
    audience?: string | string[]
    stage?: string | string[]
    delivery?: string
    coverage?: string
    cost?: string
    featured?: string
    page?: string
    sort?: string
  }
}

function asArray<T>(val: string | string[] | undefined): T[] | undefined {
  if (!val) return undefined
  return (Array.isArray(val) ? val : [val]) as T[]
}

export const dynamic = 'force-dynamic'

export default async function DirectoryPage({ searchParams }: PageProps) {
  const filter: FilterState = {
    q: searchParams.q,
    type: asArray<EntityTypeSlug>(searchParams.type),
    sector: asArray<SectorSlug>(searchParams.sector),
    audience: asArray<AudienceSlug>(searchParams.audience),
    stage: asArray<StageSlug>(searchParams.stage),
    delivery: searchParams.delivery as any,
    coverage: searchParams.coverage as any,
    cost: searchParams.cost as any,
    featured: searchParams.featured === 'true' ? true : undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
    sort: searchParams.sort as any,
  }

  const { entities, pagination } = await listEntitiesFromDB(filter)

  // Build a plain object version of searchParams for EntityGrid
  const plainParams: Record<string, string | string[]> = {}
  for (const [k, v] of Object.entries(searchParams)) {
    if (v !== undefined) plainParams[k] = v
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Innovation Directory</h1>
        <p className="text-muted-foreground">
          Explore programs, grants, investors, spaces, and networks in the ACT ecosystem
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-3">
        <Suspense>
          <SearchBar
            defaultValue={searchParams.q ?? ''}
            className="flex-1"
          />
        </Suspense>
        {/* Mobile filter trigger */}
        <Suspense>
          <FilterPanelSheet />
        </Suspense>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar filters */}
        <aside className="hidden w-60 flex-shrink-0 lg:block">
          <Suspense>
            <FilterPanel />
          </Suspense>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <EntityGrid
            entities={entities}
            pagination={pagination}
            searchParams={plainParams}
          />
        </div>
      </div>
    </div>
  )
}
