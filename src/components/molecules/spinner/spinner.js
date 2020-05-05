import styled, { keyframes } from "styled-components";
import React from "react";

const loading = keyframes`
0% {
  transform:rotate(0deg);
}
100% {
  transform:rotate(360deg); 
}
`;

const SpinnerWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    border-color: ${({ theme }) => theme.primary} transparent transparent
      transparent;
    animation: ${loading} 1.2s cubic-bezier(0.5, 0, 0.5, 1);
    animation-iteration-count: infinite;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Spinner = () => (
  <SpinnerWrapper>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </SpinnerWrapper>
);

export default Spinner;
