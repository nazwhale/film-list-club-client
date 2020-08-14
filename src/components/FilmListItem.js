import React from "react";
import styled from "styled-components";
import { theme } from "../theme";
import { capitalizeFirstLetterOfEachWord } from "../utils";

const Container = styled.div`
  border: 1px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 1rem 0;
  padding: 0 2rem;

  @media (max-width: 501px) {
    padding: 1rem;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.p`
  cursor: pointer;
  color: ${theme.color.darkGrey};

  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 10px;

  &:hover {
    background: linear-gradient(to right, #3ec7e0, #526bf4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Title = styled.h3`
  &:hover {
    background: linear-gradient(to right, #3ec7e0, #526bf4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function FilmListItem({ title, onDelete }) {
  const formattedTitle = capitalizeFirstLetterOfEachWord(title);

  return (
    <Container>
      <Title>
        <a
          href={`https://www.imdb.com/find?q=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {formattedTitle}
        </a>
      </Title>
      <DeleteButton onClick={onDelete}>Remove</DeleteButton>
    </Container>
  );
}

export default FilmListItem;
