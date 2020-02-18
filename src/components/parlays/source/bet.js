import React from "react"
import styled from "styled-components"


const Bet = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px 5px;
  font-size: 15px;
  background-color: ${props => props.betSelected ? '#9DFF89' : '#fff'};

  border-bottom: ${props => props.betSelected ? '1px solid #9DFF89' : '1px solid #DBDBDB'};
  
  cursor: pointer;

  &:focus {
    outline:0;
  }
  &:hover {
    background-color: ${props => props.betSelected ? '#9DFF89' : '#DBDBDB'};
    border-bottom: ${props => props.betSelected ? '1px solid #9DFF89' : '1px solid #DBDBDB'};
  }
`

const BetName = styled.span`
  width: 25%;

  font-weight: bold;
  font-size: 15px;
  
`

export default function BetType({ betName, explanation, betSelected, setBet }) {

  return (
    <Bet
      betSelected={betSelected}
      checked={betSelected}
      onClick={() => setBet()}
    >
      <BetName>{betName}</BetName>
      {/* <Explanation>{explanation}</Explanation>
      <Check type="checkbox" checked={betSelected} onClick={() => setBet()} /> */}
    </Bet>
  );
};
