import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import io from "socket.io-client";
import MovieList from "./views/MovieList";
import socketContext from "./contexts/socket";
import { SOCKET_URL, THEME } from "./constants";

function App() {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");

  if (!socket) {
    return (
      <ThemeProvider theme={THEME}>
        <PageContainer>
          <InputsContainer>
            <Input
              type="text"
              placeholder="Room Code"
              value={room}
              onChange={(event) => setRoom(event.target.value)}
            />
            <Button
              onClick={() => {
                setSocket(io(SOCKET_URL, { query: { room } }));
              }}
            >
              Enter
            </Button>
          </InputsContainer>
        </PageContainer>
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={THEME}>
        <socketContext.Provider value={{ socket, room }}>
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

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  color: ${(props) => props.theme.colors.primary};
  min-height: 100vh;
  padding: 42px 0px 42px 0px;
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.primary};
  border: none;
  font-size: 1.5rem;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 10px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  min-width: 100px;
  border: none;
  font-size: 1.8rem;
  background-color: #a09e9e;
  padding: 20px;
`;

export default App;
