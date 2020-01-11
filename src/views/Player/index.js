import React, { useState, useEffect, useContext } from "react";
import YouTube from "@u-wave/react-youtube";
import socketContext from "../../contexts/socket";
import { EVENT_TYPES } from "../../constants";
import styled from "styled-components";

const VIDEO_TYPES = {
  youtube: "youtube",
  movie: "movie"
};

function Player() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [paused, setPaused] = useState(false);
  const socket = useContext(socketContext);

  useEffect(() => {
    socket.on(EVENT_TYPES.watchTrailer, movie => {
      setNowPlaying({
        type: VIDEO_TYPES.youtube,
        src: movie.trailerUrl
      });
    });

    socket.on(EVENT_TYPES.pauseTrailer, () => {
      setPaused(true);
    });

    socket.on(EVENT_TYPES.playTrailer, () => {
      setPaused(false);
    });

    return () => {
      socket.off(EVENT_TYPES.watchTrailer);
      socket.off(EVENT_TYPES.pauseTrailer);
      socket.off(EVENT_TYPES.playTrailer);
    };
  }, [nowPlaying, socket]);

  if (!nowPlaying) {
    return <div>Waiting awkwardly</div>;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {nowPlaying.type === VIDEO_TYPES.youtube ? (
        <YouTubePlayerStyled
          video={nowPlaying.src.substring(nowPlaying.src.lastIndexOf("/") + 1)}
          autoplay
          paused={paused}
        />
      ) : (
        <video
          style={{ width: "100%", minHeight: "100vh" }}
          src={nowPlaying.src}
          autoPlay
        />
      )}
    </div>
  );
}

const YouTubePlayerStyled = styled(YouTube)`
  width: 100%;
  min-height: 100vh;
  border: none;
`;

export default Player;
