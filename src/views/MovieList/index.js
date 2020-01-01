import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieList } from "../../api";
import Movie from "./components/Movie";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovieList().then(setMovies);
  }, []);

  return (
    <Container>
      <Title>Movie list!</Title>
      <MovieGridContainer>
        {[...movies, ...movies, ...movies, ...movies].map((movie, index) => (
          <MovieContainer key={index}>
            <Movie {...movie} />
          </MovieContainer>
        ))}
      </MovieGridContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  min-height: 100vh;
  padding: 42px 20px;
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
`;

const MovieContainer = styled.div`
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;

export default MovieList;
