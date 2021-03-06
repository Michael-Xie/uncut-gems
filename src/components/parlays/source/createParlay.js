import React, { useState, Fragment } from "react"
import styled from "styled-components"

import InputSlider from "../../partials/slider"
import FormSubmit from "../../partials/formSubmit"
import teamData from "../../../helpers/teamData"

import Title from './title'
import GameListItem from "./gameListItem"
import InfoBox from "./infobox"
import ParlayName from './parlayName'

const Wrapper = styled.article`
 display: flex;
 flex-direction: column;
 justify-content:center;
 margin: 0 auto;

 max-width: 600px;
`

const H2 = styled.h3`
  text-align: center;
  margin: 10px 0;
`

const NoGames = styled.div`
  margin-top: 10px;
  font-size: 1.25em;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0  auto 15px;
`

const MoreInfo = styled.button`
  margin: 0 auto;
  width: 20%;

  padding: 5px 10px;

  color: #fff;
  background-color: #000;
  
  cursor: pointer;

  &:focus {
    outline:0;
  }

  &:hover {
    color: #fff;
  }
`

const Footer = styled.footer` 
 height: 50px;
`

export default function CreateParlay({ games, onSubmit, user, dispatch }) {
  //  ------  Show InfoBox      ------  //
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);

  //  ------  Parlay Name      ------  //
  const [nameValue, setNameValue] = React.useState('');

  //  ------  SliderStuff      ------  //
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  //  ------  Choose Parlays  ------  //
  const [data, setData] = useState((games || []).map(game => {
    if (game)
      return {
        home_team: {
          ...teamData(game.home_team),
          name: game.home_team
        },
        timestamp: game.timestamp,
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
        return game.game_id === selectedGame.game_id ? { ...selectedGame } : { ...game }
      }));
    }
  }



  return (
    <Wrapper>
      <Center>
      { 
        games.length > 0 && (
          <Fragment>
            <ParlayName
              value={nameValue}
              setName={setNameValue}
            />
           
            <H2>Buy-In Amount</H2>
            <InputSlider
              value={value}
              setValue={setValue}
              handleSliderChange={handleSliderChange}
              handleInputChange={handleInputChange}
            />
          </Fragment>
        )
      }
      {
        games.length === 0 && (
          <NoGames>No Games Available</NoGames> 
        )
      }
      </Center>
      {
       data.map(game => {
          if (game)
            return (
            <GameListItem
              game={game}
              setBet={setBet}
            />
            )
          
        })
      }
      { games.length > 0 && (
          <FormSubmit
            onSubmit={onSubmit} 
            user={user} 
            data={data} 
            betName={nameValue} 
            buyIn={value} 
            dispatch={dispatch} 
            games={games}
          />
        )
      }
      <Footer></Footer>
    </Wrapper>
  );

}
