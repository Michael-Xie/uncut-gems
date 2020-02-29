import React, { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios"
import teamData from "../../../helpers/teamData"
import InputSlider from "../../partials/slider"

import ParlaySubmit from '../../partials/parlaySubmit'
import PickTeam from './pickTeam'
import SlidePoints from './slidePoints'

const Wrapper = styled.article`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  margin: 10px auto 30px;
  box-shadow: 0 8px 6px -6px black;
  font-size: 18px;
`
const AllBets = styled.div` 

`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 20px;
`
const FillInfo = styled.h4`
  text-align: center;
`

const Game = styled.div`
  padding: 10px 0;
`

const InputLogo = styled.div` 
  display: flex;
  align-items: center;
`

const Input = styled.input`
  padding: 12px 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100px;
  margin: 0 5px;
`



const Choose = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;

  max-width: 600px;
  width: 100%;
`

const Logos = styled.img` 
  max-width: 30px;
  width: 100%;
`

const BetType = styled.div`
  max-width: 100px;
  width: 100%;
  font-size:16px;
`

const Buttons = styled.div` 
  margin-top: 10px;
  margin-bottom: 10px;
  display:flex;
  justify-content: center;
`

export default function FillParlay({ user, users, cancelled, parlay_id, parlay_name, parlay_fee, parlay_admin, games, allBets, onSubmit, participants }) {



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
    points_th: "Total Points by Half"
  }
  // grab all the bets for the parlay.
  useEffect(() => {
    allBets.map(bet => {
      if (bet.parlay_id === parlay_id)
        return setBets(prev => [...prev, bet])
    })
  }, [parlay_id])

  const check = (team, betId) => {
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
      <Header>
        <h1>{parlay_name}</h1>
        <div></div>

        <div><img src="https://i.imgur.com/NhP56Q2.png" alt="gem-icon" height="15px" width="15px" />{parlay_fee}</div>

      </Header>
      <FillInfo>Fill out parlay</FillInfo>
      <AllBets>
        {
          bets.map(bet => {
            const teams = findTeams(bet.game_id)
            return (
              <Game key={bet.id}>
                {
                  checkboxes.map(bType => {
                    if (bType === bet.type) {

                      return (
                        <Choose>
                          <BetType>{betKeys[bet.type]}</BetType>
                          <PickTeam
                            teams={teams}
                            getBetSelection={getBetSelection}
                            bet={bet}
                            check={check}
                          />
                          <div></div>
                        </Choose>
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

                          <Choose>

                            <BetType>{betKeys[bet.type]}</BetType>
                            <InputLogo>
                              <Logos src={teams.homeLogo} alt={teams.homeTeam} />
                              <Input key={bet.id} type="number" onChange={(e) => updateNumber(e.target.value, bet.id)} placeholder="Enter total" />
                              <Logos src={teams.awayLogo} alt={teams.awayTeam} />
                            </InputLogo>
                          </Choose>
                        </div>
                      )
                    }
                  })
                }

              </Game>

            )

          })

        }
      </AllBets>
      <Buttons>
        <ParlaySubmit
          parlay_fee={parlay_fee}
          parlay_id={parlay_id}
          user={user}
          users={users}
          cancelled={cancelled}
          data={betSelection}
          expected={bets.length}
          onSubmit={onSubmit}
          participants={participants}
        >
          Submit Bet
      </ParlaySubmit>
      </Buttons>
    </Wrapper>

  );

}
