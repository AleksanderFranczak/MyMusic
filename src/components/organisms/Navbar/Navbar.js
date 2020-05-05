import React from "react";
import styled from "styled-components";
import UserData from "../../molecules/UserData/UserData";
import { connect } from "react-redux";

import { setView } from "../../../redux/actions";
import NavIcon from "../../atoms/NavIcon/NavIcon";
import { useHistory } from "react-router-dom";

import ListIcon from "@material-ui/icons/List";
import FilledHeart from "@material-ui/icons/Favorite";
import LogoutIcon from "@material-ui/icons/ExitToApp";

const StyledWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  position: relative;

  & > :first-child {
    position: absolute;
    left: 0px;

    @media (max-width: 500px) {
      display: none;
    }
  }
`;
const StyledList = styled.ul`
  list-style: none;
  display: flex;
`;
const Logout = styled(NavIcon)`
  position: fixed;
  top: 10px;
  left: 0;
  display: none;

  @media (max-width: 500px) {
    display: flex;
  }
`;

const Navbar = ({ setView, view }) => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <StyledWrapper>
      <UserData />
      <Logout onClick={() => handleLogout()}>
        <LogoutIcon />
        Logout
      </Logout>
      <StyledList>
        <NavIcon active={view === "topList"} onClick={() => setView("topList")}>
          <ListIcon />
          top list
        </NavIcon>
        <NavIcon
          active={view === "discover"}
          onClick={() => setView("discover")}
        >
          <FilledHeart />
          discover
        </NavIcon>
      </StyledList>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => ({
  listType: state.listType,
  view: state.UI.view,
});
export default connect(mapStateToProps, { setView })(Navbar);
