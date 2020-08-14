import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from ".";
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
`;

const AddingContainer = styled.div`
  border: 1px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 1rem 0;
  padding: 1rem 2rem;

  @media (max-width: 501px) {
    padding: 1rem;
  }
`;

const SmallText = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${theme.color.darkGrey};
`;

const TitleInput = styled.input`
  font-size: 18px;
  font-weight: bold;
  padding: 1rem;
  margin-right: 1rem;
  width: 100%;

  border-image-source: linear-gradient(to right, #e052a0, #f15c41);
  border-width: 3pt;
  border-image-slice: 1;

  &:focus {
    outline: none;
    border-image-source: linear-gradient(to right, #3ec7e0, #526bf4);
    border-width: 3pt;
    border-image-slice: 1;
  }
`;

const ButtonInputContainer = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  bottom: 2px;
`;

const FilmAdder = React.memo(
  ({ isAdding, inputValue, onInputChange, onSubmit, onToggle }) => {
    const formattedInputValue = capitalizeFirstLetterOfEachWord(inputValue);

    const handleKeyDown = event => {
      if (event.key === "Enter") {
        onSubmit();
      }
    };

    let _input;
    useEffect(() => {
      if (_input != null) {
        _input.focus();
      }
    });

    const placholder = randomPlaceholder();

    if (isAdding) {
      return (
        <AddingContainer>
          <div onClick={onToggle}>
            <SmallText>Add a film...</SmallText>
          </div>

          <ButtonInputContainer>
            <TitleInput
              ref={c => (_input = c)}
              name="title"
              type="text"
              value={formattedInputValue}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placholder}
            />

            <StyledButton onClick={onSubmit}>ok</StyledButton>
          </ButtonInputContainer>
        </AddingContainer>
      );
    }

    return (
      <div onClick={onToggle}>
        <Container>
          <p style={{ color: theme.color.darkGrey }}>Add a film...</p>
        </Container>
      </div>
    );
  }
);

function randomPlaceholder() {
  const films = [
    "The Lion King",
    "Space Jam",
    "Boyz n the Hood",
    "Parasite",
    "Cool Runnings",
    "The Shining",
    "Ratatouille",
    "Psycho",
    "Seven Samurai",
    "Pan's Labyrinth",
    "Breathless",
    "Apocalypse Now",
    "Rashomon",
    "2001: A Space Odyssey",
    "The Blues Brothers"
  ];
  const pick = Math.floor(Math.random() * films.length);
  return films[pick];
}

export default FilmAdder;
