import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { EntityForm } from '@/components/admin/entity-form'

export default async function NewEntityPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Add new entry</h1>
      <p className="text-sm text-muted-foreground mb-8">Fill in the details below. Status defaults to Draft — change to Published to show on the site.</p>
      <EntityForm mode="create" />
    </div>
  )
}
