import { NextRequest, NextResponse } from 'next/server'
import { searchSuggestionsFromDB } from '@/lib/data/db-entities'
import { SEARCH_SUGGEST_LIMIT } from '@/lib/constants/config'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  const results = await searchSuggestionsFromDB(q, SEARCH_SUGGEST_LIMIT)
  return NextResponse.json({ results })
}
