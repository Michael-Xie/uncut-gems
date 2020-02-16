import React from "react"
import styled from "styled-components"
import axios from "axios"

import InputSlider from "../../partials/slider"
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
  display: flex;
  flex-direction: column;
`

const Bet = styled.span`
  display: flex;
  justify-content: center;
  margin-bottom: 1vh;
`

const BetName = styled.span`
  width: 25%;
  margin-right: 1vw;
`

const Explanation = styled.span`
  width: 60%;
  margin-right: 1vw;
`

const Check = styled.span`
  width: 15%;
`

const Logo = styled.img`
  display: flex;
  flex-direction: flex-end;
  width: 20%;
`
export default function Form({games}) {
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

  const handleSubmit = (bets) => {
    axios.post("http://localhost:8001/api/parlays", {
      fee: 20,
      status: 'open'
    })
    .then(() => {
      bets.map(res => {
        console.log(res)
      })
    })
  }
        
  return (
    <Wrapper>
        {
          (games || []).map(game => {
            const home_team = teamData(game.home_team)
            const away_team = teamData(game.away_team)
            selected.push(
              {game_id: game.game_id,
               bets: [
                {type: 'pickem',      selected: false},
                {type: 'points_tf',   selected: false},
                {type: 'points_th',   selected: false},
                {type: 'race_to_10',  selected: false},
                {type: 'race_to_100', selected: false}
               ]
              }
            )
            
            // ensure that the teams data is populated
            if (!home_team || !away_team)
              return <div></div>

            return (
              <Game key={game.game_id} arena={home_team.arena}>
                <Teams>
                  <HomeColor color={home_team.colors}>{game.home_team}</HomeColor> &nbsp; vs. &nbsp;
                  <AwayColor color={away_team.colors}>{game.away_team}</AwayColor>
                </Teams>
                <Bets>
                  <Bet>
                    <BetName>Pick`Em</BetName>
                    <Explanation>
                      Select the winner of the game
                    </Explanation>
                    <Check>
                      <input type="checkbox" onClick={() => addBet({type: 'pickem', game_id: game.game_id})} />
                    </Check>
                  </Bet>
                  <Bet>
                    <BetName>Total Points @ FT</BetName>
                    <Explanation>
                      Select the combined total of points scored this game.
                    </Explanation>
                    <Check>
                      <input type="checkbox" onClick={() => addBet({type: 'points_tf', game_id: game.game_id})} />
                    </Check>
                  </Bet>
                  <Bet>
                    <BetName>Total Points @ HT</BetName>
                    <Explanation>
                      Select the combined total of points scored by half-time.
                    </Explanation>
                    <Check>
                      <input type="checkbox" onClick={() => addBet({type: 'points_th', game_id: game.game_id})} />
                    </Check>
                  </Bet>
                  <Bet>
                    <BetName>Race to 10 points</BetName>
                    <Explanation>
                      Select which team will score 10 points first.
                    </Explanation>
                    <Check>
                      <input type="checkbox" onClick={() => addBet({type: 'race_to_10', game_id: game.game_id})} />
                    </Check>
                  </Bet>
                  <Bet>
                    <BetName>Race to 100</BetName>
                    <Explanation>
                      Select which team (if any) will score 100 points first.
                    </Explanation>
                    <Check>
                      <input type="checkbox" onClick={() => addBet({type: 'race_to_100', game_id: game.game_id})} />
                    </Check>
                  </Bet>
                </Bets>
              </Game>
            ) 
          })
        }
      <Button onClick={() => handleSubmit(selected)}>Submit Parlay</Button>
    </Wrapper>
  );

}
