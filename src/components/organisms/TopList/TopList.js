import React, { useEffect } from "react";
import styled from "styled-components";
import NavIcon from "../../atoms/NavIcon/NavIcon";
import Record from "../../molecules/Record/Record";
import Header from "../../atoms/Header/Header";
import { connect } from "react-redux";
import {
  fetchArtists,
  fetchTracks,
  setTimeRange,
  resetCreate,
} from "../../../redux/actions";
import { setListType } from "../../../redux/actions";
import Button from "../../atoms/Button/Button";
import SmallNavBar from "../../atoms/SmallNavBar/SmallNavBar";
import ListContainer from "../../atoms/ListContainer/ListContainer";
import Heart from "../../molecules/Heart/Heart";
import Spinner from "../../molecules/spinner/spinner";
import DropDownMenu from "../../molecules/DropDownMenu/DropDownMenu";
import MusicIcon from "@material-ui/icons/MusicNote";
import PersonIcon from "@material-ui/icons/Person";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.dark};
  display: flex;
  flex-direction: column;
  align-items: right;
  opacity: 1;
  display: grid;
  grid-template-rows: 2fr 1fr 24fr;
  grid-template-columns: 100%;

  @media (max-width: 630px) {
    grid-template-rows: 3fr 0.1fr 24fr 3fr;
  }
`;
const StyledHeader = styled(Header)`
  margin-left: 10px;

  @media (max-width: 500px) {
    display: none;
  }
`;

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  /* @media (max-width: 500px) {
    display: none;
  } */
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  padding: 15px 0;
  align-items: center;
  span:first-child {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    margin: 10px;
  }
  li {
    margin: 0 10px;
  }

  svg {
    font-size: 50px;
  }

  @media (max-width: 630px) {
    position: fixed;
    bottom: 0;
    width: 100vw;
    justify-content: center;
    span:first-child {
      display: none;
    }
    li {
      margin: 0 20px;
    }
  }
`;
const StyledSmallNavBar = styled(SmallNavBar)`
  @media (max-width: 500px) {
    display: none;
  }
`;
const SmallText = styled.span`
  display: none;

  @media (max-width: 630px) {
    display: inline-block;
    margin: 0;
  }
`;

const TopList = ({
  listType,
  topList,
  fetchArtists,
  fetchTracks,
  timeRange,
  setTimeRange,
  setListType,
  resetCreate,
  isCreated,
}) => {
  const handleTimeChange = ({ target }) => {
    setTimeRange(target.innerText);
  };
  // GET USER TOP TRACKS INFO
  useEffect(() => {
    if (isCreated) {
      resetCreate();
    }
    fetchArtists(timeRange);
    fetchTracks(timeRange);
  }, [fetchArtists, fetchTracks, isCreated, resetCreate, timeRange]);

  return (
    <StyledWrapper>
      <StyledHeader weight="700" color="dark" size="3rem">
        Your top {listType}
      </StyledHeader>
      <DropDownMenu />

      <StyledNavBar>
        <StyledSmallNavBar>
          <li onClick={handleTimeChange}>
            <Button active={timeRange === "long_term"}>All time</Button>
          </li>
          <li onClick={handleTimeChange}>
            <Button active={timeRange === "medium_term"}>Last 6 months</Button>
          </li>
          <li onClick={handleTimeChange}>
            <Button active={timeRange === "short_term"}>Last month</Button>
          </li>
        </StyledSmallNavBar>

        <IconContainer>
          <span>{listType}</span>
          <NavIcon
            active={listType === "tracks"}
            onClick={() => setListType("tracks")}
          >
            <MusicIcon />
            <SmallText>tracks</SmallText>
          </NavIcon>
          <NavIcon
            active={listType === "artists"}
            onClick={() => setListType("artists")}
          >
            <PersonIcon />
            <SmallText>artists</SmallText>
          </NavIcon>
        </IconContainer>
      </StyledNavBar>
      {topList.isFetching ? (
        <Spinner />
      ) : (
        <ListContainer>
          {topList[listType].map(
            (
              { id, name, artists, album, images, genres, followers },
              index
            ) => (
              <Record
                listType={listType}
                key={id}
                id={id}
                name={name}
                artists={artists}
                album={album}
                images={images}
                genres={genres}
                followers={followers}
                Heart={Heart}
                index={index}
              />
            )
          )}
        </ListContainer>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => ({
  listType: state.listType,
  topList: state.topList,
  timeRange: state.timeRange,
  isCreated: state.isCreated,
});

const mapDispatchToProps = {
  fetchArtists,
  fetchTracks,
  setTimeRange,
  setListType,
  resetCreate,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopList);
