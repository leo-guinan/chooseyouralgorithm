import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"
import BrowsePodcasts from "../../podcasts/components/BrowsePodcasts"

const BrowsePodcastsPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowsePodcasts />
      </Suspense>
    </>
  )
}

BrowsePodcastsPage.getLayout = (page) => <Layout title={"Browse Podcasts"}>{page}</Layout>
export default BrowsePodcastsPage
