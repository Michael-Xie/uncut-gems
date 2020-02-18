import React from "react"
import styled from "styled-components"


const Bet = styled.article`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  font-size: 15px;
`

const Explanation = styled.span`
  width: 70%;
`


const BetName = styled.span`
  font-size: 15px;
  width: 25%;
`


const Check = styled.input`
  
`


export default function BetType({ betName, explanation, betSelected, setBet }) {
  return (
    <Bet>
      <BetName>{betName}</BetName>
      <Explanation>{explanation}</Explanation>
      <Check type="checkbox" checked={betSelected} onClick={() => setBet()} />
    </Bet>
  );
};