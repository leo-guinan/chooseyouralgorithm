import Layout from "../../core/layouts/Layout"
import Request from "../../podcasts/components/Request"
import React from "react"

const RequestPodcastPage = () => {
  return (
    <>
      <Request />
    </>
  )
}
RequestPodcastPage.getLayout = (page) => <Layout title={"Browse Curated Podcasts"}>{page}</Layout>
RequestPodcastPage.authenticate = { redirectTo: "/" }
export default RequestPodcastPage
