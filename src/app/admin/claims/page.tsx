import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { EntityTypeBadge } from '@/components/entity/entity-type-badge'
import { ClaimActions } from './claim-actions'

export const dynamic = 'force-dynamic'

export default async function ClaimsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const claims = await prisma.claimRequest.findMany({
    include: { entity: { select: { id: true, name: true, slug: true, entityType: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const statusColour: Record<string, string> = {
    pending: 'text-orange-700 bg-orange-50 border-orange-200',
    approved: 'text-green-700 bg-green-50 border-green-200',
    rejected: 'text-red-700 bg-red-50 border-red-200',
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Claim Requests</h1>
        <p className="text-sm text-muted-foreground">{claims.filter(c => c.status === 'pending').length} pending</p>
      </div>

      {claims.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
          No claim requests yet
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <EntityTypeBadge type={claim.entity.entityType as any} />
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColour[claim.status] ?? ''}`}>
                      {claim.status}
                    </span>
                  </div>
                  <Link href={`/directory/${claim.entity.slug}`} target="_blank"
                    className="font-semibold hover:underline">{claim.entity.name}</Link>
                </div>
                <p className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(claim.createdAt).toLocaleDateString('en-AU')}
                </p>
              </div>

              <div className="mb-4 grid gap-2 text-sm sm:grid-cols-2">
                <div><span className="text-muted-foreground">Name:</span> {claim.name}</div>
                <div><span className="text-muted-foreground">Position:</span> {claim.position}</div>
                <div className="sm:col-span-2"><span className="text-muted-foreground">Relationship:</span> {claim.description}</div>
                <div><span className="text-muted-foreground">Email:</span>{' '}
                  <a href={`mailto:${claim.email}`} className="text-primary hover:underline">{claim.email}</a>
                </div>
              </div>

              {claim.inviteToken && (
                <div className="mb-4 rounded-lg bg-muted/50 p-3 text-xs">
                  <p className="font-medium mb-1">Edit link (send to claimant):</p>
                  <p className="font-mono break-all text-muted-foreground">
                    {process.env.NEXT_PUBLIC_APP_URL ?? ''}/editor/{claim.inviteToken}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Expires: {claim.inviteExpiry ? new Date(claim.inviteExpiry).toLocaleDateString('en-AU') : '—'}
                  </p>
                </div>
              )}

              <ClaimActions claimId={claim.id} status={claim.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
