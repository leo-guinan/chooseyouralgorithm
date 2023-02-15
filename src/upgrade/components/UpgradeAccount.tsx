import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import createCheckoutSession from "../../billing/mutations/createCheckoutSession"
import { loadStripe } from "@stripe/stripe-js"

const UpgradeAccount = () => {
  const router = useRouter()
  const [createCheckoutSessionMutation] = useMutation(createCheckoutSession)

  const handleUpgrade = async () => {
    console.log("Upgrade")
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
    if (!stripe) {
      throw new Error("Stripe could not be loaded")
    }
    const { sessionId, url } = await createCheckoutSessionMutation({
      priceId: "price_1MahfAIvoG32Hhn8UCgItAJ0"
    })
    console.log("Session ID: ", sessionId)
    console.log("URL: ", url)

    await router.push(url)

    // const result = await stripe.redirectToCheckout({
    //   sessionId,
    // })
    // if (result.error) {
    //   console.error(result.error.message)
    // }

  }


  return (
    <>
      <button onClick={handleUpgrade}>Upgrade Plan</button>
    </>
  )
}

export default UpgradeAccount
