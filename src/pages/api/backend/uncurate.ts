import { api } from "src/blitz-server"
import db from "db"
import { Ctx } from "blitz"

export default api(async (req, res, ctx:Ctx) => {
  ctx.session.$authorize()
  const publicData = ctx.session.$publicData
  const podcastId = req.body.podcastId
  if (!publicData.userId) return res.status(404).json({})
  const user = await db.user.findFirst({
    where: { id: publicData.userId },

  });
  if (!user) return res.status(404).json({});

  const podcastLookupUrl = process.env.API_URL + "/api/search/uncurate/"
  await fetch(
    podcastLookupUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        "curator_id": user.curatorId,
        "podcast_id": podcastId
      })
    })


  res.status(200).json({"message": "success"})
})
