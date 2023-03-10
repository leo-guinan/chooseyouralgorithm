import { MinusIcon, PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { PodcastEntity } from "../../../types"

'use client';

const Podcast = ({ podcast, handleCurate, handleRemoveCurate }: { podcast:  PodcastEntity, handleCurate, handleRemoveCurate}) => {
  const antiCSRFToken = getAntiCSRFToken()



  return (
    <>
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
    </>
  )
}

export default Podcast
