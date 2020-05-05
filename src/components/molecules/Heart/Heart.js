import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import FilledHeart from "@material-ui/icons/Favorite";

const StyledIcon = styled.div`
  cursor: pointer;
  svg {
    font-size: 3rem;
    color: ${({ theme, active }) => (active ? theme.primary : theme.grey)};
  }
`;

const Heart = ({ selectedItems, id }) => {
  const selected = () => {
    return selectedItems.find((el) => el.id === id);
  };
  console.log(selected());
  return (
    <StyledIcon active={() => selected()}>
      <FilledHeart />
    </StyledIcon>
  );
};
const mapStateToProps = (state) => ({
  selectedItems: state.selectedItems,
});

export default connect(mapStateToProps)(Heart);
