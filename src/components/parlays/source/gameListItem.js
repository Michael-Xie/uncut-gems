import React from 'react';

import styled from "styled-components"

import Headline from './headline'
import Bet from './bet'


const Wrapper = styled.div`
 display:flex;
 flex-direction: column;
 max-width: 600px;
 width: 100%;
`


const Bets = styled.div`
  display: flex ;
  flex-direction: column;
  justify-content: center;

  max-width: 600px;
  width: 100%;
`

export default function GameListItem({ game, setBet }) {

  if (!game.home_team || !game.away_team)
    return <div key={game.id}></div>

  return (
    <Wrapper key={game.game_id}>
      <Headline game={game} />
      <Bets>
        {game.bets.map(bet => (
          <Bet
            key={bet.betName}
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


