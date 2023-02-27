import db from "../../../db"
import { Ctx } from "blitz"

export default async function getEpisodesForPodcast(
  input: {
    podcastId: number
  },
  ctx: Ctx
) {
  ctx.session.$authorize()
  const publicData = ctx.session.$publicData

  if (!publicData.userId) return []
  const user = await db.user.findFirst({
    where: { id: publicData.userId },
  })
  if (!user) return []

  const podcastLookupUrl = process.env.API_URL + "/api/search/browse_episodes/"
  const results = await fetch(podcastLookupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      podcast_id: input.podcastId,
    }),
  })

  const data = await results.json()
  return data.episodes.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      link: episode.link,
      description: episode.description,
      published_at: episode.published_at,
      transcript: episode.transcript?.text,
      summary: episode.summary?.text,
      keyPoints: episode.key_points?.text,
      image: episode.image,
    }
  })
}
