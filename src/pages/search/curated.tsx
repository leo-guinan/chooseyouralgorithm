import Search from "../../search/components/Search"
import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"

const CuratedSearchPage = () => {
  return (
    <>
      <div className="md:flex md:items-center md:justify-between pb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Search Curated Podcasts
          </h2>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Search type="curated" />
      </Suspense>
    </>
  )
}

CuratedSearchPage.authenticate = { redirectTo: "/" }
CuratedSearchPage.getLayout = (page) => <Layout title={"Curated Search"}>{page}</Layout>
export default CuratedSearchPage
