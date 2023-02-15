import { useEffect, useState } from "react"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { PlusIcon as PlusIconOutline, MinusIcon } from '@heroicons/react/24/outline'
import { PodcastEntity } from "../../../types"
import Podcast from "./Podcast"


const BrowsePodcasts = () => {
  const [podcasts, setPodcasts] = useState<PodcastEntity[]>([])
  const antiCSRFToken = getAntiCSRFToken()

  useEffect(() => {
    fetch("/api/backend/podcasts", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken
      }

    })
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [antiCSRFToken])


  return (
    <div>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {podcasts && podcasts.map((podcast) => (
              <Podcast podcast={podcast} key={podcast.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BrowsePodcasts
