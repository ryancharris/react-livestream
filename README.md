# react-livestream

Automatically embed your livestream in your React app whenever you go live!

This package currently works with the following streaming platforms:

1. [Twitch](https://www.twitch.tv/)
2. [Mixer](https://www.mixer.com/)
3. [YouTube](https://www.youtube.com/)

### Instructions

`react-livestream` allows you to use a React component called `<ReactLivestream />`, which will embed a responsive `<iframe>` into your site whenever your channel or account is live.

If you are not currently broadcasting, nothing will be rendered in the DOM unless you choose to pass in an optional JSX element as the `offlineComponent` prop. In this case, that component will render when you're offline.

```javascript
import React from 'react'
import ReactLivestream from 'react-livestream'

// Optional component to be rendered
// when you're not streaming
function OfflineComponent() {
  return (
    <div>
      <p>I am offline now, but checkout my stream on Fridays at 5 PM EST</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <ReactLivestream
        mixerChannelId
        offlineComponent
        platform
        twitchClientId
        twitchUserName
        youtubeApiKey
        youtubeChannelId
      />
    </div>
  )
}

export default App
```

The component takes these general props:

- `platform` - "mixer", "twitch", or "youtube" (required)
- `offlineComponent` - A JSX element that renders in place of the `<iframe>` when the user is **not** live (optional)

In addition, you need to pass in the following information based on your streaming platform:

- `mixerChannelId` - Found in the Network tab of your developer tools when navigating to your Mixer channel. For example, mine is `https://mixer.com/api/v1/channels/102402534`, so my ID is `102402534`
- `twitchClientId` - Configure this in your Twitch Developer portal
- `twitchUserName` - The username associated with your Twitch account
- `youtubeApiKey` - Obtain this from the Google Developers console
- `youtubeChannelId` - This can be found in the URL to you YouTube channel. For example, my channel URL is `https://www.youtube.com/channel/UCwMTu04flyFwBnLF0-_5H-w`, so my channel ID is `UCwMTu04flyFwBnLF0-_5H-w`

### Examples

Currently, it works with the three streaming services mentioned above. Below, are examples of how to use this component for each streaming platform.

**Mixer**

```javascript
<ReactLivestream platform="mixer" mixerChannelId={102402534} />
```

**Twitch**

```javascript
<ReactLivestream
  platform="twitch"
  twitchClientId={'API_KEY_HERE'}
  twitchUserName="ryan_c_harris"
/>
```

**YouTube**

```javascript
<ReactLivestream
  platform="youtube"
  youtubeApiKey={'API_KEY_HERE'}
  youtubeChannelId="UCwMTu04flyFwBnLF0-_5H-w"
/>
```

### Notes

Built with [React](https://github.com/facebook/react) and [Rollup](https://github.com/rollup/rollup).

Maintained by [Ryan Harris](https://ryanharris.dev)
