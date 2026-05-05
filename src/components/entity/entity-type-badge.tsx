import { getEntityType } from '@/lib/constants/taxonomy'
import type { EntityTypeSlug } from '@/types/entity'
import { EntityTypeIcon } from './entity-type-icon'
import { cn } from '@/lib/utils/cn'

interface EntityTypeBadgeProps {
  type: EntityTypeSlug
  className?: string
  showIcon?: boolean
}

export function EntityTypeBadge({ type, className, showIcon = true }: EntityTypeBadgeProps) {
  const entityType = getEntityType(type)
  if (!entityType) return null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white',
        className
      )}
      style={{ backgroundColor: entityType.colour }}
    >
      {showIcon && <EntityTypeIcon type={type} size="sm" />}
      {entityType.label}
    </span>
  )
}
