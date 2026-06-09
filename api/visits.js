export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()

  const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return res.status(200).json({ count: 0 })
  }

  const hit = req.query.hit === '1'

  try {
    const command = hit ? 'incr/portfolio:visits' : 'get/portfolio:visits'
    const response = await fetch(`${UPSTASH_REDIS_REST_URL}/${command}`, {
      headers: { Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}` },
    })
    const data = await response.json()
    return res.status(200).json({ count: parseInt(data.result) || 0 })
  } catch {
    return res.status(200).json({ count: 0 })
  }
}
