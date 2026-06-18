import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const status = req.nextUrl.searchParams.get('status') ?? undefined

  const claims = await prisma.claimRequest.findMany({
    where: status ? { status } : undefined,
    include: { entity: { select: { id: true, name: true, slug: true, entityType: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ claims })
}
