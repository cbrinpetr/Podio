import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { randomBytes } from 'crypto'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const claim = await prisma.claimRequest.findUnique({
    where: { id: params.id },
    include: { entity: true },
  })

  if (!claim) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Generate a secure token valid for 30 days
  const token = randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  const updated = await prisma.claimRequest.update({
    where: { id: params.id },
    data: {
      status: 'approved',
      inviteToken: token,
      inviteExpiry: expiry,
      invitedAt: new Date(),
    },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const editUrl = `${appUrl}/editor/${token}`

  return NextResponse.json({ token, editUrl, expiry })
}
