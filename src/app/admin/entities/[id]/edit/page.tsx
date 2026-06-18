import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { EntityForm } from '@/components/admin/entity-form'

export const dynamic = 'force-dynamic'

export default async function EditEntityPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const entity = await prisma.entity.findUnique({ where: { id: params.id } })
  if (!entity) notFound()

  // Normalise dates to strings for the form
  const initial = {
    ...entity,
    programStartDate: entity.programStartDate?.toISOString() ?? null,
    programEndDate: entity.programEndDate?.toISOString() ?? null,
    applicationDeadline: entity.applicationDeadline?.toISOString() ?? null,
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Edit: {entity.name}</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated {new Date(entity.updatedAt).toLocaleDateString('en-AU')}</p>
      <EntityForm mode="edit" entityId={params.id} initial={initial} />
    </div>
  )
}
