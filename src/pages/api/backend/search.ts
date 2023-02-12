import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import db from "db"
import { getSession } from "@blitzjs/auth"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)

  const { searchTerm, type } = JSON.parse(req.body)
  if (!session.userId) {
    return res.status(500).send({ success: false, error: "No user found" })
  }
  const currentUser = await db.user.findFirst({
    where: {
      id: session.userId
    }
  });
  if (!currentUser) {
    return res.status(500).send({ success: false, error: "No user found" })
  }
  let title = ""
  let link = ""
  let description = ""
  let chunk = ""
  if (type === 'curated') {
    const search = process.env.API_URL + "/api/search/curated/"
    const result = await fetch(search, {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${process.env.API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'search_term': searchTerm,
        'curator_id': currentUser.curatorId,
      })
    })
    const data = await result.json()
    title = data.title
    link = data.link
    description = data.description
    chunk = data.chunk
  } else {
    const search = process.env.API_URL + "/api/search/search/"
    const result = await fetch(search, {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${process.env.API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'search_term': searchTerm,
      })
    })
    const data = await result.json()
    title = data.title
    link = data.link
    description = data.description
    chunk = data.chunk
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(
    JSON.stringify({
      title,
      link,
      description,
      chunk
    }))
}

export default handler
