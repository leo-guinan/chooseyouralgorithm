import { EpisodeEntity } from "../../../types"
import { classNames } from "../../utils"
import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import createRequest from "../mutations/createRequest"
import requestSummary from "../mutations/requestSummary"
import requestKeyPoints from "../mutations/requestKeyPoints"

const PodcastEpisode = ({ episode }: { episode: EpisodeEntity }) => {
  const [activeTab, setActiveTab] = useState("Description")
  const [requestSummaryMutation] = useMutation(requestSummary)
  const [requestKeyPointsMutation] = useMutation(requestKeyPoints)
  const [summary, setSummary] = useState(episode.summary)
  const [keyPoints, setKeyPoints] = useState(episode.keyPoints)
  const [summaryRequested, setSummaryRequested] = useState(false)
  const [keyPointsRequested, setKeyPointsRequested] = useState(false)
  const tabs = [
    { name: "Description", href: "#", current: activeTab === "Description" },
    { name: "Transcript", href: "#", current: activeTab === "Transcript" },
    { name: "Summary", href: "#", current: activeTab === "Summary" },
    { name: "Key Points", href: "#", current: activeTab === "Key Points" },
    { name: "Notes", href: "#", current: activeTab === "Notes" },
  ]

  const handleRequestSummary = async () => {
    setSummaryRequested(true)
    await requestSummaryMutation({ podcastEpisodeId: episode.id })
  }

  const handleRequestKeyPoints = async () => {
    setKeyPointsRequested(true)
    await requestKeyPointsMutation({ podcastEpisodeId: episode.id })
  }

  return (
    <div>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <a href={episode.link} target="_blank" rel="noreferrer">
                {episode.title}
              </a>
            </h3>
            {/*<p className="mt-1 text-sm text-gray-500">*/}
            {/*  Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.*/}
            {/*</p>*/}
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Episode
            </button>
          </div>
        </div>

        <>
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab(tab.name)
                    }}
                    className={classNames(
                      tab.current
                        ? "bg-gray-200 text-gray-800"
                        : "text-gray-600 hover:text-gray-800",
                      "px-3 py-2 font-medium text-sm rounded-md"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </>
        {activeTab === "Description" && (
          <div dangerouslySetInnerHTML={{ __html: episode.description }}></div>
        )}
        {activeTab === "Transcript" && <div>{episode.transcript}</div>}
        {activeTab === "Summary" && (
          <div>
            {summaryRequested && <>Summary has been requested and will be available soon.</>}
            {!summaryRequested && summary && <p>{summary}</p>}
            {!summaryRequested && !summary && (
              <>
                <button
                  className="flex flex-end mx-5 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleRequestSummary}
                >
                  Request Summary
                </button>
              </>
            )}
          </div>
        )}
        {activeTab === "Notes" && <div>{episode.notes}</div>}
        {activeTab === "Key Points" && (
          <div>
            {keyPointsRequested && <>Key Points have been requested and will be available soon.</>}

            {!keyPointsRequested && keyPoints && (
              <div>
                <pre>{keyPoints}</pre>
              </div>
            )}
            {!keyPointsRequested && !keyPoints && (
              <>
                <button
                  className="flex flex-end mx-5 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleRequestKeyPoints}
                >
                  Request Key Points
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PodcastEpisode
