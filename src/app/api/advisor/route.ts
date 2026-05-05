import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getAllEntities } from '@/lib/data/entities'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const { messages } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const validMessages = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .map((m: any) => ({ role: m.role as 'user' | 'assistant', content: String(m.content) }))

    const entityList = getAllEntities()
      .map((e) => `- **${e.name}** (${e.entityType}): ${e.shortDescription}`)
      .join('\n')

    const systemPrompt = `You are the ACT Innovation Ecosystem Navigator AI Advisor, a helpful guide for Canberra's startup and innovation ecosystem.

Help people find the right programs, grants, investors, co-working spaces, networks, and support in the Australian Capital Territory (ACT / Canberra).

When recommending resources, reference specific entities from the list below in **bold**. Be concise and practical. Ask clarifying questions if needed to give better recommendations.

ACT ecosystem entities:
${entityList}

Always keep recommendations relevant to the ACT / Canberra region.`

    const anthropic = new Anthropic({ apiKey })

    const stream = await anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: validMessages,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              const data = JSON.stringify({ delta: chunk.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          console.error('Stream error:', err)
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err: any) {
    console.error('Advisor API error:', err?.message ?? err)
    return NextResponse.json(
      { error: err?.message ?? 'Internal server error' },
      { status: 500 }
    )
  }
}
