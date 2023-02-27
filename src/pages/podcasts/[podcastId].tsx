import Search from "../../search/components/Search"
import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"
import { useRouter } from "next/router"
import BrowsePodcastEpisodes from "../../podcasts/components/BrowsePodcastEpisodes"

const PodcastBrowsePage = () => {
  const router = useRouter()
  const { podcastId } = router.query
  if (!podcastId || Array.isArray(podcastId)) return null
  return (
    <>
      <div className="md:flex md:items-center md:justify-between pb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Browse Podcast Episodes
          </h2>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowsePodcastEpisodes podcastId={podcastId} />
      </Suspense>
    </>
  )
}

PodcastBrowsePage.getLayout = (page) => <Layout title={"Browse Podcast"}>{page}</Layout>
export default PodcastBrowsePage
