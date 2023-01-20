import { useState } from "react"
import { getAntiCSRFToken } from "@blitzjs/auth"

const Search = ({creator}) => {
  const [search, setSearch] = useState("")
  const [result, setResult] = useState({
    title: "",
    description: "",
    link: ""
  })
  const antiCSRFToken = getAntiCSRFToken()

  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch("/api/backend/search", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken
      },
      body: JSON.stringify({
        searchTerm: search,
        creator
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
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Quick search
        </label>
        <div className="relative mt-1 flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            onChange={handleSearch}
            className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd
              className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
              ⌘K
            </kbd>
          </div>

        </div>
        <button onClick={handleSearchSubmit}>Search</button>
      </div>
      <div>
        {!loading && result.title && (
          <>
            <h1>{result.title}</h1>
            <p>{result.description}</p>
            <a href={result.link}>Link</a>
          </>
        )}
      </div>
    </>
  )
}

export default Search
