import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieList } from "../../api";
import Movie from "./components/Movie";
import MovieDetails from "./components/MovieDetails";
import { useRouteMatch, Route, Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const { path, url } = useRouteMatch();

  useEffect(() => {
    getMovieList().then(setMovies);
  }, []);

  return (
    <Container>
      <Title>Movie list!</Title>
      <MovieGridContainer>
        {[...movies, ...movies, ...movies, ...movies].map((movie, index) => (
          <Link to={`${url}/${index}`} key={index}>
            <MovieContainer>
              <Movie {...movie} />
            </MovieContainer>
          </Link>
        ))}
      </MovieGridContainer>
      <Route path={`${path}/:movieId`}>
        <MovieDetailsContainer>
          <MovieDetails movies={[...movies, ...movies, ...movies, ...movies]} />
        </MovieDetailsContainer>
      </Route>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  min-height: 100vh;
  padding: 42px 0px 42px 20px;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  color: ${props => props.theme.colors.primary};
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
