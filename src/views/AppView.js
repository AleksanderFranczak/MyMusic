import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//components
import TopList from "../components/organisms/TopList/TopList";

import Navbar from "../components/organisms/Navbar/Navbar";
import Recommendations from "../components/organisms/Recommendations/Recommendations";
import backgroundImage from "../asstes/images/pic2.jpg";
import Notification from "../components/molecules/Notification/Notification";
const StyledWrapper = styled.div`
  width: 80vw;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0 40px;
  @media (max-width: 800px) {
    width: 100vw;
    font-size: 8px;
    padding: 0 10px;
  }

  h1 {
    margin-right: 10px;

    &::first-letter {
      text-transform: uppercase;
    }
  }
`;

const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-position: center;
  background-size: 100%;
`;

const AppContent = styled.div`
  display: grid;
  grid-template-columns: auto;
  height: 85vh;

  @media (max-width: 630px) {
    height: 80vh;
  }
`;

const App = ({ view }) => {
  return (
    <StyledBackground>
      <StyledWrapper>
        <Navbar />
        <AppContent>
          {view === "topList" ? <TopList /> : <Recommendations />}
        </AppContent>
        <Notification />
      </StyledWrapper>
    </StyledBackground>
  );
};

const mapStateToProps = (state) => ({
  view: state.UI.view,
});

export default connect(mapStateToProps, null)(App);
