import React, {useState, useEffect} from "react"
import styled from "styled-components"

import teamData from "../../../helpers/teamData"
import getRankings from "../../../helpers/rankings"

const Article = styled.div`
  margin-top: 10px;
`

const Parlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 600px;
  border: 3px ridge #000;
`

const Games = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0,0,255,0.25);
  padding-top: 5px;
  padding-bottom: 5px;
`

const Game = styled.div`
  width: 33%;
`

const Title = styled.h3`
  display: flex;
  width: 100%;
  background-color: #999;
  border-bottom: 1px solid #000;
`

const Name = styled.span`
  padding: 5px;
  width: 50%;
  text-align: left;
`

const Prize = styled.span`
  padding: 5px;
  width: 50%;
  text-align: end;
`

const Logo = styled.img`
  width: 20%;
`

const Participants = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Participant = styled.div

export default function ActiveParlay({name, bets, user_bets, participants, entry, parlay_id, games, scores}) {
  const [rankings, setRankings] = useState([])

  const getGames = () => {
    const gamesId = []
    bets.map(bet => {
      if (!gamesId.includes(bet.game_id))
        gamesId.push(bet.game_id)
    })
    return games.filter(game => {
      if (gamesId.includes(game.game_id))
        return game
    })
  }

  const getScores = (game_id) => {
    return scores.filter(game => {
      if (game.game_id === game_id)
        return game
    })
  }

  useEffect(() => {
    // update the db to reflect winnings if it ended here.
    console.log(getRankings(participants, bets, user_bets, scores))

  }, [scores])

  return (
    <Article>
      <Parlay>
        <Title>
          <Name>Parlay Name: {name}</Name>
          <Prize> ${entry}.00 / ${participants.length * entry}.00 </Prize>
        </Title>
        <Games>
        {
          getGames().map(game => {
            const homeTeam = teamData(game.home_team)
            const awayTeam = teamData(game.away_team)
            const scores   = getScores(game.game_id)[0]
            return (
              <Game key={game.id}>
                <h3>
                  <Logo src={homeTeam.logo}/> 
                  {scores.home_total} &nbsp;
                  {scores.away_total}
                  <Logo src={awayTeam.logo} /></h3>
              </Game>
            )
          })

        }
        </Games>
        <Participants>
        {
          participants.map(participant => {
            return (
              Participant
            )
          })
        }
        </Participants>
        <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
        &nbsp;  &nbsp;
      </Parlay>
    </Article>
  );

}

