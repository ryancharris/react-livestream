/** @jsx jsx */
import { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'

function TwitchPlugin(props) {
  const {
    twitchClientId,
    aspectRatio,
    mixerChannelId,
    offlineComponent,
    platform,
    twitchUserName
  } = props
  const [isLive, setIsLive] = useState(false)

  function fetchTwitchData() {
    fetch(`https://api.twitch.tv/helix/streams?user_login=${twitchUserName}`, {
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
    fetch(`https://mixer.com/api/v1/channels/${mixerChannelId}/broadcast`)
      .then(async res => {
        const response = await res.json()
        const { channelId, online } = response

        if (channelId === parseInt(mixerChannelId) && online) {
          setIsLive(true)
        }
      })
      .catch(err => {
        console.log('Error fetching data from Mixer API: ', err)
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
        console.log('youtube')
        break
      default:
        console.error('Platform prop is required for twitch-plugin')
        break
    }
  }, [])

  return isLive ? (
    <div
      className="TwitchPlugin"
      css={css`
        position: relative;

        &::before {
          content: '';
          display: block;
          padding-bottom: calc(100% / ${aspectRatio});
        }
      `}
    >
      {platform === 'twitch' && (
        <iframe
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
          allowFullScreen
          src={`https://player.twitch.tv/?channel=${twitchUserName}`}
          frameBorder="0"
        ></iframe>
      )}

      {platform === 'mixer' && (
        <iframe
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
          title="ryanharris's player frame"
          i18n-title="channel#ShareDialog:playerEmbedFrame|Embed player Frame copied from share dialog"
          allowfullscreen="true"
          src={`https://mixer.com/embed/player/${mixerChannelId}?disableLowLatency=1`}
        ></iframe>
      )}
    </div>
  ) : (
    offlineComponent
  )
}

export default TwitchPlugin

TwitchPlugin.propTypes = {
  twitchClientId: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
  mixerChannelId: PropTypes.string,
  offlineComponent: PropTypes.element,
  platform: PropTypes.string.isRequired,
  twitchUserName: PropTypes.string
}

TwitchPlugin.defaultProps = {
  aspectRatio: 16 / 9,
  mixerChannelId: null,
  offlineComponent: null,
  twitchUserName: null
}
