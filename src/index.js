/** @jsx jsx */
import { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'

const MIXER_API_URL = 'https://mixer.com/api/v1/channels/'
const TWITCH_API_URL = 'https://api.twitch.tv/helix/streams?user_login='

function ReactLivestream(props) {
  const {
    twitchClientId,
    mixerChannelId,
    offlineComponent,
    platform,
    twitchUserName,
    youtubeChannelId,
    youtubeApiKey
  } = props
  const [isLive, setIsLive] = useState(false)
  const iframeWrapperStyles = css`
    position: relative;
    &::before {
      content: '';
      display: block;
      padding-bottom: calc(100% / (16 / 9));
    }
  `
  const iframeStyles = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `

  function fetchTwitchData() {
    fetch(`${TWITCH_API_URL}${twitchUserName}`, {
      headers: {
        'Client-ID': twitchClientId
      }
    })
      .then(async res => {
        const response = await res.json()
        const streamInfo = Boolean(response.data && response.data[0])
        if (streamInfo) {
          setIsLive(true)
        }
      })
      .catch(err => {
        console.log('Error fetching data from Twitch API: ', err)
      })
  }

  function fetchMixerData() {
    fetch(`${MIXER_API_URL}${mixerChannelId}/broadcast`)
      .then(async res => {
        const response = await res.json()
        const { channelId, online } = response

        if (channelId === mixerChannelId && online) {
          setIsLive(true)
        }
      })
      .catch(err => {
        console.log('Error fetching data from Mixer API: ', err)
      })
  }

  function fetchYoutubeData() {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelId}&eventType=live&type=video&key=${youtubeApiKey}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then(async res => {
        const response = await res.json()
        console.log(response)

        // if (channelId === mixerChannelId && online) {
        //   setIsLive(true)
        // }
      })
      .catch(err => {
        console.log('Error fetching data from YouTube API: ', err)
      })
  }

  useEffect(() => {
    switch (platform) {
      case 'twitch':
        fetchTwitchData()
        break
      case 'mixer':
        fetchMixerData()
        break
      case 'youtube':
        fetchYoutubeData()
        break
      default:
        console.error('Platform prop is required for react-livestream')
        break
    }
  }, [])

  return !isLive ? (
    <div className="ReactLivestream" css={iframeWrapperStyles}>
      {platform === 'twitch' && (
        <iframe
          css={iframeStyles}
          allowFullScreen
          src={`https://player.twitch.tv/?channel=${twitchUserName}`}
          frameBorder="0"
        ></iframe>
      )}

      {platform === 'mixer' && (
        <iframe
          css={iframeStyles}
          i18n-title="channel#ShareDialog:playerEmbedFrame|Embed player Frame copied from share dialog"
          allowfullscreen="true"
          src={`https://mixer.com/embed/player/${mixerChannelId}?disableLowLatency=1`}
        ></iframe>
      )}

      {platform === 'youtube' && (
        <iframe
          css={iframeStyles}
          src="https://www.youtube.com/embed/5qap5aO4i9A"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
    </div>
  ) : offlineComponent ? (
    offlineComponent
  ) : null
}

export default ReactLivestream

ReactLivestream.propTypes = {
  twitchClientId: PropTypes.string,
  mixerChannelId: PropTypes.num,
  offlineComponent: PropTypes.element,
  platform: PropTypes.string.isRequired,
  twitchUserName: PropTypes.string,
  youtubeChannelId: PropTypes.string,
  youtubeApiKey: PropTypes.string
}

ReactLivestream.defaultProps = {
  twitchClientId: null,
  mixerChannelId: null,
  offlineComponent: null,
  twitchUserName: null,
  youtubeChannelId: null,
  youtubeApiKey: null
}
