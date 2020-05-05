import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Seed from "../../molecules/Seed/Seed";
import Button from "../../atoms/Button/Button";
import {
  fetchRecommendations,
  clearRecommendations,
  createPlayList,
} from "../../../redux/actions";
import Record from "../../molecules/Record/Record";
import ListContainer from "../../atoms/ListContainer/ListContainer";

import Spinner from "../../molecules/spinner/spinner";
import Form from "../../molecules/Form/Form";
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: auto;
  ul {
    justify-content: center;
  }
`;

const StyledText = styled.p`
  font-size: 3rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`;

const StyledCounter = styled.p`
  font-size: 3rem;
  margin-bottom: 30px;
`;

const Recommendations = ({
  selectedItems,
  fetchRecommendations,
  recommendations,
  clearRecommendations,
  createPlayList,
  isCreated,
}) => {
  const seeds = {
    artists: [],
    tracks: [],
  };
  const UriArray = [];

  return (
    <StyledContainer>
      {isCreated ? (
        <StyledText>
          Your new playlist has been created! Visit your spotify player to
          listen it or create more playlists!
        </StyledText>
      ) : recommendations.isLoading ? (
        <Spinner />
      ) : recommendations.items.tracks ? (
        //  WE HAVE A RECOMMENDATIONS TRACKS LIST
        <>
          <Form uris={UriArray} />
          {/* <SmallNavBar>
            <li onClick={() => createPlayList(UriArray)}>
              <Button>save playlist</Button>
            </li>
            <li>
              <Button onClick={() => clearRecommendations()}>clear</Button>
            </li>
          </SmallNavBar> */}
          <ListContainer>
            {recommendations.items.tracks.map(
              ({ id, name, artists, album, uri }, index) => {
                UriArray.push(uri);
                return (
                  <Record
                    listType="tracks"
                    key={id}
                    id={id}
                    name={name}
                    artists={artists}
                    album={album}
                    index={index}
                  />
                );
              }
            )}
          </ListContainer>
        </>
      ) : selectedItems.length === 0 && !recommendations.items.tracks ? (
        // WE DONT HAVE RECOMMENDATIONS AND FAUVORITE TRACKS/ARTISTS
        <StyledText>
          Select up to five tracks or artists to see your new playlist!
        </StyledText>
      ) : (
        // USER ADD SOME TRACKS/ARTISTS TO FAUVORITE
        <>
          <StyledCounter>{selectedItems.length}/5</StyledCounter>
          <Button onClick={() => fetchRecommendations(seeds)}>
            Create playlist
          </Button>

          <ListContainer>
            {selectedItems.map(({ id, name, album, images, listType }) => {
              seeds[listType].push(id);
              return (
                <Seed
                  key={id}
                  id={id}
                  name={name}
                  album={album}
                  images={images}
                />
              );
            })}
          </ListContainer>
        </>
      )}
    </StyledContainer>
  );
};

const mapStateToProps = (state) => ({
  selectedItems: state.selectedItems,
  recommendations: state.recommendations,
  isCreated: state.isCreated,
});

const mapDispatchToProps = {
  fetchRecommendations,
  clearRecommendations,
  createPlayList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
