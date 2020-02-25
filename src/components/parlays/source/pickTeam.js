import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;

  height: 50px;
  max-width: 120px;
  width:100%;
`

const Label = styled.label`
`

const Logo = styled.img`
  width: 100%;
  max-width: 50px;

  margin: 0 10px;
  opacity:0.6;

  cursor: pointer;
`


export default function PickTeam({ getBetSelection, bet, check, teams }) {
  return (
    <Wrapper>
     <div>
      <Label>
        <input
          type="radio"
          checked={getBetSelection(bet.id) === "home"}
          value="home"
          onChange={() => check("home", bet.id)}
        />

        <Logo
          src={teams.homeLogo}
          alt={teams.homeTeam}
        />
      </Label>
      </div>
     <div>
      <Label>
        <input
          type="radio"
          checked={getBetSelection(bet.id) === "away"}
          value="away"
          onChange={() => check("away", bet.id)}
        />

        <Logo
          src={teams.awayLogo}
          alt={teams.awayTeam}
        />
      </Label>
      </div>
    </Wrapper>
  )
}

