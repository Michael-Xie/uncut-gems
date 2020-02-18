import React, {useState} from "react"
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

export default function Form({ games, onSubmit, user }) {
  const [data, setData] = useState((games || []).map(game => {
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
        {
          type: "pickem",
          betName: 'Pickem',
          explanation: 'Select the winner of the game',
          selected: false,
        },
        {
          type: "points_tf",
          betName: 'Total Points',
          explanation: 'Select the combined total of points scored this game.',
          selected: false,
        },
        {
          type: "points_th",
          betName: 'Points By Half',
          explanation: 'Select the combined total of points scored by half-time.',
          selected: false,
        },
        {
          betName: 'Race to 10',
          explanation: 'Select which team will score 10 points first.',
          type: "race_to_10",
          selected: false,
        },
        {
          betName: 'Race to 100',
          explanation: 'Select which team will score 100 points first.',
          type: "race_to_100",
          selected: false,
        }
      ]
    };
  }))

  const setBet = (betType, gameId) => () => {
    const selectedGame = data.filter(game => game.game_id === gameId)[0];

    if (selectedGame) {
        selectedGame.bets = selectedGame.bets.reduce((acc, bet) => {
          acc.push({
            ...bet,
            selected: bet.type === betType ? !bet.selected : bet.selected
          });
          return acc;
        }, []);

      setData(data.map(game => {
        return game.game_id === selectedGame.game_id ? {...selectedGame} : {...game}
      }));
    }
  }

  return (
    <Wrapper>
      {
        data.map(game =>
          <GameListItem
            game={game}
            setBet={setBet}
          />
        )
      }
      <TransitionsModal onSubmit={onSubmit} user={user} data={data}/>
    </Wrapper>
  );

}

