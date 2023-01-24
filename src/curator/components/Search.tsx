import React, { useState } from "react"
import { getAntiCSRFToken } from "@blitzjs/auth"


const Search= ({ }) => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState({
    title: "",
    description: "",
    link: "",
    chunk: "",
    author: ""
  })
  const antiCSRFToken = getAntiCSRFToken()

  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch("/api/backend/curated", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken
      },
      body: JSON.stringify({
        searchTerm: search,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setResult({ ...data })

      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)

  }


  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">{/* Content goes here */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Quick search
            </label>
            <div className="relative mt-1 flex items-center">
              <div className="relative flex mt-1 items-center w-3/4">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onChange={handleSearch}
                  className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  {/*<kbd*/}
                  {/*  className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">*/}
                  {/*  ⌘K*/}
                  {/*</kbd>*/}
                </div>
              </div>
              <button
                className="flex flex-end mx-5 inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSearchSubmit}>Search
              </button>
            </div>

          </div>
          <div>
            {!loading && result.title && (
              <div className="my-5">
                <a href={result.link} target="_blank" rel="noreferrer noopener">
                              <span
                                className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                                <span className="inline-flex w-7/8">{result.title}</span>
                                 <span className="inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>

                  </span>
                              </span>

                </a>

                <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
                  <p>{result.author}</p>
                  <blockquote>
                    <p>
                      {result.chunk}
                    </p>
                  </blockquote>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
