import React, {useEffect, useState} from "react"
import styled from "styled-components"
import getGames from "../req/getGames.js"

const Img = styled.img`
  height: 4vh;
  width: 2vw;
`
const Container = styled.div`
  background: rgba(0,0,0,0.56);
  display: block;
  color: #fff;
  text-shadow: 0.5px 0.75px #000;
`

const Home = styled.span`
  color: #000;
`

const Away = styled.span`
  color: #f00;
`

const gameContainer = styled.div`
  display: flex;
`

const GameView = () => {
  const [state, setState] = useState({
    live: [],
    games: [],
    date: ""
  })
  const API_HOST = "api-basketball.p.rapidapi.com"
  const API_KEY = "d8dfc5cbfdmshbb0b69d2a790b3dp1ba90ejsn8f36ab430b8b"

  useEffect(() => {
    getGames(API_KEY, API_HOST, setState, state)
    console.log(state)
  }, [])

  // grab the gameId from the URL
  const gameId = window.location.href
                       .split('/')
                       .reverse()[0]

  return (
    <div>
      <h2>Game View</h2>
      {
        state.live && (
            state.live.map(game => {
              if (game.id === Number(gameId)) {
                const home = game.teams.home.name
                const away = game.teams.away.name
                return (
                  <Container>
                    <h3>
                      <Home>{home}</Home> vs. &nbsp;
                      <Away>{away}</Away> 
                    </h3>
                    <gameContainer>
                      Score: <Home>{game.scores.home.total}</Home> - &nbsp;
                      <Away>{game.scores.away.total}</Away>
                      <br/>
                      Status: <Away>{game.status.short}</Away> &nbsp;
                    </gameContainer>
                  </Container>
                )
              }
            })
        )
      }
    </div>
  )
}

export default GameView;

