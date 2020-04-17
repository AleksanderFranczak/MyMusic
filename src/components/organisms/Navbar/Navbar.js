import React from "react";
import styled from "styled-components";
import UserData from "../../molecules/UserData/UserData";
const StyledWrapper = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  & > :first-child {
    position: absolute;
    left: 20px;
  }
`;
const StyledList = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledListItem = styled.li`
  font-size: 2.5rem;
  margin: 0 10px;
`;
const Navbar = () => {
  return (
    <StyledWrapper>
      <UserData />
      <StyledList>
        <StyledListItem>tracks</StyledListItem>
        <StyledListItem>artists</StyledListItem>
        <StyledListItem>quiz</StyledListItem>
      </StyledList>
    </StyledWrapper>
  );
};

export default Navbar;
