import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { ArrowLeftCircle, PlayCircle, PauseCircle } from "react-feather";
import { useParams, useHistory } from "react-router-dom";
import socketContext from "../../../contexts/socket";
import { EVENT_TYPES, THEME } from "../../../constants";

function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const history = useHistory();
  const { socket, room } = useContext(socketContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!movies || !movies[movieId]) {
    return <Container>Something is wrong, try another movie maybe?</Container>;
  }

  const { title, description, poster, year, trailer, nameOnSystem } = movies[
    movieId
  ];
  return (
    <Container>
      <BackButton onClick={history.goBack}>
        <ArrowLeftCircle size="32" />
      </BackButton>
      <Poster src={poster} alt={`${title} poster`} />
      <Title>{title}</Title>
      <Year>{year}</Year>

      <WatchButtonsContainer>
        <Button
          onClick={() =>
            socket.emit(
              EVENT_TYPES.watchTrailer,
              {
                title,
                trailerUrl: trailer,
              },
              room
            )
          }
        >
          Watch trailer
        </Button>
        <Button
          onClick={() =>
            socket.emit(EVENT_TYPES.watchMovie, { title, nameOnSystem }, room)
          }
        >
          Watch movie
        </Button>
      </WatchButtonsContainer>
      <VideoControlsContainer>
        <Button onClick={() => socket.emit(EVENT_TYPES.pause, room)}>
          <PauseCircle size={THEME.spacing.xLarge} />
        </Button>
        <Button onClick={() => socket.emit(EVENT_TYPES.play, room)}>
          <PlayCircle size={THEME.spacing.xLarge} />
        </Button>
      </VideoControlsContainer>
      <Title>{description}</Title>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: ${(props) => props.theme.spacing.large}px;
`;

const Poster = styled.img`
  width: 310px;
  height: 490px;
  object-fit: cover;
  box-shadow: 0px 0px 8px 4px black;
  border-radius: 5px;
`;

const Title = styled.p`
  text-align: center;
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary};
  margin-top: ${(props) => props.theme.spacing.small}px;
  margin-bottom: 0;
`;

const Year = styled(Title)`
  font-size: 12px;
  margin-bottom: 30px;
`;

const WatchButtonsContainer = styled.div`
  display: flex;
`;

const BackButton = styled(Title)`
  cursor: pointer;
  align-self: start;
  margin-left: ${(props) => props.theme.spacing.small}px;
  margin-bottom: ${(props) => props.theme.spacing.small}px;
  margin-top: ${(props) => props.theme.spacing.small}px;
`;

const VideoControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.small}px;
`;

const Button = styled.button`
  border: none;
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.theme.spacing.large}px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: ${(props) => props.theme.spacing.small}px;
  padding: ${(props) => props.theme.spacing.small}px;
  & > svg {
    vertical-align: middle;
  }
  margin-right: ${(props) => props.theme.spacing.xSmall}px;
  &:last-child {
    margin-right: 0;
  }
`;

export default MovieDetails;
