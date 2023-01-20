import { useRouter } from 'next/router'
import React, { Suspense } from "react"
import Search from "../../creator/components/Search"

const CreatorPage = () => {
  const router = useRouter()
  const { creator } = router.query
  return (
    <>
      <h1>Creator: {creator}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Search creator={creator}/>
      </Suspense>
    </>
  )
}

export default CreatorPage
