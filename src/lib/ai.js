/**
 * AI 기획안 생성 서비스
 *
 * Claude 또는 OpenAI API를 사용하여 캠페인 콘텐츠 기획안을 생성합니다.
 */

const AI_API_URL = import.meta.env.VITE_AI_API_URL || '/api/ai'
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || ''

/**
 * AI 기획안 생성을 위한 프롬프트 구성
 */
function buildPrompt(campaignData) {
  const {
    campaignName,
    category,
    productName,
    productPrice,
    skinConcerns,
    contentConcept,
    contentSpeed,
    contentLength,
    hookingPoint,
    requiredScenes,
    discount,
    narration,
    hashtags,
  } = campaignData

  return `당신은 뷰티 콘텐츠 전문 기획자입니다. 아래 캠페인 정보를 바탕으로 크리에이터용 숏폼 콘텐츠 기획안을 작성해 주세요.

## 캠페인 정보
- 캠페인명: ${campaignName}
- 카테고리: ${category}
- 제품명: ${productName}
- 제품가격: ${productPrice || '미정'}
- 타겟 피부고민: ${skinConcerns?.join(', ') || '없음'}
- 영상 콘셉트: ${contentConcept || '자연스러운 리뷰'}
- 영상 속도: ${contentSpeed === 'slow' ? '느리게' : contentSpeed === 'fast' ? '빠르게' : '보통'}
- 영상 길이: ${contentLength}초 이내
- 후킹 포인트: ${hookingPoint || '없음'}
- 필수 장면: ${requiredScenes?.filter(s => s).join(', ') || '없음'}
- 할인/프로모션: ${discount || '없음'}
- 나레이션 포함: ${narration ? '예' : '아니오'}
- 필수 해시태그: ${hashtags || '없음'}

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
1. 스토리보드는 ${contentLength}초 영상에 맞게 5-7개 씬으로 구성
2. 후킹 멘트는 2초 이내로 말할 수 있는 짧고 임팩트 있게
3. 해시태그는 필수 해시태그 포함하여 총 6-8개
4. 촬영 팁은 실용적이고 구체적으로 3-5개

JSON만 출력하세요.`
}

/**
 * AI 응답 파싱
 */
function parseAIResponse(response) {
  try {
    // JSON 블록 추출
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('JSON not found in response')
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    throw new Error('AI 응답 파싱에 실패했습니다.')
  }
}

/**
 * Claude API를 통한 기획안 생성
 */
async function generateWithClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_API_KEY,
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
    throw new Error(`Claude API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

/**
 * OpenAI API를 통한 기획안 생성
 */
async function generateWithOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_API_KEY}`,
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
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

/**
 * Supabase Edge Function을 통한 기획안 생성 (권장)
 */
async function generateWithEdgeFunction(campaignData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  const response = await fetch(`${supabaseUrl}/functions/v1/generate-campaign-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(campaignData),
  })

  if (!response.ok) {
    throw new Error(`Edge function error: ${response.status}`)
  }

  const data = await response.json()
  return data
}

/**
 * Mock 기획안 생성 (개발/테스트용)
 */
function generateMockPlan(campaignData) {
  const { productName, category, skinConcerns, contentLength } = campaignData

  // 동적으로 콘텐츠 생성
  const targetConcern = skinConcerns?.[0] || '피부 관리'
  const scenes = [
    { scene: 1, description: `후킹 - ${targetConcern} 고민 언급`, duration: '2초' },
    { scene: 2, description: `제품 소개 - ${productName || '제품'} 언박싱`, duration: '4초' },
    { scene: 3, description: '텍스처 클로즈업', duration: '3초' },
    { scene: 4, description: '실제 사용 시연', duration: `${Math.floor(parseInt(contentLength) * 0.3)}초` },
    { scene: 5, description: '비포/애프터 비교', duration: '5초' },
    { scene: 6, description: '총평 및 추천 포인트', duration: '4초' },
  ]

  const hookingMents = [
    `"이 제품 덕분에 드디어 ${targetConcern} 고민 해결!"`,
    `"요즘 ${category} 루틴에서 빠질 수 없는 아이템"`,
    `"${targetConcern} 때문에 고민이라면 꼭 보세요!"`,
  ]

  const hashtags = [
    `#${category}추천`,
    '#뷰티리뷰',
    '#화장품추천',
    `#${targetConcern}케어`,
    '#데일리루틴',
    '#꿀템추천',
  ]

  const shootingTips = [
    '자연광에서 촬영하면 피부톤이 더 자연스럽게 표현됩니다.',
    '제품 텍스처를 클로즈업으로 촬영해 주세요.',
    '비포/애프터는 동일한 조명과 각도에서 촬영해 주세요.',
    '손목이나 팔 안쪽에 테스트 발색을 보여주면 좋습니다.',
  ]

  return {
    storyboard: scenes,
    hookingMents,
    hashtags,
    shootingTips,
  }
}

/**
 * AI 기획안 생성 메인 함수
 *
 * @param {Object} campaignData - 캠페인 정보
 * @param {Object} options - 옵션 (provider: 'claude' | 'openai' | 'edge' | 'mock')
 * @returns {Promise<Object>} 생성된 기획안
 */
export async function generateCampaignPlan(campaignData, options = {}) {
  const { provider = 'mock' } = options

  try {
    // Mock 모드 (개발용)
    if (provider === 'mock' || !AI_API_KEY) {
      // 실제 API 호출 시뮬레이션을 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 2000))
      return generateMockPlan(campaignData)
    }

    // Supabase Edge Function 사용 (권장)
    if (provider === 'edge') {
      return await generateWithEdgeFunction(campaignData)
    }

    // 직접 API 호출
    const prompt = buildPrompt(campaignData)
    let responseText

    if (provider === 'claude') {
      responseText = await generateWithClaude(prompt)
    } else if (provider === 'openai') {
      responseText = await generateWithOpenAI(prompt)
    } else {
      throw new Error(`Unknown provider: ${provider}`)
    }

    return parseAIResponse(responseText)
  } catch (error) {
    console.error('AI plan generation failed:', error)
    throw error
  }
}

export default generateCampaignPlan
