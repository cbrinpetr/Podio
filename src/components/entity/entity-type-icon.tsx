import {
  Building2, Rocket, DollarSign, TrendingUp, Users, MapPin,
  GraduationCap, Landmark, Briefcase, Calendar, UserCheck,
} from 'lucide-react'
import type { EntityTypeSlug } from '@/types/entity'
import { cn } from '@/lib/utils/cn'

const ICON_MAP: Record<EntityTypeSlug, React.ElementType> = {
  organisation: Building2,
  program: Rocket,
  grant: DollarSign,
  investor: TrendingUp,
  network: Users,
  space: MapPin,
  university: GraduationCap,
  government: Landmark,
  'service-provider': Briefcase,
  'event-series': Calendar,
  mentor: UserCheck,
}

interface EntityTypeIconProps {
  type: EntityTypeSlug
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export function EntityTypeIcon({ type, className, size = 'md' }: EntityTypeIconProps) {
  const Icon = ICON_MAP[type] ?? Building2
  return <Icon className={cn(SIZE_MAP[size], className)} />
}
