import { Ctx } from "blitz"
import db from "db"
interface CreateCheckoutSessionInput {
  priceId: string
}

export default async function createCheckoutSession(
  {priceId}: CreateCheckoutSessionInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  let user = await db.user.findFirst({
    where: { id: ctx.session.userId },
    select: {
      email: true,
      clientAccountId: true
    },
  })
  //
  if (!user) {
    throw new Error("User not found")
  }
  const stripeSessionURL = process.env.API_URL + "/api/payments/create_checkout_session/"
  const results = await fetch(
    stripeSessionURL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        "client_account_id": user.clientAccountId,
        "price_id": priceId,
      })
    }
  );
  const { checkout_session_id, checkout_url } = await results.json()
  console.log(checkout_session_id)
  //
  // if (!user.stripeCustomerId) {
  //   const customer = await stripe.customers.create({
  //     email: user.email ? user.email : email,
  //   })
  //
  //   user = await db.user.update({
  //     where: { id: ctx.session.userId },
  //     data: {
  //       stripeCustomerId: customer.id,
  //     },
  //   })
  // }
  //
  // if (!user.stripeCustomerId) {
  //   throw new Error("Issue with stripe customer id.")
  // }
  // const lineItem = {
  //   price: priceId,
  //   quantity: 1,
  // }
  //
  // const session = await stripe.checkout.sessions.create({
  //   customer: user.stripeCustomerId,
  //   mode: "payment",
  //   payment_method_types: ["card"],
  //   line_items: [lineItem],
  //   success_url: `${env.DOMAIN}/unfollow?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${env.DOMAIN}/upgrade?cancel=true`,
  //   allow_promotion_codes: true,
  // })

  return {
    sessionId: checkout_session_id,
    url: checkout_url
  }
}
