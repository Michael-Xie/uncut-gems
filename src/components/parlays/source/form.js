import React from "react"
import {Redirect} from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import InputSlider from "../../partials/slider"
import TransitionsModal from "../../partials/popup"
import teamData from "../../../helpers/teamData"

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
  margin: 2vh;
  border: 2px ridge #000;
  border-right-radius: 10%;
`
const Button = styled.button`
  display:flex;
  justify-content: center;
  padding: 10px;
`

const ParlayCode = styled.div`

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

  margin: 5px 0 5px;

`

const Bet = styled.button`
  display: flex;
  margin: 5px 5px;
  display:flex;
  align-items: center;
  background-color: transparent;
  border: 2px solid black;
  padding: 10px 13px;
  font-size: 15px;

  cursor:pointer;

  &:hover {
    color: #ffffff !important;
    background: #224370;
    border-color: #224370 !important;
    transition: all 0.4s ease 0s;
  }
`

const BetSelected = styled.button`
  display: flex;
  margin: 5px 5px;
  display:flex;
  align-items: center;
  color: #ffffff;
  background-color: transparent;
  border: 2px solid #007F00;
  padding: 10px 13px;
  font-size: 15px;
  background-color: #007F00;

  cursor:pointer;

  &:hover {
    color: #ffffff !important;
    background: #224370;
    border-color: #224370 !important;
    transition: all 0.4s ease 0s;
  }
`

const Explanation = styled.span`
  margin: 10px 0 0;
  text-align:center;
`

const BetType = styled.div`
  display: flex;
  justify-content:center;
  
`

const BubbleLetter = styled.span`

`

const ButtonContent = styled.span`
`
export default function Form({ games, onSubmit }) {
  const selected = []

  const addBet = (betInfo) => {
    selected.map(bet => {
      if (bet.game_id === betInfo.game_id) {
        bet.bets.map(res => {
          if (res.type === betInfo.type)
            res.selected = !res.selected
        })
      }
    })
  }

  return (
    <Wrapper>
      {
        (games || []).map(game => {
          const home_team = teamData(game.home_team)
          const away_team = teamData(game.away_team)
          selected.push(
            {
              game_id: game.game_id,
              bets: [
                { type: 'pickem',      selected: false },
                { type: 'points_tf',   selected: false },
                { type: 'points_th',   selected: false },
                { type: 'race_to_10',  selected: false },
                { type: 'race_to_100', selected: false }
              ]
            }
          )

          // ensure that the teams data is populated
          if (!home_team || !away_team)
            return <div key={game.id}></div>

          return (
            <Game key={game.game_id} arena={home_team.arena}>
              <Teams>
                <HomeColor color={home_team.colors}>{game.home_team}</HomeColor> &nbsp; vs. &nbsp;
                  <AwayColor color={away_team.colors}>{game.away_team}</AwayColor>
              </Teams>
              <Bets>
                <Explanation> Pick a team </Explanation>
                <BetType>
                  <Bet type="submit" onClick={() => addBet({ type: 'pickem', game_id: game.game_id })}>
                    Pick'em
                  </Bet>
                </BetType>
                <Explanation> Point Prediction </Explanation>
                <BetType>
                  <Bet type="submit" onClick={() => addBet({ type: 'points_tf', game_id: game.game_id })}>
                    Total Point
                  </Bet>
                  <Bet type="submit" onClick={() => addBet({ type: 'points_th', game_id: game.game_id })} >
                    Half Time Points
                  </Bet>
                </BetType>
                <Explanation> Race </Explanation>
                <BetType>
                  <Bet type="submit" onClick={() => addBet({ type: 'race_to_10', game_id: game.game_id })}>
                    10 Points
                  </Bet>
                  <Bet type="submit" onClick={() => addBet({ type: 'race_to_100', game_id: game.game_id })}>
                    100 Points
                </Bet>
                </BetType>
              </Bets>
            </Game>
          )
        })
      }
      <TransitionsModal data={selected} onSubmit={onSubmit}>Submit Parlay</TransitionsModal>
    </Wrapper>
  );

}
