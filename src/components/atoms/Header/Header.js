import styled from "styled-components";

const Header = styled.h1`
  color: ${({ theme, color }) => (color ? theme[color] : theme.white)};
  font-size: ${({ size }) => (size ? size : "2rem")};
  font-weight: ${({ weight }) => (weight ? weight : "500")};
`;

export default Header;
