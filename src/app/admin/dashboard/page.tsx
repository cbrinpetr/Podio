import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EntityTypeBadge } from '@/components/entity/entity-type-badge'
import { DeleteEntityButton } from './delete-entity-button'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  const entities = await prisma.entity.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, slug: true, name: true, entityType: true, status: true, isFeatured: true, updatedAt: true, viewCount: true },
  })

  const statusColour: Record<string, string> = {
    published: 'text-green-700 bg-green-50 border-green-200',
    draft: 'text-muted-foreground bg-muted border-border',
    archived: 'text-orange-700 bg-orange-50 border-orange-200',
    'pending-review': 'text-blue-700 bg-blue-50 border-blue-200',
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Entities</h1>
          <p className="text-sm text-muted-foreground">{entities.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/entities/new">
            <Plus className="mr-2 h-4 w-4" />
            Add entry
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Views</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Updated</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {entities.map((e) => (
              <tr key={e.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">
                  {e.name}
                  {e.isFeatured && <span className="ml-2 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">Featured</span>}
                </td>
                <td className="px-4 py-3"><EntityTypeBadge type={e.entityType as any} /></td>
                <td className="px-4 py-3">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColour[e.status] ?? ''}`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{e.viewCount}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(e.updatedAt).toLocaleDateString('en-AU')}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/directory/${e.slug}`} target="_blank" className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/admin/entities/${e.id}/edit`} className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteEntityButton id={e.id} name={e.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
