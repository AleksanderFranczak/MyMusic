import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 90%;
  display: flex;
`;

const StyledNumber = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Track = ({ name, artists, images }) => {
  return (
    <StyledWrapper>
      <StyledNumber>1</StyledNumber>
    </StyledWrapper>
  );
};

export default Track;
