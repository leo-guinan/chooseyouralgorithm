import Search from "../../search/components/Search"
import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"

const CuratedSearchPage = () => {
  return (
    <>
      <h1>Curated Search</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Search type="curated"/>
      </Suspense>
    </>
  )
}

CuratedSearchPage.authenticate = { redirectTo: "/" }
CuratedSearchPage.getLayout = (page) => <Layout title={"Curated Search"}>{page}</Layout>
export default CuratedSearchPage
