import type { EntityType, Sector, Audience, Stage } from '@/types/entity'

export const ENTITY_TYPES: EntityType[] = [
  {
    slug: 'organisation',
    label: 'Organisation',
    description: 'Startups, scaleups, SMEs, NFPs, corporates',
    icon: 'Building2',
    colour: '#2563EB',
  },
  {
    slug: 'program',
    label: 'Program',
    description: 'Accelerators, incubators, bootcamps, fellowships',
    icon: 'Rocket',
    colour: '#7C3AED',
  },
  {
    slug: 'grant',
    label: 'Grant / Funding',
    description: 'Grants, funding rounds, financial support',
    icon: 'DollarSign',
    colour: '#059669',
  },
  {
    slug: 'investor',
    label: 'Investor',
    description: 'Angels, VCs, government funds, impact investors',
    icon: 'TrendingUp',
    colour: '#D97706',
  },
  {
    slug: 'network',
    label: 'Network / Community',
    description: 'Industry associations, founder communities, peer groups',
    icon: 'Users',
    colour: '#EA580C',
  },
  {
    slug: 'space',
    label: 'Space / Hub / Lab',
    description: 'Co-working, maker labs, innovation hubs, wet labs',
    icon: 'MapPin',
    colour: '#0891B2',
  },
  {
    slug: 'university',
    label: 'University / Research',
    description: 'Universities, research centres, institutes',
    icon: 'GraduationCap',
    colour: '#4F46E5',
  },
  {
    slug: 'government',
    label: 'Government / Agency',
    description: 'Government departments, agencies, public initiatives',
    icon: 'Landmark',
    colour: '#475569',
  },
  {
    slug: 'service-provider',
    label: 'Service Provider',
    description: 'Legal, accounting, IP, marketing, tech services',
    icon: 'Briefcase',
    colour: '#DB2777',
  },
  {
    slug: 'event-series',
    label: 'Event Series',
    description: 'Recurring events, meetups, conferences, hackathons',
    icon: 'Calendar',
    colour: '#9333EA',
  },
  {
    slug: 'mentor',
    label: 'Mentor / Advisor',
    description: 'Expert mentors, advisors, coaches',
    icon: 'UserCheck',
    colour: '#0D9488',
  },
]

export const SECTORS: Sector[] = [
  { slug: 'generalist', label: 'Generalist / All Sectors' },
  { slug: 'cyber', label: 'Cyber Security', colour: '#2563EB' },
  { slug: 'defence', label: 'Defence & National Security', colour: '#475569' },
  { slug: 'space', label: 'Space & Aerospace', colour: '#4F46E5' },
  { slug: 'climate', label: 'Climate & Environment', colour: '#16A34A' },
  { slug: 'clean-energy', label: 'Clean Energy', colour: '#15803D' },
  { slug: 'health', label: 'Health & MedTech', colour: '#DC2626' },
  { slug: 'agrifood', label: 'AgriFood & AgTech', colour: '#CA8A04' },
  { slug: 'creative', label: 'Creative Industries', colour: '#9333EA' },
  { slug: 'education', label: 'Education & EdTech', colour: '#0891B2' },
  { slug: 'quantum', label: 'Quantum Technologies', colour: '#7C3AED' },
  { slug: 'ai-data', label: 'AI, Data & Analytics', colour: '#2563EB' },
  { slug: 'govtech', label: 'GovTech & Civic Tech', colour: '#64748B' },
  { slug: 'fintech', label: 'FinTech & Financial Services', colour: '#0D9488' },
  { slug: 'deep-tech', label: 'Deep Tech', colour: '#7C3AED' },
  { slug: 'social-impact', label: 'Social Impact & NFP', colour: '#EA580C' },
  { slug: 'sustainability', label: 'Sustainability & Circular Economy', colour: '#16A34A' },
  { slug: 'advanced-manufacturing', label: 'Advanced Manufacturing', colour: '#D97706' },
]

