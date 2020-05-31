import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Movie from "./components/Movie";
import MovieDetails from "./components/MovieDetails";
import { useRouteMatch, Route, Link } from "react-router-dom";
import socketContext from "../../contexts/socket";
import { EVENT_TYPES } from "../../constants";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const socket = useContext(socketContext);
  const { path, url } = useRouteMatch();

  useEffect(() => {
    socket.emit(EVENT_TYPES.getMovies);
    socket.on(EVENT_TYPES.setMovies, setMovies);

    return () => {
      socket.off(EVENT_TYPES.setMovies);
    };
  }, [socket]);

  if (movies.length === 0) {
    return <Container>Getting movie list...</Container>;
  }

  return (
    <Container>
      <Title>Movie list!</Title>
      <MovieGridContainer>
        {movies.map((movie, index) => (
          <Link to={`${url}/${index}`} key={index}>
            <MovieContainer>
              <Movie {...movie} />
            </MovieContainer>
          </Link>
        ))}
      </MovieGridContainer>
      <Route path={`${path}/:movieId`}>
        <MovieDetailsContainer>
          <MovieDetails movies={movies} />
        </MovieDetailsContainer>
      </Route>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  color: ${(props) => props.theme.colors.primary};
  min-height: 100vh;
  padding: 42px 0px 42px 20px;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
  margin-top: 0;
`;

const MovieGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MovieContainer = styled.div`
  margin-right: 15px;
`;

const MovieDetailsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default MovieList;
