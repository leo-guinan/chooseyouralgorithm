import Search from "../../search/components/Search"
import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"
import { useRouter } from "next/router"

const PodcastSearchPage = () => {
  const router = useRouter()
  const { podcastId } = router.query
  if (!podcastId || Array.isArray(podcastId)) return null
  return (
    <>
      <div className="md:flex md:items-center md:justify-between pb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Search Podcast
          </h2>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Search type="podcast" podcastId={podcastId} />
      </Suspense>
    </>
  )
}

PodcastSearchPage.authenticate = { redirectTo: "/" }
PodcastSearchPage.getLayout = (page) => <Layout title={"Podcast Search"}>{page}</Layout>
export default PodcastSearchPage
