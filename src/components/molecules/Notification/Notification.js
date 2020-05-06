import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
const StyledWrapper = styled.div`
  background-color: ${({ type }) =>
    type === "success" ? "rgba(61, 221, 72, 0.9)" : "rgba(14,121,178,0.9)"};
  position: fixed;
  right: 20px;
  transition: all 0.3s ease-out;
  scale: ${({ isDisplaying }) => (isDisplaying ? 1 : 0)};
  top: 20px;
  z-index: 999;
  padding: 10px 30px;
  color: black;
  border-radius: 30px;
  display: ${({ isDisplaying }) => (isDisplaying ? "flex" : "none")};
  align-items: center;

  svg {
    font-size: 30px;
    margin-left: 20px;
  }
`;
const Title = styled.p`
  font-size: 2rem;
`;

const StyledText = styled.p`
  font-size: ${({ big }) => (big ? "1.5rem" : "1.2rem")};
`;
const Notification = ({ message, isDisplaying, type, name }) => {
  return (
    <StyledWrapper isDisplaying={isDisplaying} type={type}>
      {name ? (
        <>
          {" "}
          <div>
            <Title>{name || null}</Title>
            <StyledText>{message}</StyledText>
          </div>
          <CheckIcon />
        </>
      ) : (
        <>
          <StyledText big>{message}</StyledText>
          <ErrorIcon />
        </>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => ({
  message: state.notification.message,
  isDisplaying: state.notification.isDisplaying,
  type: state.notification.type,
  name: state.notification.name,
});
export default connect(mapStateToProps)(Notification);
