import type { EntitySummary, PaginationMeta } from '@/types/entity'
import { EntityCard } from '@/components/entity/entity-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EntityGridProps {
  entities: EntitySummary[]
  pagination: PaginationMeta
  searchParams: Record<string, string | string[]>
}

export function EntityGrid({ entities, pagination, searchParams }: EntityGridProps) {
  if (entities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-lg font-medium">No results found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your filters or searching for something different.
        </p>
      </div>
    )
  }

  function buildPageUrl(page: number) {
    const params = new URLSearchParams()
    for (const [key, val] of Object.entries(searchParams)) {
      if (Array.isArray(val)) val.forEach((v) => params.append(key, v))
      else if (val) params.set(key, val)
    }
    params.set('page', String(page))
    return `/directory?${params.toString()}`
  }

  return (
    <div>
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {entities.length} of {pagination.total} result{pagination.total !== 1 ? 's' : ''}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {pagination.page > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildPageUrl(pagination.page - 1)}>Previous</Link>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          {pagination.page < pagination.totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildPageUrl(pagination.page + 1)}>Next</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
