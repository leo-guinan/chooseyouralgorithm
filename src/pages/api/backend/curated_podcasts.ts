import { api } from "src/blitz-server"
import db from "db"
import { Ctx } from "blitz"

export default api(async (req, res, ctx:Ctx) => {
  ctx.session.$authorize()
  const publicData = ctx.session.$publicData

  if (!publicData.userId) return res.status(404).json({})
  const user = await db.user.findFirst({
    where: { id: publicData.userId },

  });
  if (!user) return res.status(404).json({});

  const podcastLookupUrl = process.env.API_URL + "/api/search/curated_podcasts/"
  const results = await fetch(
    podcastLookupUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        "curator_id": user.curatorId
      })
    })

  const data = await results.json()

  const podcasts = data.podcasts.map((podcast) => {
    return {
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      link: podcast.link,
      // TODO: add image
      image: podcast.image,
      curated: podcast.curated,
    }
  });


  res.status(200).json(podcasts)
})
