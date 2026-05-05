'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ENTITY_TYPES, SECTORS, AUDIENCES, STAGES, DELIVERY_MODES, GEOGRAPHIC_COVERAGES, COST_TYPES } from '@/lib/constants/taxonomy'
import { EntityTypeIcon } from '@/components/entity/entity-type-icon'
import type { EntityTypeSlug, SectorSlug, AudienceSlug, StageSlug } from '@/types/entity'
import { cn } from '@/lib/utils/cn'

interface FilterPanelProps {
  className?: string
  onClose?: () => void
}

export function FilterPanel({ className, onClose }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getArray = (key: string) => searchParams.getAll(key)
  const get = (key: string) => searchParams.get(key) ?? ''

  const activeTypes = getArray('type') as EntityTypeSlug[]
  const activeSectors = getArray('sector') as SectorSlug[]
  const activeAudiences = getArray('audience') as AudienceSlug[]
  const activeStages = getArray('stage') as StageSlug[]
  const activeDelivery = get('delivery')
  const activeCoverage = get('coverage')
  const activeCost = get('cost')

  const hasActiveFilters =
    activeTypes.length > 0 || activeSectors.length > 0 || activeAudiences.length > 0 ||
    activeStages.length > 0 || activeDelivery || activeCoverage || activeCost

  const updateFilter = useCallback((key: string, value: string, multi = false) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')

    if (multi) {
      const current = params.getAll(key)
      if (current.includes(value)) {
        // Remove
        params.delete(key)
        current.filter((v) => v !== value).forEach((v) => params.append(key, v))
      } else {
        params.append(key, value)
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    router.push(`/directory?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = () => {
    const params = new URLSearchParams()
    const q = searchParams.get('q')
    if (q) params.set('q', q)
    router.push(`/directory?${params.toString()}`)
  }

  return (
    <aside className={cn('space-y-5', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline">
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Entity Type */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Type</h3>
        <div className="space-y-1">
          {ENTITY_TYPES.map((type) => (
            <button
              key={type.slug}
              onClick={() => updateFilter('type', type.slug, true)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors text-left',
                activeTypes.includes(type.slug)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-foreground'
              )}
            >
              <EntityTypeIcon type={type.slug} size="sm" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sector */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Sector</h3>
        <div className="flex flex-wrap gap-1.5">
          {SECTORS.map((sector) => (
            <button
              key={sector.slug}
              onClick={() => updateFilter('sector', sector.slug, true)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeSectors.includes(sector.slug)
                  ? 'border-transparent text-white'
                  : 'border-border hover:border-primary/30 text-foreground hover:bg-muted'
              )}
              style={
                activeSectors.includes(sector.slug) && sector.colour
                  ? { backgroundColor: sector.colour }
                  : activeSectors.includes(sector.slug)
                  ? { backgroundColor: 'hsl(var(--primary))' }
                  : undefined
              }
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Audience */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">I am a…</h3>
        <div className="flex flex-wrap gap-1.5">
          {AUDIENCES.map((aud) => (
            <button
              key={aud.slug}
              onClick={() => updateFilter('audience', aud.slug, true)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeAudiences.includes(aud.slug)
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/30 text-foreground hover:bg-muted'
              )}
            >
              {aud.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Stage */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Stage</h3>
        <div className="flex flex-wrap gap-1.5">
          {STAGES.map((stage) => (
            <button
              key={stage.slug}
              onClick={() => updateFilter('stage', stage.slug, true)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeStages.includes(stage.slug)
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/30 text-foreground hover:bg-muted'
              )}
            >
              {stage.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Cost */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Cost</h3>
        <div className="flex flex-wrap gap-1.5">
          {COST_TYPES.map((cost) => (
            <button
              key={cost.value}
              onClick={() => updateFilter('cost', cost.value)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeCost === cost.value
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/30 text-foreground hover:bg-muted'
              )}
            >
              {cost.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Delivery */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Delivery</h3>
        <div className="flex flex-wrap gap-1.5">
          {DELIVERY_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => updateFilter('delivery', mode.value)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeDelivery === mode.value
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/30 text-foreground hover:bg-muted'
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Coverage */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Coverage</h3>
        <div className="flex flex-wrap gap-1.5">
          {GEOGRAPHIC_COVERAGES.map((cov) => (
            <button
              key={cov.value}
              onClick={() => updateFilter('coverage', cov.value)}
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
                activeCoverage === cov.value
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/30 text-foreground hover:bg-muted'
              )}
            >
              {cov.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
