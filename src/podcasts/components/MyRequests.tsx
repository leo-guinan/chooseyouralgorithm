import { useQuery } from "@blitzjs/rpc"
import getMyRequests from "../queries/getMyRequests"

const MyRequests = () => {
  const [myRequests] = useQuery(getMyRequests, { } )

  return (
    <>
      <h1>My Requests</h1>
      {myRequests && myRequests.map((request) => (
        <div key={request.id}>
          <h2>{request.podcastName}</h2>
        </div>
        ))}

    </>
  )
}

export default MyRequests
