import React from "react";
import styled from "styled-components"

import InputSlider from '../../partials/slider'

const Wrapper = styled.article`
  width: 600px;
  background-color: #fff;
  margin: 0 auto 30px;
  box-shadow: 0 8px 6px -6px black;
`

const Pickem = styled.div`
`
const Game = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding: 10px 0;
`
const Button = styled.button`
  display:flex;
  justify-content: center;
  padding: 10px;
`

const ParlayCode = styled.div`
`

export default function FillParlay({user_id, parlay_id}) {
  return (
    <Wrapper>
      <Game>
        <h1>Toronto vs Lakers</h1>
        <h3>Pickem</h3>
        <Pickem>
          Toronto Logo
          LA Logo
        </Pickem>
        <h3>Total Points</h3>
        <InputSlider />
      </Game>
      <Button>Submit Bet</Button>
    </Wrapper>

  );

}
