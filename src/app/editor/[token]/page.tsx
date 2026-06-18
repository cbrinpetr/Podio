import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { EntityForm } from '@/components/admin/entity-form'

export const dynamic = 'force-dynamic'

export default async function EditorPage({ params }: { params: { token: string } }) {
  const claim = await prisma.claimRequest.findUnique({
    where: { inviteToken: params.token },
    include: { entity: true },
  })

  if (!claim || claim.status !== 'approved') notFound()
  if (claim.inviteExpiry && claim.inviteExpiry < new Date()) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Link expired</h1>
          <p className="text-muted-foreground">This edit link has expired. Please contact the admin for a new one.</p>
        </div>
      </div>
    )
  }

  const entity = claim.entity
  const initial = {
    ...entity,
    programStartDate: entity.programStartDate?.toISOString() ?? null,
    programEndDate: entity.programEndDate?.toISOString() ?? null,
    applicationDeadline: entity.applicationDeadline?.toISOString() ?? null,
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="border-b bg-background px-8 py-4">
        <p className="text-sm text-muted-foreground">Editing as <strong>{claim.name}</strong></p>
        <h1 className="text-xl font-bold">{entity.name}</h1>
      </div>
      <div className="max-w-3xl p-8">
        <EntityForm mode="edit" token={params.token} initial={initial} />
      </div>
    </div>
  )
}
