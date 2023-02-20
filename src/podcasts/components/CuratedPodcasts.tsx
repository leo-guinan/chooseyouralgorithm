import { getAntiCSRFToken } from "@blitzjs/auth"
import Podcast from "./Podcast"
import { useQuery } from "@blitzjs/rpc"
import getCuratedPodcasts from "../queries/getCuratedPodcasts"

const CuratedPodcasts = () => {
  const antiCSRFToken = getAntiCSRFToken()
  const [podcasts, { setQueryData }] = useQuery(getCuratedPodcasts, {})

  const handleCurate = async (podcastId: number) => {
    const results = await fetch("/api/backend/curate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ podcastId }),
    })
    if (results.status === 200) {
      const updated = podcasts.map((podcast) => {
        if (podcast.id === podcastId) {
          podcast.curated = true
        }
        return podcast
      })
      await setQueryData(updated, { refetch: false })
    }
  }

  const handleRemoveCurate = async (podcastId: number) => {
    const results = await fetch("/api/backend/uncurate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ podcastId }),
    })
    if (results.status === 200) {
      const updated = podcasts.filter((podcast) => podcast.id !== podcastId)
      await setQueryData(updated, { refetch: false })
    }
  }

  return (
    <div>
      <div className="flow-root">
        <div className="md:flex md:items-center md:justify-between pb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Browse Curated Podcasts
            </h2>
          </div>
        </div>
        <ul role="list" className="-mb-8">
          {podcasts &&
            podcasts.map((podcast) => (
              <Podcast
                podcast={podcast}
                key={podcast.id}
                handleCurate={handleCurate}
                handleRemoveCurate={handleRemoveCurate}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}

export default CuratedPodcasts
