import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 50px;
  max-width: 200px;
  width:100%;
  
`

const Label = styled.label`
  margin: auto 15px;
`

const Logo = styled.img`
  height: 100%;
  
  opacity:0.6;

  cursor: pointer;
`


export default function PickTeam({ getBetSelection, bet, check, teams }) {
  return (
    <Wrapper>
     
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
    
    </Wrapper>
  )
}

