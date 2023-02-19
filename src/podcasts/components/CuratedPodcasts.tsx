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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ podcastId })
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ podcastId })
    })
    if (results.status === 200) {
      const updated = podcasts.filter((podcast) => podcast.id !== podcastId)
      await setQueryData(updated, { refetch: false })
    }
  }

  return (
    <div>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {podcasts && podcasts.map((podcast) => (
            <Podcast podcast={podcast} key={podcast.id} handleCurate={handleCurate}
                     handleRemoveCurate={handleRemoveCurate} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CuratedPodcasts
