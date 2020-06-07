export const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://stillies-backend.herokuapp.com/";

export const EVENT_TYPES = {
  getMovies: "library/get",
  setMovies: "library/set",
  watchTrailer: "trailer/watch",
  watchMovie: "movie/watch",
  pause: "pause",
  play: "play",
};

export const THEME = {
  colors: {
    backgroundPrimary: "#1D0E1E",
    backgroundSecondary: "#2D1C26",
    primary: "#987284",
    secondary: "#6C534E",
  },
  spacing: {
    xSmall: 5,
    small: 10,
    medium: 15,
    large: 24,
    xLarge: 32,
  },
};
