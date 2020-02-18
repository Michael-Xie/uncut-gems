import React from "react"
import styled from "styled-components"
import axios from "axios"

import InputSlider from "../../partials/slider"
import TransitionsModal from "../../partials/popup"
import teamData from "../../../helpers/teamData"

import GameListItem from "./gameListItem"

const Wrapper = styled.article`
  width: 600px;
  background-color: #fff;
  margin: 0 auto 30px;
  box-shadow: 0 8px 6px -6px black;
`






export default function Form({ games, onSubmit }) {


  const [data, setData] = React.useState((games || []).map(game => {
    return {
      home_team: {
        ...teamData(game.home_team),
        name: game.home_team
      },
      away_team: {
        ...teamData(game.away_team),
        name: game.away_team
      },
      game_id: game.game_id,
      bets: [
        { type: 'pickem', selected: false },
        { type: 'points_tf', selected: false },
        { type: 'points_th', selected: false },
        { type: 'race_to_10', selected: false },
        { type: 'race_to_100', selected: false }
      ]
    }
  }))

  const setBet = (replace, gameId) => {
    const newData = []
    for (let game in data) {
      if (data[game].game_id === gameId) {
        data[game].bets.map(bet => {
          if (bet.type === replace.type) {
            replace.selected = !replace.selected
            newData.push(replace)
          } else {
            newData.push(bet)
          }
        })
      }
    }
    
    setData(data.map(game => {
      if (game.game_id !== gameId) {
        return game
      } else {
        return { ...game, bets: newData }
      }
    })); 
  }

  return (
    <Wrapper>
      {console.log(data)}
      {
        
        data.map(game =>
          <GameListItem
            game={game}
            setBet={setBet}
          />
        )
      }
    </Wrapper>
  );

}
