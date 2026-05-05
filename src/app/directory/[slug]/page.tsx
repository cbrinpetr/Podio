import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Globe, Mail, Phone, MapPin, Calendar, DollarSign,
  ArrowLeft, ExternalLink, Users, Tag
} from 'lucide-react'
import { getEntityBySlug, getRelatedEntities } from '@/lib/data/entities'
import { EntityTypeBadge } from '@/components/entity/entity-type-badge'
import { EntityCard } from '@/components/entity/entity-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getSector, getAudience, getStage } from '@/lib/constants/taxonomy'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entity = getEntityBySlug(params.slug)
  if (!entity) return {}
  return {
    title: entity.name,
    description: entity.shortDescription,
  }
}

const DELIVERY_LABELS: Record<string, string> = {
  'in-person': 'In Person',
  online: 'Online / Remote',
  hybrid: 'Hybrid',
  'self-paced': 'Self-Paced',
  cohort: 'Cohort-Based',
  'on-demand': 'On Demand',
}

const COVERAGE_LABELS: Record<string, string> = {
  'act-only': 'ACT Only',
  'act-region': 'ACT / Canberra Region',
  national: 'National',
  international: 'International',
  global: 'Global',
}

const COST_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Paid',
  'equity-based': 'Equity-Based',
  'grant-funded': 'Grant-Funded',
  subsidised: 'Subsidised',
  mixed: 'Mixed',
  'upon-application': 'Upon Application',
}

const VERIFICATION_LABELS: Record<string, { label: string; colour: string }> = {
  verified: { label: 'Verified', colour: 'text-green-700 bg-green-50 border-green-200' },
  'self-reported': { label: 'Self-Reported', colour: 'text-blue-700 bg-blue-50 border-blue-200' },
  unverified: { label: 'Unverified', colour: 'text-muted-foreground bg-muted border-border' },
  'sample-data': { label: 'Sample Data', colour: 'text-orange-700 bg-orange-50 border-orange-200' },
  'community-verified': { label: 'Community Verified', colour: 'text-purple-700 bg-purple-50 border-purple-200' },
}

export default function EntityDetailPage({ params }: PageProps) {
  const entity = getEntityBySlug(params.slug)
  if (!entity) notFound()

  const related = getRelatedEntities(entity, 3)
  const verification = VERIFICATION_LABELS[entity.verificationStatus]

  const locationStr = entity.location
    ? entity.location.isVirtual
      ? 'Online / Virtual'
      : [
          entity.location.addressLine1,
          entity.location.suburb,
          entity.location.state,
          entity.location.postcode,
        ]
          .filter(Boolean)
          .join(', ')
    : null

  return (
    <div className="container py-8">
      {/* Back */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/directory">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to directory
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <EntityTypeBadge type={entity.entityType} />
              {entity.isFeatured && (
                <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  Featured
                </span>
              )}
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${verification?.colour}`}
              >
                {verification?.label}
              </span>
            </div>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl mb-2">{entity.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{entity.shortDescription}</p>
          </div>

          {/* Quick meta */}
          <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {entity.costType && (
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                {COST_LABELS[entity.costType] ?? entity.costType}
                {entity.fundingAmount ? ` (up to ${formatCurrency(entity.fundingAmount)})` : ''}
              </span>
            )}
            {entity.deliveryMode && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {DELIVERY_LABELS[entity.deliveryMode] ?? entity.deliveryMode}
              </span>
            )}
            {entity.geographicCoverage && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {COVERAGE_LABELS[entity.geographicCoverage] ?? entity.geographicCoverage}
              </span>
            )}
            {entity.applicationDeadline && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Deadline: {formatDate(entity.applicationDeadline)}
              </span>
            )}
          </div>

          <Separator className="mb-6" />

          {/* Description */}
          {entity.description && (
            <div className="mb-8 prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{entity.description}</ReactMarkdown>
            </div>
          )}

          {/* Tags */}
          {entity.tags.length > 0 && (
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                <Tag className="h-4 w-4 text-muted-foreground" />
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entity.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related entities */}
          {related.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Related resources</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {related.map((e) => (
                  <EntityCard key={e.id} entity={e} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Contact / links */}
          <div className="rounded-xl border bg-card p-5 space-y-4">
            {entity.website && (
              <Button asChild className="w-full">
                <a href={entity.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit website
                  <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-60" />
                </a>
              </Button>
            )}

            {entity.contacts.length > 0 && (
              <div className="space-y-2">
                {entity.contacts.filter(c => c.isPrimary).slice(0, 2).map((c, i) => (
                  <div key={i} className="text-sm space-y-1">
                    {c.name && <p className="font-medium">{c.name}</p>}
                    {c.role && <p className="text-muted-foreground text-xs">{c.role}</p>}
                    {c.email && (
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                        <Mail className="h-3.5 w-3.5" />
                        {c.email}
                      </a>
                    )}
                    {c.phone && (
                      <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        {c.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          {locationStr && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-2 text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location
              </h3>
              <p className="text-sm text-muted-foreground">{locationStr}</p>
              {entity.location?.precinct && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Precinct: {entity.location.precinct}
                </p>
              )}
              {entity.location?.locationNotes && (
                <p className="mt-1 text-xs italic text-muted-foreground">
                  {entity.location.locationNotes}
                </p>
              )}
            </div>
          )}

          {/* Sectors */}
          {entity.sectors.length > 0 && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold">Sectors</h3>
              <div className="flex flex-wrap gap-1.5">
                {entity.sectors.map((slug) => {
                  const sector = getSector(slug)
                  return (
                    <Link
                      key={slug}
                      href={`/directory?sector=${slug}`}
                      className="rounded-full border px-2.5 py-0.5 text-xs font-medium hover:bg-muted transition-colors"
                      style={sector?.colour ? { borderColor: sector.colour + '50', color: sector.colour } : undefined}
                    >
                      {sector?.label ?? slug}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Audiences */}
          {entity.audiences.length > 0 && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold">Best for</h3>
              <div className="flex flex-wrap gap-1.5">
                {entity.audiences.map((slug) => {
                  const audience = getAudience(slug)
                  return (
                    <Link
                      key={slug}
                      href={`/directory?audience=${slug}`}
                      className="rounded-full border px-2.5 py-0.5 text-xs font-medium hover:bg-muted transition-colors"
                    >
                      {audience?.label ?? slug}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Stages */}
          {entity.stages.length > 0 && (
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold">Stage</h3>
              <div className="flex flex-wrap gap-1.5">
                {entity.stages.map((slug) => {
                  const stage = getStage(slug)
                  return (
                    <Link
                      key={slug}
                      href={`/directory?stage=${slug}`}
                      className="rounded-full border px-2.5 py-0.5 text-xs font-medium hover:bg-muted transition-colors"
                    >
                      {stage?.label ?? slug}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="text-xs text-muted-foreground space-y-1">
            {entity.updatedAt && (
              <p>Updated: {formatDate(entity.updatedAt)}</p>
            )}
            <p>{entity.viewCount.toLocaleString()} views</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
