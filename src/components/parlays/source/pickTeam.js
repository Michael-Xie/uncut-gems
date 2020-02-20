import React from "react"
import styled from "styled-components"

export default function PickTeam({ homeTeam, awayTeam, selected }) {
  return (
    <RadioGroup horizontal key={bet.id}>
      <img src={teams.homeLogo} alt={teams.homeTeam} height="50px" width="auto" />
      <img src={teams.awayLogo} alt={teams.homeTeam} height="50px" width="auto" />
      {/* <RadioButton rootColor="#000" value="home" onChange={() => check("home", bet.id)}></RadioButton> */}
      {/* <RadioButton rootColor="#000" value="away" onChange={() => check("away", bet.id)}>away</RadioButton> */}
    </RadioGroup>
  )
}

{/* <RadioGroup horizontal key={bet.id}>
<RadioButton
  checked={getBetSelection(bet.id) === "home"}
  rootColor="#000"
  value="home"
  onChange={() => check("home", bet.id)}
>
  {" "}
  <img
    src={teams.homeLogo}
    alt={teams.homeTeam}
    height="50px"
    width="auto"
  />
</RadioButton>
<RadioButton
  checked={getBetSelection(bet.id) === "away"}
  rootColor="#000"
  value="away"
  onChange={() => check("away", bet.id)}
>
  {" "}
  <img
    src={teams.awayLogo}
    alt={teams.homeTeam}
    height="50px"
    width="auto"
  />
</RadioButton>
</RadioGroup> */}