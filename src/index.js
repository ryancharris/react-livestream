/** @jsx jsx */
import { useEffect, useState } from "react";
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";

function TwitchPlugin(props) {
  const { apiKey, userName, aspectRatio } = props;
  const [streamData, setStreamData] = useState(null);

  useEffect(() => {
    fetch(`https://api.twitch.tv/helix/streams?user_login=${userName}`, {
      headers: {
        "Client-ID": apiKey
      }
    })
      .then(async res => {
        const response = await res.json();
        setStreamData(response.data[0]);
      })
      .catch(err => {
        console.log("Error fetching data from Twitch API: ", err);
        setStreamData(null);
      });
  }, []);

  return streamData ? (
    <div
      className="TwitchPlugin"
      css={css`
        position: relative;

        &::before {
          content: "";
          display: block;
          padding-bottom: calc(100% / ${aspectRatio});
        }
      `}
    >
      <iframe
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        `}
        allowFullScreen
        src={`https://player.twitch.tv/?channel=${streamData.user_name}`}
        frameBorder="0"
      ></iframe>
    </div>
  ) : null;
}

export default TwitchPlugin;

TwitchPlugin.propTypes = {
  apiKey: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
  userName: PropTypes.string.isRequired
};

TwitchPlugin.defaultProps = {
  aspectRatio: 16 / 9
};