export const AUDIENCES: Audience[] = [
  {
    slug: 'founder',
    label: 'Founder / Entrepreneur',
    description: 'Starting or building a business',
    icon: 'Lightbulb',
  },
  {
    slug: 'startup',
    label: 'Startup',
    description: 'Early-stage venture',
    icon: 'Rocket',
  },
  {
    slug: 'sme',
    label: 'SME / Established Business',
    description: 'Small to medium enterprise',
    icon: 'Building',
  },
  {
    slug: 'researcher',
    label: 'Researcher / Academic',
    description: 'University or research institution',
    icon: 'FlaskConical',
  },
  {
    slug: 'student',
    label: 'Student / Graduate',
    description: 'University student or recent graduate',
    icon: 'GraduationCap',
  },
  {
    slug: 'investor',
    label: 'Investor',
    description: 'Angel, VC, or institutional investor',
    icon: 'TrendingUp',
  },
  {
    slug: 'corporate',
    label: 'Corporate / Enterprise',
    description: 'Large established organisations',
    icon: 'Building2',
  },
  {
    slug: 'government',
    label: 'Government / Public Sector',
    description: 'Government agencies and public servants',
    icon: 'Landmark',
  },
  {
    slug: 'community',
    label: 'Community Organisation',
    description: 'NFPs, community groups, associations',
    icon: 'Heart',
  },
]

export const STAGES: Stage[] = [
  {
    slug: 'idea',
    label: 'Idea / Pre-Concept',
    description: 'Exploring a problem space, no product yet',
    sortOrder: 1,
  },
  {
    slug: 'early',
    label: 'Early Stage',
    description: 'MVP or prototype, minimal revenue',
    sortOrder: 2,
  },
  {
    slug: 'growth',
    label: 'Growth',
    description: 'Product-market fit, growing revenue',
    sortOrder: 3,
  },
  {
    slug: 'scale',
    label: 'Scale',
    description: 'Scaling operations and team',
    sortOrder: 4,
  },
  {
    slug: 'commercialisation',
    label: 'Commercialisation',
    description: 'Bringing innovation to market',
    sortOrder: 5,
  },
  {
    slug: 'export',
    label: 'Export Ready',
    description: 'International expansion stage',
    sortOrder: 6,
  },
]

export const DELIVERY_MODES = [
  { value: 'in-person', label: 'In Person' },
  { value: 'online', label: 'Online / Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'self-paced', label: 'Self-Paced' },
  { value: 'cohort', label: 'Cohort-Based' },
  { value: 'on-demand', label: 'On Demand' },
] as const

export const GEOGRAPHIC_COVERAGES = [
  { value: 'act-only', label: 'ACT Only' },
  { value: 'act-region', label: 'ACT / Canberra Region' },
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
  { value: 'global', label: 'Global' },
] as const

export const COST_TYPES = [
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
  { value: 'subsidised', label: 'Subsidised' },
  { value: 'grant-funded', label: 'Grant-Funded' },
  { value: 'equity-based', label: 'Equity-Based' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'upon-application', label: 'Upon Application' },
] as const

export const ORGANISATION_TYPES = [
  { value: 'for-profit', label: 'For-Profit' },
  { value: 'not-for-profit', label: 'Not-for-Profit' },
  { value: 'government', label: 'Government' },
  { value: 'university', label: 'University / Research' },
  { value: 'cooperative', label: 'Cooperative' },
  { value: 'association', label: 'Association' },
  { value: 'trust', label: 'Trust' },
  { value: 'individual', label: 'Individual' },
  { value: 'other', label: 'Other' },
] as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getEntityType(slug: string) {
  return ENTITY_TYPES.find((t) => t.slug === slug)
}

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug)
}

export function getAudience(slug: string) {
  return AUDIENCES.find((a) => a.slug === slug)
}

export function getStage(slug: string) {
  return STAGES.find((s) => s.slug === slug)
}
