import styled from "styled-components";
import { theme } from "../../theme";

const StyledButton = styled.button`
  position: relative;
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
  &:hover {
    background-color: ${theme.color.primaryHover};
  }
  font-size: 16px;
  letter-spacing: 0.05rem;
  font-weight: 700;
  border-radius: 0.2rem;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
`;

export default StyledButton;
