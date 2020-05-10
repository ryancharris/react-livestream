async function fetchYoutubeData(youtubeChannelId, youtubeApiKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelId}&eventType=live&type=video&key=${youtubeApiKey}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    ).then(res => res.json())

    if (response.items && response.items.length >= 1) {
      return response.items[0]
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API: ', error)
  }
}

export { fetchYoutubeData }
