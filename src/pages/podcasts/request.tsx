import Layout from "../../core/layouts/Layout"
import Request from "../../podcasts/components/Request"
import React, { Suspense } from "react"
import MyRequests from "../../podcasts/components/MyRequests"

const RequestPodcastPage = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <Request />
        <MyRequests />
      </Suspense>
    </>
  )
}
RequestPodcastPage.getLayout = (page) => <Layout title={"Browse Curated Podcasts"}>{page}</Layout>
RequestPodcastPage.authenticate = { redirectTo: "/" }
export default RequestPodcastPage
