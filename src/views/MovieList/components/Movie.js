import React from "react";
import styled from "styled-components";

function Movie(props) {
  const { title, poster } = props;

  return (
    <Container>
      <Img src={poster} alt={title} />
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
`;

export default Movie;
