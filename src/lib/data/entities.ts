import type { Entity, EntitySummary, FilterState, PaginationMeta } from '@/types/entity'
import { SAMPLE_ENTITIES } from './sample-entities'
import { PAGE_SIZE } from '@/lib/constants/config'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSummary(entity: Entity): EntitySummary {
  const {
    description, email, phone, socialLinks, categoryId, foundedYear,
    programStartDate, programEndDate, applicationDeadline, costDescription,
    fundingAmount, contacts, relatedEntities, createdAt, publishedAt,
    lastReviewedAt, sourceUrl, ...summary
  } = entity
  return summary
}

// ─── Data access ──────────────────────────────────────────────────────────────

export function getAllEntities(): Entity[] {
  return SAMPLE_ENTITIES.filter((e) => e.status === 'published')
}

export function getEntityBySlug(slug: string): Entity | null {
  return SAMPLE_ENTITIES.find((e) => e.slug === slug && e.status === 'published') ?? null
}

export function getFeaturedEntities(limit = 6): EntitySummary[] {
  return getAllEntities()
    .filter((e) => e.isFeatured)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit)
    .map(toSummary)
}

export function getEntityStats() {
  const all = getAllEntities()
  return {
    total: all.length,
    byType: Object.fromEntries(
      ['organisation', 'program', 'grant', 'investor', 'network', 'space', 'university', 'government', 'service-provider', 'event-series', 'mentor'].map(
        (type) => [type, all.filter((e) => e.entityType === type).length]
      )
    ),
  }
}

// ─── Filtered listing ─────────────────────────────────────────────────────────

export interface ListResult {
  entities: EntitySummary[]
  pagination: PaginationMeta
}

export function listEntities(filter: FilterState): ListResult {
  let results = getAllEntities()

  // Text search
  if (filter.q) {
    const q = filter.q.toLowerCase()
    results = results.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  // Type filter
  if (filter.type && filter.type.length > 0) {
    results = results.filter((e) => filter.type!.includes(e.entityType))
  }

  // Sector filter
  if (filter.sector && filter.sector.length > 0) {
    results = results.filter((e) =>
      filter.sector!.some((s) => e.sectors.includes(s))
    )
  }

  // Audience filter
  if (filter.audience && filter.audience.length > 0) {
    results = results.filter((e) =>
      filter.audience!.some((a) => e.audiences.includes(a))
    )
  }

  // Stage filter
  if (filter.stage && filter.stage.length > 0) {
    results = results.filter((e) =>
      filter.stage!.some((s) => e.stages.includes(s))
    )
  }

  // Delivery mode
  if (filter.delivery) {
    results = results.filter((e) => e.deliveryMode === filter.delivery)
  }

  // Coverage
  if (filter.coverage) {
    results = results.filter((e) => e.geographicCoverage === filter.coverage)
  }

  // Cost
  if (filter.cost) {
    results = results.filter((e) => e.costType === filter.cost)
  }

  // Featured
  if (filter.featured) {
    results = results.filter((e) => e.isFeatured)
  }

  // Sort
  switch (filter.sort ?? 'relevance') {
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      break
    case 'most-viewed':
      results.sort((a, b) => b.viewCount - a.viewCount)
      break
    default:
      // relevance: featured first, then view count
      results.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return b.viewCount - a.viewCount
      })
  }

  const page = filter.page ?? 1
  const total = results.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const sliced = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(toSummary)

  return {
    entities: sliced,
    pagination: { page, limit: PAGE_SIZE, total, totalPages },
  }
}

// ─── Autocomplete ─────────────────────────────────────────────────────────────

export function searchSuggestions(q: string, limit = 8): EntitySummary[] {
  if (!q || q.length < 2) return []
  const lower = q.toLowerCase()
  return getAllEntities()
    .filter(
      (e) =>
        e.name.toLowerCase().includes(lower) ||
        e.shortDescription.toLowerCase().includes(lower)
    )
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit)
    .map(toSummary)
}

// ─── Related ──────────────────────────────────────────────────────────────────

export function getRelatedEntities(entity: Entity, limit = 6): EntitySummary[] {
  return getAllEntities()
    .filter((e) => e.id !== entity.id)
    .map((e) => ({
      entity: e,
      score:
        e.sectors.filter((s) => entity.sectors.includes(s)).length * 2 +
        e.audiences.filter((a) => entity.audiences.includes(a)).length +
        e.stages.filter((s) => entity.stages.includes(s)).length +
        (e.entityType === entity.entityType ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => toSummary(x.entity))
}
