import React, { Component } from "react";
import styled from "styled-components";
import queryString from "query-string";
import loginImage from "../asstes/images/login-image.jpg";
import { connect } from "react-redux";
import Header from "../components/atoms/Header/Header";
const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  padding: 40px 80px;
  position: relative;
`;

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.white};
  width: 60%;
  height: 70%;
`;

const TextWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const StyledImage = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${loginImage});
  position: absolute;
  top: 0;
  right: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledLine = styled.div`
  width: 70%;
  height: 5px;
  background-color: ${({ theme }) => theme.secondary};
  margin-top: 40px;
`;

const StyledParagraph = styled.p`
  font-weight: 500;
  font-size: 20px;
  width: 70%;
  margin: 40px 0 0 0;
  text-align: center;
`;
const StyledHeader = styled(Header)`
  font-size: 90px;
  line-height: 1;
  font-weight: 300;
  letter-spacing: 2px;
`;

const StyledButton = styled.button`
  border: none;
  margin: 40px 0 0 0;
  padding: 10px 25px;
  font-size: 20px;
  box-shadow: 5px 5px 0 ${({ theme }) => theme.secondary};
  font-weight: 600;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.white};
    transition: all 0.5s;
    box-shadow: 5px 5px 0 ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.secondary};
  }
`;

class LoginView extends Component {
  handleLogin = () => {
    // redirect user to spotify to authenticate them
    const params = queryString.stringify({
      client_id: "51db6b55ce174150928313d0b2d56190",
      response_type: "token",
      redirect_uri: "http://localhost:3000/callback",
      scope: "user-top-read",
    });
    window.location = `https://accounts.spotify.com/authorize?${params}`;
  };
  render() {
    return (
      <StyledBackground>
        <StyledWrapper>
          <TextWrapper>
            <StyledHeader color="secondary">My</StyledHeader>
            <StyledHeader color="primary">Music</StyledHeader>
            <StyledLine />
            <StyledParagraph>
              Click the button to explore the power of music!
            </StyledParagraph>

            <StyledButton onClick={this.handleLogin}>Login</StyledButton>
          </TextWrapper>
          <StyledImage />
        </StyledWrapper>
      </StyledBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
