import React, { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios"
import teamData from "../../../helpers/teamData"

import ParlaySubmit from '../../partials/parlaySubmit'
import PickTeam from './pickTeam'
import SlidePoints from './slidePoints'

const Wrapper = styled.article`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto 30px;
  box-shadow: 0 8px 6px -6px black;
  font-size: 18px;
`


const Game = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding: 10px 0;
`

const Input = styled.input`
  
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export default function FillParlay({user, parlay_id, games, allBets, onSubmit}) {
  // keep bets in state.
  const [bets, setBets] = useState([])
  const [betSelection, setBetSelection] = useState([])

  // checkboxes or sliders
  const checkboxes = ["race_to_100", "race_to_10", "pickem"]
  const sliders = ["points_tf", "points_th"]

  // format the bet names for display purposes.
  const betKeys = {
    race_to_100: "Race to 100",
    race_to_10: "Race to 10",
    pickem: "Pick`Em",
    points_tf: "Total Points",
    points_th: "Total Points by Half Time"
  }
  // grab all the bets for the parlay.
  useEffect(() => {  
    allBets.map(bet => {
      if (bet.parlay_id === parlay_id)
        return setBets(prev => [...prev, bet])
    })
  }, [parlay_id])

  const check = (team, betId, obj) => {
    if (betSelection.length === 0) {
      return setBetSelection([{ bet_id: betId, selection: team }])
    } else {
      const ids = betSelection.map(selections => {
        return selections.bet_id
      })
      if (ids.includes(betId)) {
        betSelection.map(selections => {
          if (selections.bet_id === betId) {
            // deselect the other box
            selections.selection = team
            return setBetSelection(prev => [...prev])
          }
        })
      } else {
        return setBetSelection(prev => [...prev, { bet_id: betId, selection: team }])
      }
    }
  }

  const getBetSelection = (betId) => {
    for (const selection of betSelection) {
      if (selection.bet_id === betId) return selection.selection;
    }
  }

  const updateNumber = (value, betId) => {
    const ids = betSelection.map(selections => {
      return selections.bet_id
    })
    if (ids.includes(betId))
      betSelection.map(selections => {
        if (selections.bet_id === betId) {
          selections.selection = value
          return setBetSelection(prev => [...prev])
        }
      })
    else
      return setBetSelection(prev => [...prev, { bet_id: betId, selection: value }])
  }

  const handleSubmit = () => {
    if (betSelection.length !== 4)
      alert("Must fill out entire form!")
  }

  const findTeams = (gameId) => {
    const teams = games.filter(game => game.game_id === gameId)[0]
    const homeLogo = teamData(teams.home_team).logo;
    const awayLogo = teamData(teams.away_team).logo;
    return {
      homeTeam: teams.home_team,
      awayTeam: teams.away_team,
      homeLogo: homeLogo,
      awayLogo: awayLogo
    }
  }

  return (
    <Wrapper>
      {
        bets.map(bet => {
          return (
            <Game key={bet.id}>
              {
                checkboxes.map(bType => {
                  if (bType === bet.type) {
                    const teams = findTeams(bet.game_id)
                    return (
                      <div>
                        <h3>{betKeys[bet.type]}</h3>
                        <PickTeam
                          teams={teams}
                          getBetSelection={getBetSelection}
                          bet={bet}
                          check={check}
                        />
                      </div>
                    );
                  }
                })
              }
              {
                sliders.map(bType => {
                  if (bType === bet.type) {
                    const teams = findTeams(bet.game_id)
                    return (
                      <div>
                        <h3>{betKeys[bet.type]}</h3>
                        <Input key={bet.id} type="number" onChange={(e) => updateNumber(e.target.value, bet.id)} />
                      </div>
                    )
                  }
                })
              }
            </Game>
          )
        })
      }
      <ParlaySubmit 
        parlay_id={parlay_id} 
        user={user} 
        data={betSelection} 
        expected={bets.length}
        onSubmit={onSubmit}
      >
        Submit Bet
      </ParlaySubmit>
    </Wrapper>

  );

}
