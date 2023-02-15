import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"
import CuratedPodcasts from "../../podcasts/components/CuratedPodcasts"

const CuratedProjectsPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CuratedPodcasts />
      </Suspense>
    </>
  )
}

CuratedProjectsPage.getLayout = (page) => <Layout title={"Browse Curated Podcasts"}>{page}</Layout>
CuratedProjectsPage.authenticate = { redirectTo: "/" }
export default CuratedProjectsPage
