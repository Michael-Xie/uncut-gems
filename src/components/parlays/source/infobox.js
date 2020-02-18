import React from "react";
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
  width: 100%;

  background-color: #fff;
`
const Description = styled.div`
  text-align: center;
  padding: 10px 0 ;
  
  font-size: 12px;
  color: #262626;

`
const Bet = styled.div`
  display:flex;
  align-items: flex-end;
  margin: 10px 0 10px 30px;
  
`

const BetType = styled.span`
  width: 25%;
  
  color: #262626;

  font-size: 16px;
  
`

const Explanation = styled.p`
  font-size: 12px;
  
`
export default function InfoBox() {
 

  return (
    <Wrapper>
      <Description>Here is a list of the differnent bet types you can make</Description>

      <Bet>
        <BetType>Pick'em</BetType> <Explanation>Select the winner of the game</Explanation>
      </Bet>

      <Bet>
        <BetType>Total Points</BetType> <Explanation>Select the combined total of points scored this game</Explanation>
      </Bet>

      <Bet>
        <BetType>Points By Half</BetType> <Explanation>Select the combined total of points scored by half-time.</Explanation>
      </Bet>

      <Bet>
        <BetType>Race to 10</BetType> <Explanation>Select which team will score 100 points first.</Explanation>
      </Bet>


      <Bet>
        <BetType>Race to 100</BetType> <Explanation>Select which team will score 100 points first.</Explanation>
      </Bet>

    </Wrapper>
  )
}