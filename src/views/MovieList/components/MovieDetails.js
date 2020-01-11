import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";

function MovieDetails(props) {
  const { movies } = props;
  const { movieId } = useParams();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movies || !movies[movieId]) {
    return null;
  }

  const { title, description, poster } = movies[movieId];
  return (
    <Container>
      <BackButton onClick={() => history.goBack()}>Back to list</BackButton>
      <PosterAndTitle>
        <Title>{title}</Title>
        <Poster src={poster} alt={`${title} poster`} />
      </PosterAndTitle>
      <Title>{description}</Title>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PosterAndTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Poster = styled.img`
  width: 310px;
  height: 490px;
  object-fit: cover;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 30px;
  margin-top: 0;
`;

const BackButton = styled(Title)`
  cursor: pointer;
`;

export default MovieDetails;
