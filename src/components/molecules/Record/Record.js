import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "../../atoms/Header/Header";
import EmptyHeart from "@material-ui/icons/FavoriteBorder";
import FilledHeart from "@material-ui/icons/Favorite";

import { connect } from "react-redux";
import {
  selectItem,
  unSelectItem,
  setNotification,
} from "../../../redux/actions";

const animation = keyframes`
  0% {
    transform:translateX(-10%);
    opacity:0
  }
  100% {
    transform:translateX(0);
    opacity:1;
  }
`;
const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 5fr 4fr 0.5fr;
  align-items: center;
  padding: 10px 20px;
  border-radius: 20px;
  transition: background-color 0.2s;
  transform: translateX(-100%);
  animation: ${animation} 0.3s ease-out;
  animation-fill-mode: forwards;
  animation-delay: ${({ index }) => `${30 * index}ms`};
  overflow: hidden;
  &:hover {
    background-color: white;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 500px) {
    grid-template-columns: 0.5fr 7fr 0.5fr 0.5fr;
    padding: 10px 0;
    width: 90%;

    &:hover {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  span {
    margin-left: 3px;

    &:not(:last-child)::after {
      content: ",";
    }
  }
`;

const AdditionalText = styled.div`
  color: ${({ theme }) => theme.darkgrey};
  font-size: 1.5rem;

  @media (max-width: 500px) {
    opacity: 0;
    width: 20px;
    height: 10px;
  }
`;

const ImageWrapper = styled.div`
  background-image: url(${({ url }) => url});
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-position: center;
  object-fit: contain;
  background-size: 100%;
`;
const StyledIcon = styled.div`
  padding: 0 10px;
  cursor: pointer;
  svg {
    font-size: 3rem;
  }
`;

const StyledFilledHeart = styled(FilledHeart)`
  color: ${({ theme }) => theme.primary};
`;
const Record = ({
  name,
  artists,
  album,
  images,
  genres,
  listType,
  selectItem,
  unSelectItem,
  id,
  selectedItems,
  followers,
  view,
  index,
}) => {
  const item = {
    id,
    name,
    images,
    album,
  };
  const selected = () => {
    return selectedItems.find((el) => el.id === id);
  };

  return (
    <StyledWrapper index={index}>
      <ImageWrapper
        url={listType === "tracks" ? album.images[2].url : images[2].url}
      />
      <TitleWrapper>
        <Header color="dark">{name}</Header>
        <p>
          {listType === "tracks"
            ? artists.map(({ name }) => <span key={name}>{name}</span>)
            : genres.map((genre) => <span key={genre}>{genre}</span>)}
        </p>
      </TitleWrapper>
      <AdditionalText>
        {album ? album.name : followers.total + " followers"}
      </AdditionalText>
      {view === "topList" ? (
        <StyledIcon>
          {selected() ? (
            <StyledFilledHeart onClick={() => unSelectItem(id)} />
          ) : (
            <EmptyHeart
              onClick={() => {
                selectItem(item, listType);
              }}
            />
          )}
        </StyledIcon>
      ) : null}
    </StyledWrapper>
  );
};

const mapDispatchToProps = {
  selectItem,
  unSelectItem,
  setNotification,
};

const mapStateToProps = (state) => ({
  selectedItems: state.selectedItems,
  view: state.UI.view,
});
export default connect(mapStateToProps, mapDispatchToProps)(Record);
