import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"

import InputSlider from "../../partials/slider"
import TransitionsModal from "../../partials/popup"
import teamData from "../../../helpers/teamData"

import GameListItem from "./gameListItem"
import InfoBox from "./infobox"
import ParlayName from './parlayName'

const Wrapper = styled.article`
 display: flex;
 flex-direction: column;
 justify-content:center;

 margin: 0 auto;
`

const Title = styled.h1`
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 15px 20px;
  margin: 20px auto;
  
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
`
const H2 = styled.h3`
  text-align: center;
  margin: 10px 0;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
        return game.game_id === selectedGame.game_id ? { ...selectedGame } : { ...game }
      }));
    }
  }



  return (
    <Wrapper>

      <Title>Create a Parlay</Title>

      {/* <MoreInfo onClick={() => setInfoBoxVisible(!infoBoxVisible)}>More Info</MoreInfo> */}

      {/* {infoBoxVisible && (<InfoBox />)} */}

      <Center>
       
        <H2>Parlay Name</H2>
        <ParlayName
          value={nameValue}
          setName={setNameValue}
        />
       
        <H2>Buy-In amount</H2>
        <InputSlider
          value={value}
          setValue={setValue}
          handleSliderChange={handleSliderChange}
          handleInputChange={handleInputChange}
        />

      </Center>
      <H2>Select Your Bets</H2>
      {
        data.map(game =>
          <GameListItem
            game={game}
            setBet={setBet}
          />
        )
      }

      <TransitionsModal onSubmit={onSubmit} user={user} data={data} betName={nameValue} buyIn={value} dispatch={dispatch} />

    </Wrapper>
  );

}
