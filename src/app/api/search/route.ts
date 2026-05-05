import { NextRequest, NextResponse } from 'next/server'
import { searchSuggestions } from '@/lib/data/entities'
import { SEARCH_SUGGEST_LIMIT } from '@/lib/constants/config'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  const results = searchSuggestions(q, SEARCH_SUGGEST_LIMIT)
  return NextResponse.json({ results })
}
