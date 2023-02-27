import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const CreateRequest = z.object({
  podcastName: z.string(),
  url: z.string(),
})

export default async function createRequest(input: z.infer<typeof CreateRequest>, ctx: Ctx) {
  // Validate input - very important for security
  const data = CreateRequest.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()
  const userId = ctx.session.userId

  const podcastRequest = await db.podcastRequest.create({
    data: {
      ...data,
      requestorId: userId,
    },
  })

  // Can do any processing, fetching from other APIs, etc

  return podcastRequest
}
