import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieList from "./views/MovieList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MovieList />
        </Route>
        <Route>
          <p>How did you get in here? XD</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
