import Link from 'next/link'
import { MapPin, Globe, ExternalLink } from 'lucide-react'
import type { EntitySummary } from '@/types/entity'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EntityTypeBadge } from './entity-type-badge'
import { getSector } from '@/lib/constants/taxonomy'
import { cn } from '@/lib/utils/cn'
import { truncate } from '@/lib/utils/format'

interface EntityCardProps {
  entity: EntitySummary
  className?: string
}

const COST_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Paid',
  'equity-based': 'Equity',
  'grant-funded': 'Grant',
  subsidised: 'Subsidised',
  mixed: 'Mixed',
  'upon-application': 'Apply',
}

export function EntityCard({ entity, className }: EntityCardProps) {
  const locationStr = entity.location
    ? entity.location.isVirtual
      ? 'Online / Virtual'
      : [entity.location.suburb, entity.location.state].filter(Boolean).join(', ')
    : null

  return (
    <Link href={`/directory/${entity.slug}`} className="group block">
      <Card className={cn('h-full card-hover cursor-pointer', className)}>
        <CardContent className="p-5">
          {/* Header row */}
          <div className="mb-3 flex items-start justify-between gap-2">
            <EntityTypeBadge type={entity.entityType} />
            {entity.costType && (
              <span className="text-xs font-medium text-muted-foreground">
                {COST_LABELS[entity.costType] ?? entity.costType}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="mb-1.5 font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {entity.name}
          </h3>

          {/* Description */}
          <p className="mb-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {truncate(entity.shortDescription, 120)}
          </p>

          {/* Sectors */}
          {entity.sectors.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {entity.sectors.slice(0, 3).map((slug) => {
                const sector = getSector(slug)
                return (
                  <Badge
                    key={slug}
                    variant="outline"
                    className="text-xs py-0 px-2"
                    style={sector?.colour ? { borderColor: sector.colour + '40', color: sector.colour } : undefined}
                  >
                    {sector?.label ?? slug}
                  </Badge>
                )
              })}
              {entity.sectors.length > 3 && (
                <Badge variant="muted" className="text-xs py-0 px-2">
                  +{entity.sectors.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {locationStr ? (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                {locationStr}
              </span>
            ) : (
              <span />
            )}
            {entity.isFeatured && (
              <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                Featured
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
