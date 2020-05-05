import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../atoms/Header/Header";
import NoImage from "../../../asstes/images/profile_pic.png";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setUserData } from "../../../redux/actions";
const StyledWrapper = styled.div`
  display: flex;
  h1 {
    font-weight: 700;
    letter-spacing: 0.2rem;
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
  }
  p {
    margin-top: 5px;
    font-size: 1.5rem;
    border-bottom: 1px solid white;
    max-width: min-content;
    padding: 1px;
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
`;

const TextWrapper = styled.div`
  p {
    border-bottom: 1px solid ${({ theme }) => theme.grey};
  }
`;
const UserData = ({ userData, setUserData }) => {
  let history = useHistory();

  const [image, setImage] = useState(NoImage);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data.images.length > 1) {
          setImage(res.data.images[0].url);
        }
        setUserData(res.data.display_name, res.data.id);
      })
      .catch((err) => console.log(err));
  }, [setUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <StyledWrapper>
      <StyledImage src={image} />
      <TextWrapper>
        <Header color="secondary">{userData.name}</Header>
        <p onClick={handleLogout}>Logout</p>
      </TextWrapper>
    </StyledWrapper>
  );
};
const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  setUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserData);
