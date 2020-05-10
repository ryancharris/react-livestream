import React from 'react'
import ReactLivestream from '../src'
import { withKnobs, text } from '@storybook/addon-knobs'

export default {
  title: 'ReactLivestream',
  component: ReactLivestream,
  decorators: [withKnobs]
}

const OfflineComponent = <h2>Offline</h2>

export const BaseComponent = () => (
  <ReactLivestream offlineComponent={OfflineComponent} />
)

export const TwitchComponent = () => {
  const userName = text('User name', '')
  const clientId = text('Client id', '')
  return (
    <ReactLivestream
      platform="twitch"
      twitchUserName={userName}
      twitchClientId={clientId}
      offlineComponent={OfflineComponent}
    />
  )
}

export const YoutubeComponent = () => {
  const channelId = text('Channel Id', '')
  const apiKey = text('Api key', '')

  return (
    <ReactLivestream
      youtubeApiKey={apiKey}
      youtubeChannelId={channelId}
      platform="youtube"
      offlineComponent={OfflineComponent}
    />
  )
}

export const MixerComponent = () => {
  const channelId = text('Channel Id', '')
  return (
    <ReactLivestream
      mixerChannelId={channelId}
      platform="mixer"
      offlineComponent={OfflineComponent}
    />
  )
}
