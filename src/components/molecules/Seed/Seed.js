import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/HighlightOff";
import PropTypes from "prop-types";
import { unSelectItem } from "../../../redux/actions";
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  width: 70%;
  p {
    font-size: 2rem;
  }
  svg {
    font-size: 4rem;
  }
`;

const StyledImage = styled.div`
  width: 70px;
  height: 70px;
  background-image: url(${({ src }) => src});
  border-radius: 50%;
  margin-right: 10px;
  background-size: 100%;
  background-position: center;
`;
const StyledCloseIcon = styled(CloseIcon)`
  color: tomato;
  margin-left: 10px;
  cursor: pointer;
`;

const Seed = ({ name, album, images, id, unSelectItem }) => {
  return (
    <StyledWrapper>
      <StyledImage src={images ? images[2].url : album.images[2].url} />
      <p>{name}</p>
      <StyledCloseIcon onClick={() => unSelectItem(id)} />
    </StyledWrapper>
  );
};

Seed.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  album: PropTypes.object,
  images: PropTypes.array,
};
const mapDispatchToProps = {
  unSelectItem,
};
export default connect(null, mapDispatchToProps)(Seed);
