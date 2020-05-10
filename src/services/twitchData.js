const TWITCH_API_URL = 'https://api.twitch.tv/helix/streams?user_login='

async function fetchTwitchData(twitchUserName, twitchClientId) {
  try {
    const response = await fetch(`${TWITCH_API_URL}${twitchUserName}`, {
      headers: {
        'Client-ID': twitchClientId
      }
    }).then(res => res.json())

    const streamInfo = Boolean(response.data && response.data[0])
    return streamInfo
  } catch (error) {
    console.error('Error fetching data from Twitch API: ', error)
  }
}

export { fetchTwitchData, TWITCH_API_URL }
