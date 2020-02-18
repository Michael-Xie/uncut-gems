import React from 'react';

import styled from "styled-components"

import Headline from './headline'
import Bet from './bet'

import betTypes from '../../../helpers/betTypes'





const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  margin: 2vh;
  border: 2px ridge #000;
  
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
      {/* <Headline
        game={game}
      /> */}
      <Teams>
        <HomeColor color={game.home_team.colors}>{game.home_team.name}</HomeColor> &nbsp; vs. &nbsp;
        <AwayColor color={game.away_team.colors}>{game.away_team.name}</AwayColor>
      </Teams>
      <Bets>
      {
        betTypes.map(bet =>
          <Bet
            betName={bet.betName}
            explanation={bet.explanation}
            betType={bet.betType}
            setBet={setBet}
            game={game}
          />
        )
      }
       </Bets>

      {/*
        <Bet>
          <BetName>Pick`Em</BetName>
          <Explanation>
            Select the winner of the game
         </Explanation>
          <Check type="checkbox" onClick={() => setBet({ type: "pickem", selected: game.bets[0].selected }, game.game_id)} />
        </Bet>

        <Bet>
          <BetName>Total Points</BetName>
          <Explanation>
            Select the combined total of points scored this game.
         </Explanation>
          <Check type="checkbox" onClick={() => setBet({ type: 'points_tf', selected: game.bets[1].selected }, game.game_id)} />
        </Bet>

        <Bet>
          <BetName>Points By Half</BetName>
          <Explanation>
            Select the combined total of points scored by half-time.
         </Explanation>
          <Check type="checkbox" onClick={() => setBet({ type: 'points_th', selected: game.bets[2].selected }, game.game_id)} />
        </Bet>

        <Bet>
          <BetName>Race to 10 </BetName>
          <Explanation>
            Select which team will score 10 points first.
         </Explanation>
          <Check type="checkbox" onClick={() => setBet({ type: 'race_to_10', selected: game.bets[3].selected }, game.game_id)} />
        </Bet>

        <Bet>
          <BetName>Race to 100</BetName>
          <Explanation>
            Select which team will score 100 points first.
         </Explanation>
          <Check type="checkbox" onClick={() => setBet({ type: 'race_to_100', selected: game.bets[4].selected }, game.game_id)} />
        </Bet>
      */}
    </Wrapper>
  )

};


