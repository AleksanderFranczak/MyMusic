import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import TrackList from "../components/organisms/TrackList/TrackList";
import Header from "../components/atoms/Header/Header";
import Navbar from "../components/organisms/Navbar/Navbar";

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.white};

  h1 {
    display: inline-block;
    margin-right: 10px;

    &::first-letter {
      text-transform: uppercase;
    }
  }
`;

const App = ({ token }) => {
  return (
    <StyledWrapper>
      <Navbar />
      <TrackList />
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});
export default App;
