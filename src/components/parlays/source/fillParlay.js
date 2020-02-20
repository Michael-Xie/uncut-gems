import React, { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios"
import InputSlider from '../../partials/slider'
import ParlaySubmit from '../../partials/parlaySubmit'
import { RadioGroup, RadioButton } from 'react-radio-buttons'

import teamData from "../../../helpers/teamData"

import PickTeam from './pickTeam'

const Wrapper = styled.article`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto 30px;
  box-shadow: 0 8px 6px -6px black;
`


const Game = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding: 10px 0;
`



export default function FillParlay({ user_id, parlay_id, games, onSubmit }) {
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
    points_tf: "Total Points (FT)",
    points_th: "Total Points (HT)"
  }
  // grab all the bets for the parlay.
  useEffect(() => {
    axios.get(`http://localhost:8001/api/parlay/bet/${parlay_id}`)
      .then(res => setBets(prev => [...res.data]))
      .catch(err => console.log(err))
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
  console.log(betSelection)

  return (
    <Wrapper>
      {
        bets.map(bet => {

          return (
            <Game key={bet.id}>
              <h3>{betKeys[bet.type]}</h3>
              {
                checkboxes.map(bType => {
                  if (bType === bet.type) {
                    const teams = findTeams(bet.game_id)
                    return (
                      <PickTeam
                        teams={teams}
                        getBetSelection={getBetSelection}
                        bet={bet}
                        check={check}
                      />
                    );
                  }
                })
              }
              {
                sliders.map(bType => {
                  if (bType === bet.type)
                    return (
                      <input key={bet.id} type="number" onChange={(e) => updateNumber(e.target.value, bet.id)} />
                    )
                })
              }
            </Game>
          )
        })
      }
      <ParlaySubmit
        parlay_id={parlay_id}
        user_id={user_id}
        data={betSelection}
        expected={bets.length}
        onSubmit={onSubmit}
      >
        Submit Bet
      </ParlaySubmit>
    </Wrapper>

  );

}
