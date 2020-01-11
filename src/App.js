import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import io from "socket.io-client";
import MovieList from "./views/MovieList";
import Player from "./views/Player";
import socketContext from "./contexts/socket";
import { SOCKET_URL } from "./constants";

const theme = {
  colors: {
    backgroundPrimary: "#1D0E1E",
    backgroundSecondary: "#2D1C26",
    primary: "#987284",
    secondary: "#6C534E"
  },
  spacing: {
    xSmall: 5,
    small: 10,
    medium: 15,
    large: 32
  }
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <socketContext.Provider value={io(SOCKET_URL)}>
          <Switch>
            <Route exact path="/player">
              <Player />
            </Route>
            <Route path="/movielist">
              <MovieList />
            </Route>
            <Route>
              <p>How did you get in here? XD</p>
            </Route>
          </Switch>
        </socketContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
