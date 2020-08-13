import React from "react";
import styled from "styled-components";
import { Button } from ".";
import { theme } from "../theme";

const Container = styled.div`
  border: 2px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 2rem 0;
  padding: 2rem;
  font-size: 18px;
`;

const AddingContainer = styled.div`
  border: 2px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 2rem 0;
  padding: 1rem 2rem;
  font-size: 18px;
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
  width: 60%;

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

function FilmAdder({
  isAdding,
  inputValue,
  onInputChange,
  onSubmit,
  onToggle
}) {
  inputValue = capitalizeFirstLetterOfEachWord(inputValue);

  if (isAdding) {
    return (
      <AddingContainer>
        <div onClick={onToggle}>x</div>
        <SmallText>Title</SmallText>
        <TitleInput
          name="title"
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />

        <Button onClick={onSubmit}>ok</Button>
      </AddingContainer>
    );
  }

  return (
    <Container>
      <div onClick={onToggle}>x</div>
      <p>Add a film</p>
    </Container>
  );
}

function capitalizeFirstLetterOfEachWord(string) {
  return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}

export default FilmAdder;
