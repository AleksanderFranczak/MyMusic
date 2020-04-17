import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../atoms/Header/Header";
import Track from "../../molecules/Track/Track";
import { connect } from "react-redux";
const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  width: 50%;
  height: 80vh;

  padding: 20px 10px;
  color: ${({ theme }) => theme.dark};
`;

const TracksTopBar = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;

  ul {
    margin: auto;
    list-style: none;
    display: flex;
  }
`;

const ListItem = styled.li`
  margin: 0 10px;
  font-size: 2rem;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  color: ${({ theme }) => theme.primary};
`;
const TrackList = ({ token }) => {
  const [tracksList, setTracksList] = useState([]);
  // GET USER TOP TRACKS INFO
  useEffect(() => {
    axios({
      method: "get",
      url:
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setTracksList(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  return (
    <StyledWrapper>
      <TracksTopBar>
        <ul>
          <ListItem>All time</ListItem>
          <ListItem>Last 6 months</ListItem>
          <ListItem>Last month</ListItem>
        </ul>
      </TracksTopBar>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});
export default connect(mapStateToProps)(TrackList);
