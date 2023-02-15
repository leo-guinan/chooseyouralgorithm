import Layout from "../../core/layouts/Layout"
import CheckoutCanceled from "../../checkout/components/CheckoutCanceled"

const CancelPage = () => {
  return (
    <Layout>
      <h1>Canceled</h1>
      <CheckoutCanceled />
    </Layout>
  )
}

export default CancelPage
