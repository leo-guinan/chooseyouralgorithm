import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const RequestSummary = z.object({
  podcastEpisodeId: z.number(),
})

export default async function requestSummary(input: z.infer<typeof RequestSummary>, ctx: Ctx) {
  // Validate input - very important for security
  const data = RequestSummary.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()
  const userId = ctx.session.userId

  ctx.session.$authorize()
  const publicData = ctx.session.$publicData

  if (!publicData.userId) return []
  const user = await db.user.findFirst({
    where: { id: publicData.userId },
  })
  if (!user) return []

  const podcastLookupUrl = process.env.API_URL + "/api/effortless_reach/generate_summary/"
  const results = await fetch(podcastLookupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      episode_id: data.podcastEpisodeId,
    }),
  })

  const resultData = await results.json()

  // Can do any processing, fetching from other APIs, etc

  return resultData.summary
}
