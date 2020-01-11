import React, { useState, useEffect, useContext } from "react";
import socketContext from "../../contexts/socket";
import { EVENT_TYPES } from "../../constants";

const VIDEO_TYPES = {
  youtube: "youtube",
  movie: "movie"
};

function Player() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const socket = useContext(socketContext);

  useEffect(() => {
    socket.on(EVENT_TYPES.watchTrailer, movie => {
      setNowPlaying({
        type: VIDEO_TYPES.youtube,
        src: movie.trailerUrl
      });
    });
    return () => socket.off(EVENT_TYPES.watchTrailer);
  }, [nowPlaying, socket]);

  if (!nowPlaying) {
    return <div>Waiting awkwardly</div>;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {nowPlaying.type === VIDEO_TYPES.youtube ? (
        <iframe
          allow="autoplay"
          style={{ width: "100%", minHeight: "100vh", border: "none" }}
          src={`${nowPlaying.src}?autoplay=1`}
          title="trailer"
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

export default Player;
