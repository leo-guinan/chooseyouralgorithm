import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "src/auth/components/SignupForm"
import { BlitzPage } from "@blitzjs/next"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <SignupForm onSuccess={() => router.push("/")} />
    </Layout>
  )
}

export default SignupPage
