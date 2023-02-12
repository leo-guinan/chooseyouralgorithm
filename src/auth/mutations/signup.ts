import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { Signup } from "../validations"
import axios from "axios"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  // create curator on backend
  const createCurator = process.env.API_URL + "/api/search/create_curator/"
  const result = await fetch(createCurator, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${process.env.API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'email': email.toLowerCase().trim(),
    })
  })
  const data = await result.json()
  const curatorId = data.curator_id
  const clientAccountId = data.client_account_id
  await db.user.update({
    where: { id: user.id },
    data: { curatorId: curatorId, clientAccountId: clientAccountId }
  });


  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
