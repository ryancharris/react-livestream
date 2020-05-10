import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useCheckLive } from './customHooks/useCheckLive'

const StyledIframeWrapper = styled.div`
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (16 / 9));
  }
`

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

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

  const [isLive, youtubeVideoId] = useCheckLive(
    platform,
    twitchClientId,
    twitchUserName,
    youtubeChannelId,
    youtubeApiKey,
    mixerChannelId
  )

  function embedIframe() {
    switch (platform) {
      case 'mixer':
        return (
          <StyledIframe
            i18n-title="channel#ShareDialog:playerEmbedFrame|Embed player Frame copied from share dialog"
            allowFullScreen="true"
            src={`https://mixer.com/embed/player/${mixerChannelId}?disableLowLatency=1`}
          ></StyledIframe>
        )
      case 'twitch':
        return (
          <StyledIframe
            allowFullScreen
            src={`https://player.twitch.tv/?channel=${twitchUserName}`}
            frameBorder="0"
          ></StyledIframe>
        )
      case 'youtube':
        return (
          <StyledIframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></StyledIframe>
        )
    }
  }

  return isLive ? (
    <StyledIframeWrapper>{embedIframe()}</StyledIframeWrapper>
  ) : offlineComponent ? (
    offlineComponent
  ) : null
}

export default ReactLivestream

ReactLivestream.propTypes = {
  mixerChannelId: PropTypes.number,
  offlineComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func
  ]),
  platform: PropTypes.string.isRequired,
  twitchClientId: PropTypes.string,
  twitchUserName: PropTypes.string,
  youtubeChannelId: PropTypes.string,
  youtubeApiKey: PropTypes.string
}

ReactLivestream.defaultProps = {
  mixerChannelId: null,
  offlineComponent: null,
  twitchClientId: null,
  twitchUserName: null,
  youtubeChannelId: null,
  youtubeApiKey: null
}
