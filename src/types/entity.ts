// ─── Enums ───────────────────────────────────────────────────────────────────

export type EntityTypeSlug =
  | 'organisation'
  | 'program'
  | 'grant'
  | 'investor'
  | 'network'
  | 'space'
  | 'university'
  | 'government'
  | 'service-provider'
  | 'event-series'
  | 'mentor'

export type SectorSlug =
  | 'cyber'
  | 'defence'
  | 'space'
  | 'climate'
  | 'clean-energy'
  | 'health'
  | 'agrifood'
  | 'creative'
  | 'education'
  | 'quantum'
  | 'ai-data'
  | 'govtech'
  | 'fintech'
  | 'deep-tech'
  | 'social-impact'
  | 'sustainability'
  | 'advanced-manufacturing'
  | 'generalist'

export type AudienceSlug =
  | 'founder'
  | 'startup'
  | 'sme'
  | 'researcher'
  | 'student'
  | 'investor'
  | 'corporate'
  | 'government'
  | 'community'

export type StageSlug =
  | 'idea'
  | 'early'
  | 'growth'
  | 'scale'
  | 'commercialisation'
  | 'export'

export type DeliveryMode = 'in-person' | 'online' | 'hybrid' | 'self-paced' | 'cohort' | 'on-demand'

export type GeographicCoverage = 'act-only' | 'act-region' | 'national' | 'international' | 'global'

export type OrganisationType =
  | 'for-profit'
  | 'not-for-profit'
  | 'government'
  | 'university'
  | 'cooperative'
  | 'association'
  | 'trust'
  | 'individual'
  | 'other'

export type CostType = 'free' | 'paid' | 'equity-based' | 'grant-funded' | 'subsidised' | 'mixed' | 'upon-application'

export type EntityStatus = 'draft' | 'pending-review' | 'published' | 'archived' | 'rejected'

export type VerificationStatus = 'unverified' | 'self-reported' | 'verified' | 'sample-data' | 'community-verified'

export type EntityRelationType =
  | 'parent-of'
  | 'partner-of'
  | 'funds'
  | 'hosts'
  | 'runs-program'
  | 'member-of'
  | 'affiliated-with'
  | 'sponsored-by'

// ─── Location ─────────────────────────────────────────────────────────────────

export interface EntityLocation {
  addressLine1?: string
  suburb?: string
  state?: string
  postcode?: string
  fullAddress?: string
  latitude?: number
  longitude?: number
  precinct?: string
  isVirtual?: boolean
  locationNotes?: string
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface EntityContact {
  name?: string
  role?: string
  email?: string
  phone?: string
  isPrimary?: boolean
}

// ─── Social links ─────────────────────────────────────────────────────────────

export interface SocialLinks {
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  youtube?: string
}

// ─── Core Entity (summary — used in cards, lists, map popups) ─────────────────

export interface EntitySummary {
  id: string
  slug: string
  name: string
  shortDescription: string
  entityType: EntityTypeSlug
  organisationType?: OrganisationType
  deliveryMode?: DeliveryMode
  geographicCoverage?: GeographicCoverage
  costType?: CostType
  status: EntityStatus
  verificationStatus: VerificationStatus
  isFeatured: boolean
  logoUrl?: string
  bannerUrl?: string
  website?: string
  sectors: SectorSlug[]
  audiences: AudienceSlug[]
  stages: StageSlug[]
  tags: string[]
  location?: EntityLocation
  viewCount: number
  updatedAt: string
}

// ─── Full Entity (detail page) ────────────────────────────────────────────────

export interface Entity extends EntitySummary {
  description?: string
  email?: string
  phone?: string
  socialLinks?: SocialLinks
  categoryId?: string
  foundedYear?: number
  programStartDate?: string
  programEndDate?: string
  applicationDeadline?: string
  costDescription?: string
  fundingAmount?: number
  contacts: EntityContact[]
  relatedEntities?: EntitySummary[]
  createdAt: string
  publishedAt?: string
  lastReviewedAt?: string
  sourceUrl?: string
}

// ─── Taxonomy items ───────────────────────────────────────────────────────────

export interface EntityType {
  slug: EntityTypeSlug
  label: string
  description: string
  icon: string
  colour: string
}

export interface Sector {
  slug: SectorSlug
  label: string
  colour?: string
}

export interface Audience {
  slug: AudienceSlug
  label: string
  description: string
  icon: string
}

export interface Stage {
  slug: StageSlug
  label: string
  description: string
  sortOrder: number
}

// ─── Search / filter ─────────────────────────────────────────────────────────

export interface FilterState {
  q?: string
  type?: EntityTypeSlug[]
  sector?: SectorSlug[]
  audience?: AudienceSlug[]
  stage?: StageSlug[]
  delivery?: DeliveryMode
  coverage?: GeographicCoverage
  cost?: CostType
  featured?: boolean
  page?: number
  sort?: 'relevance' | 'name' | 'newest' | 'most-viewed'
}

export interface SearchResult {
  id: string
  slug: string
  name: string
  entityType: EntityTypeSlug
  shortDescription: string
  sectors: SectorSlug[]
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}
