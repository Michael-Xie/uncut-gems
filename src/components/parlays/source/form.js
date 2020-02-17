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


export default function Form({ games }) {
  const selected = []

  const addBet = (betInfo) => {

    selected.map(bet => {
      if (bet.game_id === betInfo.game_id) {
        bet.bets.map(res => {
          console.log(selected[0])
          if (res.type === betInfo.type)
            res.selected = !res.selected
        })
      }
    })
  }

  const handleSubmit = (event, bets) => {
    axios.post("http://localhost:8001/api/parlays", {
      fee: 20,
      status: 'open'
    })
      .then(res => {
        const id = res.data[0].id
        bets.map(result => {
          const game_id = result.game_id
          result.bets.forEach(bet => {
            if (bet.selected)
              axios.post("http://localhost:8001/api/bets", {
                type: bet.type,
                parlay_id: id,
                game_id: game_id
              })
          })
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
            {
              game_id: game.game_id,
              bets: [
                { type: 'pickem', selected: false },
                { type: 'points_tf', selected: false },
                { type: 'points_th', selected: false },
                { type: 'race_to_10', selected: false },
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
                  {/* <BetSelected type="submit" onClick={() => addBet({ type: 'pickem', game_id: game.game_id })}>
                    Pick'em 
                 </BetSelected> */}
                 <img alt="pickem" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEi%0D%0AIGJhc2VQcm9maWxlPSJ0aW55IiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3Jn%0D%0ALzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCSB4%0D%0APSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCA5OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+%0D%0ACjxnPgoJPGVsbGlwc2UgZmlsbD0iI0ZGRkZGRiIgY3g9IjUwIiBjeT0iNDkiIHJ4PSI0Ny41IiBy%0D%0AeT0iNDYuNSIvPgoJPHBhdGggZD0iTTUwLDRjMjUuMzYsMCw0NiwyMC4xOSw0Niw0NVM3NS4zNiw5%0D%0ANCw1MCw5NFM0LDczLjgxLDQsNDlTMjQuNjQsNCw1MCw0IE01MCwxQzIyLjk0LDEsMSwyMi40OSwx%0D%0ALDQ5czIxLjk0LDQ4LDQ5LDQ4CgkJczQ5LTIxLjQ5LDQ5LTQ4Uzc3LjA2LDEsNTAsMUw1MCwxeiIv%0D%0APgo8L2c+Cjx0ZXh0IHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMjkuMDI0NCA4MC4wMzQyKSIg%0D%0AZm9udC1mYW1pbHk9IidNeXJpYWRQcm8tUmVndWxhciciIGZvbnQtc2l6ZT0iODcuODY2OHB4Ij5Q%0D%0APC90ZXh0Pgo8L3N2Zz4K" width="12px" height="12px"/>
                </BetType>
                <Explanation> Point Perdiction </Explanation>
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
      <Button onClick={(event) => handleSubmit(event, selected)}>Submit Parlay</Button>
    </Wrapper>
  );

}
