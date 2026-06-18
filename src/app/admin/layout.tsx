import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminNav } from '@/components/admin/admin-nav'
import { Providers } from '@/components/layout/providers'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <Providers>
      <div className="flex h-screen overflow-hidden bg-background">
        {session && <AdminNav />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </Providers>
  )
}
