import Layout from "../../core/layouts/Layout"
import { useMutation } from "@blitzjs/rpc"
import createCheckoutSession from "../../billing/mutations/createCheckoutSession"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/router"
import { Suspense } from "react"
import UpgradeAccount from "../../upgrade/components/UpgradeAccount"

const UpgradeAccountPage = () => {

  return (
    <Layout>
      <h1>Upgrade Account</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UpgradeAccount />
      </Suspense>
    </Layout>
  )
}

export default UpgradeAccountPage
