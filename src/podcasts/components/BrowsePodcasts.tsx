import { useEffect, useState } from "react"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { PlusIcon as PlusIconOutline, MinusIcon } from '@heroicons/react/24/outline'

interface Podcast {
  id: number
  title: string
  description: string
  link: string
  image: string
  curated: boolean
}
const BrowsePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
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

  const handleCurate = (podcastId: number) => {
    fetch("/api/backend/curate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ podcastId })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleRemoveCurate = (podcastId: number) => {
    fetch("/api/backend/uncurate", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ podcastId })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {podcasts && podcasts.map((podcast) => (
            <li key={podcast.id}>
              <div className="relative pb-8">
                <div className="relative flex items-start space-x-3">

                  <>
                    <div>
                      <div className="relative px-1 py-1.5">
                        <div
                          className="flex h-32 w-32 items-center justify-center bg-gray-100">
                          <img className="h-32 w-32" src={podcast.image} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a href={podcast.link} className="font-medium text-gray-900">
                          {podcast.title}
                        </a>{" "}
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{podcast.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      {podcast.curated && (
                        <>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleRemoveCurate(podcast.id)}
                          >
                            <MinusIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </>
                      )}
                      {!podcast.curated && (
                      <>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => handleCurate(podcast.id)}
                        >
                          <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </>
                        )}
                    </div>
                  </>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BrowsePodcasts
