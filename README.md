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
        platform="mixer"
        mixerChannelId
        offlineComponent={OfflineComponent}
      />

      <ReactLivestream platform="twitch" twitchDataUrl twitchUserName />

      <ReactLivestream platform="youtube" youtubeApiKey youtubeChannelId />
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
- `twitchDataUrl` - An endpoint that handles authenticating with the Twitch API and makes a request for stream infomation about the user specified below.
- `twitchUserName` - The username associated with your Twitch account
- `youtubeApiKey` - Obtain this from the Google Developers console
- `youtubeChannelId` - This can be found in the URL to you YouTube channel. For example, my channel URL is `https://www.youtube.com/channel/UCwMTu04flyFwBnLF0-_5H-w`, so my channel ID is `UCwMTu04flyFwBnLF0-_5H-w`

### Examples

Currently, it works with the three streaming services mentioned above. Below, are examples of how to use this component for each streaming platform.

**Mixer**

```javascript
<ReactLivestream platform="mixer" mixerChannelId={CHANNEL_ID} />
```

**Twitch**

```javascript
<ReactLivestream
  platform="twitch"
  twitchDataUrl="ENDPOINT_URL"
  twitchUserName="USER_NAME"
/>
```

**YouTube**

```javascript
<ReactLivestream
  platform="youtube"
  youtubeApiKey="API_KEY"
  youtubeChannelId="CHANNEL_ID"
/>
```

### Twitch and react-livestream

In April 2020, Twitch changed how their API works and you can no longer make authenticated calls from the client. Because of that, you will need to add some infrastructure to handle server-to-server request.

Currently, I am handling this with a [Netlify function](https://www.netlify.com/products/functions/). Feel free to copy and paste the snippet below for your own use. Just make sure to swap out the placeholder values.

```javascript
const fetch = require('node-fetch')
require('dotenv').config()

function getTwitchData(token) {
  console.log('Fetching broadcast info...')

  const apiUrl = 'https://api.twitch.tv/helix/streams?user_login=YOUR_USER_NAME'

  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Unable to authenticate with Twitch API')
      }
    })
    .catch(err => err)
}

exports.handler = async function (event, context) {
  console.log('Requesting token from Twitch API...')

  const TWITCH_API = 'https://id.twitch.tv/oauth2/token'
  const tokenUrl = `${TWITCH_API}?client_id=${process.env.GATSBY_TWITCH_CLIENT_ID}&client_secret=${process.env.GATSBY_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`

  const data = fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Cannot retrieve access_token from Twitch API')
      }
    })
    .then(async json => {
      const token = json.access_token
      return {
        statusCode: 200,
        body: JSON.stringify(await getTwitchData(token)),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    })
    .catch(err => {
      return {
        statusCode: 422,
        body: String(err)
      }
    })

  return data
}
```

### Notes

Built with [React](https://github.com/facebook/react) and [Microbundle](https://github.com/developit/microbundle).

Maintained by [Ryan Harris](https://ryanharris.dev)
