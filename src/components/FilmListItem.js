import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

const Container = styled.div`
  border: 3px solid ${theme.color.grey};
  border-radius: 5px;
  margin: 2rem 0;
  padding: 0 2rem;
`;

function FilmListItem({ title }) {
  return (
    <Container>
      <h2>{title}</h2>
    </Container>
  );
}

export default FilmListItem;
