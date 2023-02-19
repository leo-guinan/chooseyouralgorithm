import { Ctx } from "blitz"
import db from "db"



export default async function getMyRequests(
  _input: {},
  ctx: Ctx
) {

  // Require user to be logged in
  ctx.session.$authorize()
  const userId = ctx.session.userId

  return await db.podcastRequest.findMany({ where: { requestorId: userId} })

  // Can do any processing, fetching from other APIs, etc


}
