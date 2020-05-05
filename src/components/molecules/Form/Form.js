import React, { useState } from "react";
import styled from "styled-components";
import SmallNavBar from "../../atoms/SmallNavBar/SmallNavBar";
import { connect } from "react-redux";
import { createPlayList, clearRecommendations } from "../../../redux/actions";
import Button from "../../atoms/Button/Button";
const StyledLabel = styled.label`
  position: absolute;
  opacity: 0.8;
  bottom: 20px;
  left: 10px;
  width: 100%;
  transition: all 0.3s;
  color: rgba(0, 0, 0, 0.8);
  font-size: 2rem;
  line-height: 100%;
`;
const FormWrapper = styled.div`
  position: relative;
  padding-top: 30px;
`;

const StyledForm = styled.input`
  padding: 10px 20px;
  font-size: 2rem;
  width: 500px;
  border: none;
  letter-spacing: 3px;

  border-bottom: 5px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.white};
  appearance: none;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);

  &:focus + label {
    font-size: 1.2rem;
    color: black;
    transform: translateY(-40px);
  }
  &:valid + label {
    display: none;
  }
`;

const Form = ({ uris, createPlayList, clearRecommendations }) => {
  const [name, setName] = useState("");

  const handleChange = (el) => {
    setName(el.target.value);
  };

  return (
    <form>
      <FormWrapper>
        <StyledForm
          type="text"
          id="playlist"
          value={name}
          onChange={handleChange}
          required
        />
        <StyledLabel htmlFor="playlist">Enter playlist name </StyledLabel>
      </FormWrapper>
      <SmallNavBar>
        <li onClick={() => createPlayList(uris, name)}>
          <Button>save playlist</Button>
        </li>
        <li>
          <Button onClick={() => clearRecommendations()}>clear</Button>
        </li>
      </SmallNavBar>
    </form>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  createPlayList,
  clearRecommendations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
