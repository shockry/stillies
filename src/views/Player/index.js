import React, { useState } from "react";

const VIDEO_TYPES = {
  youtube: "youtube",
  movie: "movie"
};

function Player() {
  const [nowPlaying, setNowPlaying] = useState(null);

  if (!nowPlaying) {
    return (
      <div>
        Waiting awkwardly
        <button
          onClick={() =>
            setNowPlaying({
              type: VIDEO_TYPES.youtube,
              src: "https://www.youtube.com/embed/-76o69txkZs"
            })
          }
        >
          Game night trailer
        </button>
        <button
          onClick={() =>
            setNowPlaying({
              type: VIDEO_TYPES.movie,
              src: "http://localhost:3030/Game%20Night.m4v"
            })
          }
        >
          Game night
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <button
        onClick={() =>
          setNowPlaying({
            type: VIDEO_TYPES.youtube,
            src: "https://www.youtube.com/embed/-76o69txkZs"
          })
        }
      >
        Game night trailer
      </button>
      <button
        onClick={() =>
          setNowPlaying({
            type: VIDEO_TYPES.movie,
            src: "http://localhost:3030/Game%20Night.m4v"
          })
        }
      >
        Game night
      </button>
      {nowPlaying.type === VIDEO_TYPES.youtube ? (
        <iframe
          allow="autoplay"
          style={{ width: "100%", minHeight: "100vh" }}
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
