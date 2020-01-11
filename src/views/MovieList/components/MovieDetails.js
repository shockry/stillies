import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import socketContext from "../../../contexts/socket";
import { ArrowLeftCircle } from "react-feather";

function MovieDetails(props) {
  const { movieId } = useParams();
  const history = useHistory();
  const socket = useContext(socketContext);

  const { movies } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movies || !movies[movieId]) {
    return null;
  }

  const { title, description, poster, trailerUrl, movieUrl } = movies[movieId];
  return (
    <Container>
      <BackButton onClick={() => history.goBack()}>
        <ArrowLeftCircle size="32" />
      </BackButton>
      <Poster src={poster} alt={`${title} poster`} />
      <Title>{title}</Title>
      <WatchButtonsContainer>
        <button
          onClick={() =>
            socket.emit("watch/trailer", { title, url: trailerUrl })
          }
        >
          Watch trailer
        </button>
        <button
          onClick={() => socket.emit("watch/movie", { title, url: movieUrl })}
        >
          Watch movie
        </button>
      </WatchButtonsContainer>
      <Title>{description}</Title>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Poster = styled.img`
  width: 310px;
  height: 490px;
  object-fit: cover;
`;

const Title = styled.p`
  text-align: center;
  font-size: 32px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 30px;
  margin-top: 0;
`;

const WatchButtonsContainer = styled.div`
  display: flex;
`;

const BackButton = styled(Title)`
  cursor: pointer;
  align-self: start;
  margin-left: ${props => props.theme.spacing.small}px;
  margin-bottom: ${props => props.theme.spacing.small}px;
  margin-top: ${props => props.theme.spacing.small}px;
`;

export default MovieDetails;
