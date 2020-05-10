const MIXER_API_URL = 'https://mixer.com/api/v1/channels/'

async function fetchMixerData(mixerChannelId) {
  try {
    const response = await fetch(
      `${MIXER_API_URL}${mixerChannelId}`
    ).then(res => res.json())
    const { token, online } = response
    return token === mixerChannelId && online
  } catch (error) {
    console.error('Error fetching data from Mixer API: ', error)
  }
}

export { fetchMixerData, MIXER_API_URL }
