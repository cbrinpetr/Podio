import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

async function validateToken(token: string) {
  const claim = await prisma.claimRequest.findUnique({
    where: { inviteToken: token },
    include: { entity: true },
  })
  if (!claim) return null
  if (claim.status !== 'approved') return null
  if (claim.inviteExpiry && claim.inviteExpiry < new Date()) return null
  return claim
}

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const claim = await validateToken(params.token)
  if (!claim) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
  return NextResponse.json({ entity: claim.entity, claimant: { name: claim.name, email: claim.email } })
}

export async function PUT(req: NextRequest, { params }: { params: { token: string } }) {
  const claim = await validateToken(params.token)
  if (!claim) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })

  const body = await req.json()

  // Editors can only update content fields, not status/verification/featured
  const entity = await prisma.entity.update({
    where: { id: claim.entityId },
    data: {
      name: body.name,
      shortDescription: body.shortDescription,
      description: body.description,
      website: body.website,
      email: body.email,
      phone: body.phone,
      sectors: body.sectors ?? [],
      audiences: body.audiences ?? [],
      stages: body.stages ?? [],
      tags: body.tags ?? [],
      contacts: body.contacts ?? [],
      socialLinks: body.socialLinks,
      locationAddressLine1: body.locationAddressLine1,
      locationSuburb: body.locationSuburb,
      locationState: body.locationState,
      locationPostcode: body.locationPostcode,
      locationLatitude: body.locationLatitude ? parseFloat(body.locationLatitude) : null,
      locationLongitude: body.locationLongitude ? parseFloat(body.locationLongitude) : null,
      locationPrecinct: body.locationPrecinct,
      locationIsVirtual: body.locationIsVirtual ?? false,
      locationNotes: body.locationNotes,
      fundingAmount: body.fundingAmount ? parseFloat(body.fundingAmount) : null,
      programStartDate: body.programStartDate ? new Date(body.programStartDate) : null,
      programEndDate: body.programEndDate ? new Date(body.programEndDate) : null,
      applicationDeadline: body.applicationDeadline ? new Date(body.applicationDeadline) : null,
    },
  })

  return NextResponse.json({ entity })
}
