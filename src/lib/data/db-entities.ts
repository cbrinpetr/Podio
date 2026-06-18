import { prisma } from '@/lib/db'
import type { Entity, EntitySummary, FilterState, PaginationMeta } from '@/types/entity'
import { PAGE_SIZE } from '@/lib/constants/config'

// ─── Shape converters ─────────────────────────────────────────────────────────

function toEntity(row: any): Entity {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description ?? undefined,
    entityType: row.entityType,
    organisationType: row.organisationType ?? undefined,
    deliveryMode: row.deliveryMode ?? undefined,
    geographicCoverage: row.geographicCoverage ?? undefined,
    costType: row.costType ?? undefined,
    costDescription: row.costDescription ?? undefined,
    status: row.status,
    verificationStatus: row.verificationStatus,
    isFeatured: row.isFeatured,
    logoUrl: row.logoUrl ?? undefined,
    bannerUrl: row.bannerUrl ?? undefined,
    website: row.website ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    sectors: ((row.sectors as string[]) ?? []) as any,
    audiences: ((row.audiences as string[]) ?? []) as any,
    stages: ((row.stages as string[]) ?? []) as any,
    tags: (row.tags as string[]) ?? [],
    contacts: (row.contacts as any[]) ?? [],
    socialLinks: row.socialLinks ?? undefined,
    location:
      row.locationSuburb || row.locationAddressLine1 || row.locationIsVirtual
        ? {
            addressLine1: row.locationAddressLine1 ?? undefined,
            suburb: row.locationSuburb ?? undefined,
            state: row.locationState ?? undefined,
            postcode: row.locationPostcode ?? undefined,
            latitude: row.locationLatitude ?? undefined,
            longitude: row.locationLongitude ?? undefined,
            precinct: row.locationPrecinct ?? undefined,
            isVirtual: row.locationIsVirtual,
            locationNotes: row.locationNotes ?? undefined,
          }
        : undefined,
    fundingAmount: row.fundingAmount ?? undefined,
    foundedYear: row.foundedYear ?? undefined,
    programStartDate: row.programStartDate?.toISOString() ?? undefined,
    programEndDate: row.programEndDate?.toISOString() ?? undefined,
    applicationDeadline: row.applicationDeadline?.toISOString() ?? undefined,
    viewCount: row.viewCount,
    sourceUrl: row.sourceUrl ?? undefined,
    publishedAt: row.publishedAt?.toISOString() ?? undefined,
    lastReviewedAt: row.lastReviewedAt?.toISOString() ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

function toSummary(entity: Entity): EntitySummary {
  const {
    description, email, phone, socialLinks, costDescription,
    fundingAmount, contacts, foundedYear, programStartDate,
    programEndDate, applicationDeadline, createdAt, publishedAt,
    lastReviewedAt, sourceUrl,
    ...summary
  } = entity
  return summary
}

// ─── Public data access ───────────────────────────────────────────────────────

export async function getAllEntitiesFromDB(): Promise<Entity[]> {
  const rows = await prisma.entity.findMany({ where: { status: 'published' } })
  return rows.map(toEntity)
}

export async function getEntityBySlugFromDB(slug: string): Promise<Entity | null> {
  const row = await prisma.entity.findUnique({ where: { slug, status: 'published' } })
  return row ? toEntity(row) : null
}

export async function getFeaturedEntitiesFromDB(limit = 6): Promise<EntitySummary[]> {
  const rows = await prisma.entity.findMany({
    where: { status: 'published', isFeatured: true },
    orderBy: { viewCount: 'desc' },
    take: limit,
  })
  return rows.map(toEntity).map(toSummary)
}

export async function getEntityStatsFromDB() {
  const all = await prisma.entity.findMany({
    where: { status: 'published' },
    select: { entityType: true },
  })
  const byType: Record<string, number> = {}
  for (const e of all) {
    byType[e.entityType] = (byType[e.entityType] ?? 0) + 1
  }
  return { total: all.length, byType }
}

export async function listEntitiesFromDB(filter: FilterState): Promise<{
  entities: EntitySummary[]
  pagination: PaginationMeta
}> {
  const where: any = { status: 'published' }

  if (filter.featured) where.isFeatured = true
  if (filter.delivery) where.deliveryMode = filter.delivery
  if (filter.coverage) where.geographicCoverage = filter.coverage
  if (filter.cost) where.costType = filter.cost
  if (filter.type?.length) where.entityType = { in: filter.type }

  if (filter.q) {
    where.OR = [
      { name: { contains: filter.q, mode: 'insensitive' } },
      { shortDescription: { contains: filter.q, mode: 'insensitive' } },
    ]
  }

  let rows = await prisma.entity.findMany({ where })

  // Filter JSON array fields in JS (Prisma doesn't support array contains for Json type easily)
  if (filter.sector?.length) {
    rows = rows.filter((r) => filter.sector!.some((s) => (r.sectors as string[]).includes(s)))
  }
  if (filter.audience?.length) {
    rows = rows.filter((r) => filter.audience!.some((a) => (r.audiences as string[]).includes(a)))
  }
  if (filter.stage?.length) {
    rows = rows.filter((r) => filter.stage!.some((s) => (r.stages as string[]).includes(s)))
  }

  // Sort
  switch (filter.sort ?? 'relevance') {
    case 'name': rows.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'newest': rows.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()); break
    case 'most-viewed': rows.sort((a, b) => b.viewCount - a.viewCount); break
    default:
      rows.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return b.viewCount - a.viewCount
      })
  }

  const page = filter.page ?? 1
  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const sliced = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(toEntity).map(toSummary)

  return { entities: sliced, pagination: { page, limit: PAGE_SIZE, total, totalPages } }
}

export async function searchSuggestionsFromDB(q: string, limit = 8): Promise<EntitySummary[]> {
  if (!q || q.length < 2) return []
  const rows = await prisma.entity.findMany({
    where: {
      status: 'published',
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { shortDescription: { contains: q, mode: 'insensitive' } },
      ],
    },
    orderBy: { viewCount: 'desc' },
    take: limit,
  })
  return rows.map(toEntity).map(toSummary)
}

export async function getRelatedEntitiesFromDB(entity: Entity, limit = 6): Promise<EntitySummary[]> {
  const rows = await prisma.entity.findMany({
    where: { status: 'published', id: { not: entity.id } },
  })
  return rows
    .map((r) => {
      const e = toEntity(r)
      const score =
        e.sectors.filter((s) => entity.sectors.includes(s)).length * 2 +
        e.audiences.filter((a) => entity.audiences.includes(a)).length +
        e.stages.filter((s) => entity.stages.includes(s)).length +
        (e.entityType === entity.entityType ? 1 : 0)
      return { entity: e, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => toSummary(x.entity))
}
