import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${({ theme, active }) =>
    active ? theme.primary : "white"};
  font-size: 1.5rem;
  color: ${({ theme, active }) => (active ? "white" : theme.primary)};
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.4);
  font-family: "Montserrat";
  font-weight: ${({ active }) => (active ? "700" : "500")};
  border-radius: 30px;

  cursor: pointer;
  &:hover {
    transform: translateX(3px);
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: translateX(-1px);
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  }
`;

export default StyledButton;
