import React from 'react';

import styled from "styled-components"

import Headline from './headline'
import Bet from './bet'


const Wrapper = styled.div`
 display:flex;
 flex-direction: column;
 max-width: 600px;
 width: 100%;
 border: 1px solid black;
`

const Teams = styled.h3`
  display: flex;
  justify-content: center;
  background-color: #000;
  color: #fff;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
`

const HomeColor = styled.span`
  width: 45%;
  color: rgba(${props => props.color});
  text-shadow: 0.5px 0.5px #fff;
  text-align: center;
`

const AwayColor = styled.span`
  width: 45%;
  color: rgba(${props => props.color});
  text-shadow: 0.5px 0.5px #fff;
  text-align: center;
`

const Bets = styled.div`
  display: flex ;
  flex-direction: column;
  justify-content: center;


`

export default function GameListItem({ game, setBet }) {

  if (!game.home_team || !game.away_team)
    return <div key={game.id}></div>

  return (
    <Wrapper key={game.game_id} arena={game.home_team.arena}>
      {/* <Teams>
        <HomeColor color={game.home_team.colors}>
          {game.home_team.name}
        </HomeColor>{" "}
        &nbsp; vs. &nbsp;
        <AwayColor color={game.away_team.colors}>
          {game.away_team.name}
        </AwayColor>
      </Teams> */}
      <Headline />
      <Bets>
        {game.bets.map(bet => (
          <Bet
            betName={bet.betName}
            explanation={bet.explanation}
            betType={bet.betType}
            betSelected={bet.selected}
            setBet={setBet(bet.type, game.game_id)}
          />
        ))}
      </Bets>
    </Wrapper>
  );

};


