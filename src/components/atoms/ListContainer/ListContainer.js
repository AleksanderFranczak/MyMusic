import styled from "styled-components";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: hidden;
  overflow-x: auto;
  max-height: 100%;
  width: 100%;

  height: 100%;
`;

const StyledScrollbars = styled(Scrollbars)`
  height: 100%;
  overflow-y: hidden;
`;

const ListContainer = ({ children }) => (
  <Wrapper>
    <StyledScrollbars>{children}</StyledScrollbars>
  </Wrapper>
);

export default ListContainer;
