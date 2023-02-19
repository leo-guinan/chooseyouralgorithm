import React, { useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import createRequest from "../mutations/createRequest"

const Request = () => {
  const [podcastName, setPodcastName] = useState("")
  const [url, setUrl] = useState("")
  const [createRequestMutation] = useMutation(createRequest)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    console.log("Name: ", podcastName)
    console.log("URL: ", url)
    await createRequestMutation({ podcastName, url })
    setPodcastName("")
    setUrl("")
    setLoading(false)
  }

  return (
    <>
      {!loading && (
        <>
          <div
            className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => {
                setPodcastName(e.target.value)
              }}
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Podcast Name"
            />
          </div>
          <div
            className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 my-4">
            <label
              htmlFor="url"
              className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium text-gray-900"
            >
              URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={(e) => {
                setUrl(e.target.value)
              }}
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="https://example.com"
            />
          </div>
          <a
            className="text-base font-semibold leading-7 text-gray-900"
            onClick={handleSubmit}
          >
            <strong>Submit</strong>
          </a>
        </>
      )}
      {loading && (
        <h1>Loading...</h1>
      )}
    </>
  )
}

export default Request
