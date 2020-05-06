import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTimeRange } from "../../../redux/actions";
import arrowDown from "../../../asstes/icons/arrowDown.svg";

const StyledSelect = styled.select`
  padding: 5px 30px;
  padding-right: 35px;
  border: none;
  height: 70%;
  font-size: 2rem;
  background-image: url(${arrowDown}),
    ${({ theme }) => `linear-gradient(${theme.primary},${theme.primary})`};
  background-position: top 50% right 10px, 0 0;
  background-size: 30px, 100%;
  background-repeat: no-repeat;
  appearance: none;
  font-weight: 700;
  text-align: center;
  border-radius: 30px;
  margin: 0 auto;
  color: white;
  display: none;
  cursor: pointer;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  @media (max-width: 500px) {
    display: inline-block;
  }
  &:active + svg {
    transform: rotate(90deg);
  }
`;
const StyledOption = styled.option`
  color: black;

  font-size: 2rem;
  &:checked {
    color: white;
    font-size: 1.5rem;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const DropDownMenu = ({ setTimeRange }) => {
  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };
  return (
    <StyledSelect onChange={handleChange}>
      <StyledOption value="All time">All time</StyledOption>
      <StyledOption value="Last 6 months">Last 6 months</StyledOption>
      <StyledOption value="Last month">Last month</StyledOption>
    </StyledSelect>
  );
};

const mapDispatchToProps = {
  setTimeRange,
};

export default connect(null, mapDispatchToProps)(DropDownMenu);
