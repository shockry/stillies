import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MovieList from "./views/MovieList";
import Player from "./views/Player";

const theme = {
  colors: {
    backgroundPrimary: "#1D0E1E",
    backgroundSecondary: "#2D1C26",
    primary: "#987284",
    secondary: "#6C534E"
  }
};

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
