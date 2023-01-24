import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import db from "db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { searchTerm, creator } = JSON.parse(req.body)
  const creatorData = await db.creator.findFirst({
    where: {
      slug: creator
    }
  })
  if (!creatorData) {
    return res.status(500).send({ success: false, error: "No creator found" })
  }
  let title = ""
  let link = ""
  let description = ""
  let chunk = ""
  let author = ""
  const search = process.env.API_URL + "/api/search/curated/"
  await axios
    .post(
      search,
      {
        search_term: searchTerm,
      },
      {
        headers: {
          Authorization: `Api-Key ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(async ({ data }) => {
      title = data.title
      link = data.link
      description = data.description
      chunk = data.chunk
      author = data.author
    }).catch((err) => {
      console.log(err)
    })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(
    JSON.stringify({
      title,
      link,
      description,
      chunk,
      author
    }))
}

export default handler
