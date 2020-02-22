import React, {useState, useEffect} from "react"
import styled from "styled-components"

import teamData from "../../../helpers/teamData"
import getRankings from "../../../helpers/rankings"

import axios from "axios"

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
  align-content: center;
  width: 100%;
`

const Participant = styled.div`
  width: 33%;
`

const ParticipantInfo = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const PlayerImage = styled.img`
  background-color: ${props => props.color};
  border-radius: 50%;
`

export default function ActiveParlay({
  name, bets, user_bets, participants, entry, 
  parlay_id, games, scores, parlays, users
  }) {

  const [userScores, setUserScores] = useState({})
  const [rankings, setRankings] = useState({})

  const paymentScheme = () => {
    const split = splitPot()
    if (participants.length <= 5) {
      // one places unless tie.
      return [100 / split[1]]
    } else if (participants.length <= 10) {
      if      (split[1] > 1)   return [100 / split[1]]
      else if (split[2] > 1)   return [80, 20 / split[2]]
      else                     return [80, 20]
    } else {
      if      (split[1] === 3) return [33]
      else if (split[1] === 2 &&
               split[2] === 1) return [35, 30]
      else if (split[1] === 2 &&
               split[2] > 1)   return [35, 30 / split[2]]
      else if (split[1] === 1 &&
               split[2] === 2) return [70, 15]
      else if (split[1] === 1 &&
               split[2] > 2)   return [70, 30 / split[2]]
      else if (split[1] === 1 &&
               split[2] === 1) return [70, 20, 10 / split[3]]
      else                     return [70, 20, 10]
    }
  }

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

  const splitPot = () => {
    const result = {}
    for (let index in rankings) {
      const key = Object.values(rankings[index])
      if (result[key]) result[key]++;
      else             result[key] = 1
    }
    return result
  }

  useEffect(() => {
    // update the rankings
    const ranked = getRankings(participants, bets, user_bets, scores)

    Object.keys(ranked).map(participant => {
      userScores[participant] = ranked[participant]
      return setUserScores(() => ({...userScores}))
    })

    setRankings([]) // reset the rankings.
    const orderScores = [...Object.keys(userScores).sort((a,b) => userScores[b] - userScores[a])]
    orderScores.forEach(ranking => {
      const userRank = {[ranking]: orderScores.indexOf(ranking) + 1}
      return setRankings(prev => [...prev, userRank])
    })

    const checkTie = (rankings) => {
      for (let i = 0; i < rankings.length - 1; i++) {
        const user1  = Object.keys(rankings[i]    )[0]
        const user2  = Object.keys(rankings[i + 1])[0]
        if (userScores[user1] - userScores[user2] === 0) {
          rankings[i + 1][user2] = rankings[i][user1]
          setRankings(() => [...rankings])
        }
      }
    }

    checkTie(rankings)

    // check if parlay is still valid.
    // if not, distribute winnings.
    parlays.map(parlay => {
      let bets_live = 0
      if (parlay.id === parlay_id) {
        bets.map(bets => {
          games.map(game => {
            if (game.game_id === bets.game_id &&
               (game.status === 'FT' || game.status === 'AOT')) {
              bets_live++;
            }
          })  
        })
        if (bets_live === bets.length) {
          // change the status of the parlay to closed.
          axios.put(`http://localhost:8001/api/parlays/set_active/:id`, {
            current_status: 'close'
          })
          .catch(err => console.log(err))
          // update the user wallets with winnings.
          const winnings = paymentScheme()
          users.map(user => {
            const place    = rankings.indexOf(user.user_name) + 1
            if (participants.includes(user.user_name))
              axios.put(`http://localhost:8001/api/users/update/${user.user_name}`, {
                wallet_amount: parseInt(winnings[place - 1] * 100, 10)
              })
              .catch(err => console.log(err))
          })
        }
      }
    })
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
          rankings.length > 0 && (
            rankings.map(object => {
              const participant = Object.keys(object)[0]
              const place       = object[participant]
              const winnings    = paymentScheme()
              const background  = {1: '#FFD700', 2: '#C0C0C0', 3: '#cd7f32'}[place] || '#fff'
              return (
                <Participant key={participant}>
                  <ParticipantInfo>
                    <PlayerImage 
                      color={background}
                      src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png'                      alt='#' 
                      height="30px" 
                      width="30px" 
                    />
                    <div>{participant}</div>
                    <div>Points: {userScores[participant]}</div>
                    <div>Ranked: {place}</div>
                    <div>Pot: $
                      {parseInt(winnings[place - 1] / 100 * participants.length * entry, 10) || 0}
                        .00
                    </div>
                  </ParticipantInfo>
                </Participant>
              )
            })
          )
        }
        </Participants>
      </Parlay>
    </Article>
  );

}

