import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getAllEntities } from '@/lib/data/entities'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? '' })

const SYSTEM_PROMPT = `You are the ACT Innovation Ecosystem Navigator AI Advisor, a knowledgeable and friendly guide for Canberra's startup and innovation ecosystem.

Your role is to help people navigate the ACT innovation ecosystem by recommending the most relevant:
- Programs (accelerators, incubators, fellowships)
- Grants and funding opportunities
- Investors (angels, VCs, government funds)
- Spaces and hubs (co-working, maker labs)
- Networks and communities
- Universities and research pathways
- Government agencies and support
- Service providers (legal, accounting, IP)

When answering, be specific and practical. Reference actual entities from the ecosystem data below when they are relevant. Format your responses clearly using markdown. Ask clarifying questions when needed to give better recommendations.

Always consider:
1. The person's stage (idea, early, growth, scale)
2. Their sector/industry focus
3. Their audience type (founder, researcher, student, etc.)
4. Whether they need funding, space, mentoring, networks, or knowledge
5. Whether they prefer in-person, online, or hybrid options

Keep responses concise but comprehensive. Use bullet points for lists of recommendations. Include the entity name in **bold** when recommending specific organisations.

Current ACT ecosystem entities:
${getAllEntities()
  .map((e) => `- **${e.name}** (${e.entityType}): ${e.shortDescription} [Sectors: ${e.sectors.join(', ')}; Stages: ${e.stages.join(', ')}; Cost: ${e.costType ?? 'N/A'}]`)
  .join('\n')}

Remember: You're helping people navigate a specific geographic ecosystem (the Australian Capital Territory / Canberra). Always keep recommendations relevant to what's available in or accessible from the ACT.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    // Validate message roles
    const validMessages = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .map((m: any) => ({ role: m.role as 'user' | 'assistant', content: String(m.content) }))

    const stream = await anthropic.messages.stream({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: validMessages,
    })

    // Stream SSE response
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
  } catch (err) {
    console.error('Advisor API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
