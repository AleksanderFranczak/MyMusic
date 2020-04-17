import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../atoms/Header/Header";
import NoImage from "../../../asstes/images/profile_pic.png";
import { useHistory } from "react-router-dom";
const StyledWrapper = styled.div`
  display: flex;
  h1 {
    font-weight: 700;
    letter-spacing: 0.2rem;
    font-size: 2.5rem;
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

const TextWrapper = styled.div``;
const UserData = (props) => {
  let history = useHistory();
  const [name, setName] = useState("user");
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
        // console.log(res.data);

        setName(res.data.display_name);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <StyledWrapper>
      <StyledImage src={image} />
      <TextWrapper>
        <Header color="secondary">{name}</Header>
        <p onClick={handleLogout}>Logout</p>
      </TextWrapper>
    </StyledWrapper>
  );
};

export default UserData;
