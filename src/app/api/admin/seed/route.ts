import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { SAMPLE_ENTITIES } from '@/lib/data/sample-entities'

// One-time seed: imports sample entities into the DB
// Call with ?secret=ADMIN_SETUP_SECRET
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.ADMIN_SETUP_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let created = 0
  let skipped = 0

  for (const e of SAMPLE_ENTITIES) {
    const existing = await prisma.entity.findUnique({ where: { slug: e.slug } })
    if (existing) { skipped++; continue }

    await prisma.entity.create({
      data: {
        id: e.id,
        slug: e.slug,
        name: e.name,
        shortDescription: e.shortDescription,
        description: e.description,
        entityType: e.entityType,
        organisationType: e.organisationType,
        deliveryMode: e.deliveryMode,
        geographicCoverage: e.geographicCoverage,
        costType: e.costType,
        status: e.status,
        verificationStatus: e.verificationStatus,
        isFeatured: e.isFeatured,
        website: e.website,
        sectors: e.sectors,
        audiences: e.audiences,
        stages: e.stages,
        tags: e.tags,
        contacts: e.contacts as any,
        locationAddressLine1: e.location?.addressLine1,
        locationSuburb: e.location?.suburb,
        locationState: e.location?.state,
        locationPostcode: e.location?.postcode,
        locationLatitude: e.location?.latitude,
        locationLongitude: e.location?.longitude,
        locationPrecinct: e.location?.precinct,
        locationIsVirtual: e.location?.isVirtual ?? false,
        locationNotes: e.location?.locationNotes,
        fundingAmount: e.fundingAmount,
        programStartDate: e.programStartDate ? new Date(e.programStartDate) : null,
        programEndDate: e.programEndDate ? new Date(e.programEndDate) : null,
        applicationDeadline: e.applicationDeadline ? new Date(e.applicationDeadline) : null,
        viewCount: e.viewCount,
        createdAt: new Date(e.createdAt),
        publishedAt: e.status === 'published' ? new Date(e.updatedAt) : null,
      },
    })
    created++
  }

  return NextResponse.json({ created, skipped })
}
