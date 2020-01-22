import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import io from "socket.io-client";
import MovieList from "./views/MovieList";
import socketContext from "./contexts/socket";
import { SOCKET_URL, THEME } from "./constants";

function App() {
  return (
    <Router>
      <ThemeProvider theme={THEME}>
        <socketContext.Provider value={io(SOCKET_URL)}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/movielist" />
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
