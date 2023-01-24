import { useRouter } from 'next/router'
import React, { Suspense } from "react"
import Search from "../../curator/components/Search"

const CuratorPage = () => {
  const router = useRouter()
  const { curator } = router.query
  return (
    <>
      <h1>Curator: {curator}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    </>
  )
}

export default CuratorPage
