import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from ".";
import { theme } from "../theme";

const Container = styled.div`
  border: 2px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 2rem 0;
  padding: 2rem;
  font-size: 18px;

  @media (max-width: 501px) {
    padding: 1rem;
  }
`;

const AddingContainer = styled.div`
  border: 2px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 2rem 0;
  padding: 1rem 2rem;
  font-size: 18px;

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

function FilmAdder({
  isAdding,
  inputValue,
  onInputChange,
  onSubmit,
  onToggle
}) {
  const formattedInputValue = capitalizeFirstLetterOfEachWord(inputValue);

  let _input;
  useEffect(() => {
    if (_input != null) {
      _input.focus();
    }
  });

  if (isAdding) {
    return (
      <AddingContainer>
        <div onClick={onToggle}>
          <SmallText>Title</SmallText>
        </div>

        <ButtonInputContainer>
          <TitleInput
            ref={c => (_input = c)}
            name="title"
            type="text"
            value={formattedInputValue}
            onChange={onInputChange}
          />

          <StyledButton onClick={onSubmit}>ok</StyledButton>
        </ButtonInputContainer>
      </AddingContainer>
    );
  }

  return (
    <div onClick={onToggle}>
      <Container>
        <p>Add a film</p>
      </Container>
    </div>
  );
}

function capitalizeFirstLetterOfEachWord(string) {
  return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}

export default FilmAdder;
