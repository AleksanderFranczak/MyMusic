import styled from "styled-components";

const NavIcon = styled.li`
  font-size: 1.5rem;
  margin: 0 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  color: ${({ theme, active }) => (active ? theme.primary : theme.grey)};
  text-decoration: none;
  align-items: center;
  font-weight: 700;
  svg {
    margin-bottom: 5px;
    font-size: 40px;
    background-color: ${({ theme }) => theme.lightgrey};
    border-radius: 50%;
    padding: 5px;
  }
`;
export default NavIcon;
