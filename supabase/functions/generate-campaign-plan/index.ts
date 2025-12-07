// Supabase Edge Function: generate-campaign-plan
// 캠페인 기획안을 AI로 생성하는 서버리스 함수

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CampaignData {
  campaignName: string
  category: string
  productName: string
  productPrice?: string
  skinConcerns?: string[]
  contentConcept?: string
  contentSpeed?: string
  contentLength?: string
  hookingPoint?: string
  requiredScenes?: string[]
  discount?: string
  narration?: boolean
  hashtags?: string
}

interface CampaignPlan {
  storyboard: Array<{
    scene: number
    description: string
    duration: string
  }>
  hookingMents: string[]
  hashtags: string[]
  shootingTips: string[]
}

function buildPrompt(data: CampaignData): string {
  return `당신은 뷰티 콘텐츠 전문 기획자입니다. 아래 캠페인 정보를 바탕으로 크리에이터용 숏폼 콘텐츠 기획안을 작성해 주세요.

## 캠페인 정보
- 캠페인명: ${data.campaignName || '미정'}
- 카테고리: ${data.category || '뷰티'}
- 제품명: ${data.productName || '미정'}
- 제품가격: ${data.productPrice || '미정'}
- 타겟 피부고민: ${data.skinConcerns?.join(', ') || '없음'}
- 영상 콘셉트: ${data.contentConcept || '자연스러운 리뷰'}
- 영상 속도: ${data.contentSpeed === 'slow' ? '느리게' : data.contentSpeed === 'fast' ? '빠르게' : '보통'}
- 영상 길이: ${data.contentLength || '30'}초 이내
- 후킹 포인트: ${data.hookingPoint || '없음'}
- 필수 장면: ${data.requiredScenes?.filter(s => s).join(', ') || '없음'}
- 할인/프로모션: ${data.discount || '없음'}
- 나레이션 포함: ${data.narration ? '예' : '아니오'}
- 필수 해시태그: ${data.hashtags || '없음'}

## 요청사항
아래 JSON 형식으로 기획안을 작성해 주세요:

{
  "storyboard": [
    {"scene": 1, "description": "장면 설명", "duration": "3초"},
    ...
  ],
  "hookingMents": [
    "첫 번째 후킹 멘트",
    "두 번째 후킹 멘트",
    "세 번째 후킹 멘트"
  ],
  "hashtags": ["#해시태그1", "#해시태그2", ...],
  "shootingTips": [
    "촬영 팁 1",
    "촬영 팁 2",
    ...
  ]
}

주의사항:
1. 스토리보드는 ${data.contentLength || '30'}초 영상에 맞게 5-7개 씬으로 구성
2. 후킹 멘트는 2초 이내로 말할 수 있는 짧고 임팩트 있게
3. 해시태그는 필수 해시태그 포함하여 총 6-8개
4. 촬영 팁은 실용적이고 구체적으로 3-5개

JSON만 출력하세요.`
}

function parseAIResponse(response: string): CampaignPlan {
  const jsonMatch = response.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0])
  }
  throw new Error('JSON not found in response')
}

async function generateWithClaude(prompt: string): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured')
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Claude API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.content[0].text
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '당신은 뷰티 콘텐츠 전문 기획자입니다. 요청된 형식의 JSON만 출력합니다.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2048,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${response.status} - ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const campaignData: CampaignData = await req.json()
    const prompt = buildPrompt(campaignData)

    let responseText: string

    // Try Claude first, fall back to OpenAI
    if (ANTHROPIC_API_KEY) {
      responseText = await generateWithClaude(prompt)
    } else if (OPENAI_API_KEY) {
      responseText = await generateWithOpenAI(prompt)
    } else {
      throw new Error('No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.')
    }

    const plan = parseAIResponse(responseText)

    return new Response(JSON.stringify(plan), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error generating campaign plan:', error)

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to generate campaign plan',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
