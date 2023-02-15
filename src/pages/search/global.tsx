import Search from "../../search/components/Search"
import React, { Suspense } from "react"
import Layout from "../../core/layouts/Layout"

const GlobalSearchPage = () => {
  return (
    <>
      <h1>Curated Search</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Search type="global"/>
      </Suspense>
    </>
  )
}

GlobalSearchPage.authenticate = { redirectTo: "/" }
GlobalSearchPage.getLayout = (page) => <Layout title={"Global Search"}>{page}</Layout>
export default GlobalSearchPage
