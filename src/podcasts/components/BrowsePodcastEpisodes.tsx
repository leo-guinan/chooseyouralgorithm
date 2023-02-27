import { useQuery } from "@blitzjs/rpc"
import getAllPodcasts from "../queries/getAllPodcasts"
import getEpisodesForPodcast from "../queries/getEpisodesForPodcast"
import PodcastEpisode from "./PodcastEpisode"

const BrowsePodcastEpisodes = ({ podcastId }) => {
  const [episodes] = useQuery(getEpisodesForPodcast, { podcastId })
  return (
    <>
      {episodes &&
        episodes.map((episode) => {
          return <PodcastEpisode episode={episode} key={episode.id} />
        })}
    </>
  )
}

export default BrowsePodcastEpisodes
