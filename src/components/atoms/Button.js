import styled from "styled-components";
import { theme } from "../../theme";

const StyledButton = styled.button`
  position: relative;
  background-color: ${theme.color.primary};
  background-image: linear-gradient(to right, #e052a0, #f15c41);
  color: ${theme.color.white};

  &:hover {
    background-image: linear-gradient(to right, #3ec7e0, #526bf4);
  }

  font-size: 20px;
  letter-spacing: 0.05rem;
  font-weight: 700;
  border-radius: 1rem;
  padding: 1rem 1rem;
  border: none;
  cursor: pointer;
`;

export default StyledButton;
