import { useState, useEffect } from 'react'
import { fetchYoutubeData, fetchTwitchData, fetchMixerData } from '../services'

function useCheckLive(
  platform,
  twitchClientId,
  twitchUserName,
  youtubeChannelId,
  youtubeApiKey,
  mixerChannelId
) {
  const [isLive, setIsLive] = useState(false)
  const [youtubeVideoId, setYoutubeVideoId] = useState(null)

  useEffect(() => {
    async function processYoutubeStream() {
      if (youtubeChannelId && youtubeApiKey) {
        const streamInfo = await fetchYoutubeData(
          youtubeChannelId,
          youtubeApiKey
        )
        if (streamInfo) setIsLive(true)
        setYoutubeVideoId(streamInfo.id.videoId)
      } else {
        console.error(
          '[react-livestream] YouTube support requires a youtubeApiKey and youtubeChannelId prop'
        )
      }
    }

    async function processTwitchStream() {
      if (twitchClientId && twitchUserName) {
        const streamInfo = await fetchTwitchData(twitchUserName, twitchClientId)
        if (streamInfo) setIsLive(true)
      } else {
        console.error(
          '[react-livestream] Twitch support requires a twitchClientId and twitchUserName prop'
        )
      }
    }

    async function processMixerStream() {
      if (mixerChannelId) {
        const response = await fetchMixerData(mixerChannelId)
        if (response) setIsLive(true)
      } else {
        console.error(
          '[react-livestream] Mixer support requires a mixerChannelId prop'
        )
      }
    }

    switch (platform) {
      case 'mixer':
        processMixerStream()
        break
      case 'twitch':
        processTwitchStream()
        break
      case 'youtube':
        processYoutubeStream()
        break
      default:
        console.error(
          '[react-livestream] Platform prop is required for this package to work 🤘'
        )
        break
    }
  }, [
    platform,
    youtubeChannelId,
    youtubeApiKey,
    twitchClientId,
    twitchUserName,
    mixerChannelId
  ])

  return [isLive, youtubeVideoId]
}

export { useCheckLive }
