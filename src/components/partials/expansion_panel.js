import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components'

import Game from '../games/game'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const GamesSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

`

const GameView = styled.div`
  width: 100%;
`

const BetsSummary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const BetContain = styled.div`
  width: 100%;
`

const Type = styled.div`
  display: flex;
  justify-content: space-around;
  align-items:center;
  height: 60px;
  background-color: #F4F4F2;
  /* background-image: url("https://www.transparenttextures.com/patterns/blizzard.png"); */
  color: #000;

`

const BetType = styled.h5`
  display: flex;
  justify-content: center;
  align-items: center;
`

// const Away = styled.div`
//   display: flex;
//   justify-content: flex-end;

// `

// const Home = styled.div`
//   display: flex;
//   justify-content: flex-start;
 
// `

const Logo = styled.img`

`

// UserBets, Name, Selection, Current
const UserBets = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -5px;
  align-items: center;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1.15em;
  /* background-image: url("https://www.transparenttextures.com/patterns/bright-squares.png"); */
  background-color: ${props => props.background};
  color: ${props => props.color};
  font-weight: extra-bold;
`

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
`

const Selection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
`

const Current = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
`

const Rankings = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #000;
  background-image: url("https://www.transparenttextures.com/patterns/blizzard.png");
  color: #fff;
`

const Placement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
`

const UserImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  border: 1px solid #000;
  border-radius: 50%;
  width: 20%;
`

const Player = styled.div`
  font-weight: bold;
`

const Rank = styled.span`
  font-weight: bold;
  color: ${props => props.color};
  text-shadow: 0.75px 0.75px #000;
`

const Points = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`

const Participants = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px 0px 10px 10px;
`

const ParticipantStats = styled.span`
  display: flex;
  width: 100%;
`

const Div = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
`

export default function Expansion({games, bets, scores, rankings, teamData, user_bets, user, parlay_id, participants}) {
  const classes = useStyles()

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

  const getGSB = (parlay_id, limit) => {
    const result = []
    let places = 0
    Object.keys(rankings).map(parlay => {
      if (parlay_id === parseInt(parlay, 10)) {
        Object.keys(rankings[parlay]).map(place => {
          rankings[parlay][place].map(player => {
            if (limit)       places++;
            if (places <= 3) result.push([place, player])
          })
        })
      }
    })
    return result
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b>Games</b> ({getGames().length})</Typography>
        </ExpansionPanelSummary>
        <GamesSummary>
        {
          getGames().map(game => {
            const score = scores.filter(score => score.game_id === game.game_id)[0]
            return (
              <GameView>
                <Game game={game} score={score} key={game.id} />
              </GameView>
            )
          })
        }
        </GamesSummary>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><b>Bets</b> ({bets.length})</Typography>
        </ExpansionPanelSummary>
        <BetsSummary>
        {
          bets.map(bet => {
            const game       = games.filter(game => game.game_id === bet.game_id)[0]

            const home_data  = teamData(game.home_team)
            const away_data  = teamData(game.away_team)
            const home_short = game.home_team.split(' ').reverse()[0]
            const away_short = game.away_team.split(' ').reverse()[0]
            const score      = getScores(bet.game_id)[0]

            const getResult  = (type) => {
              if (type === 'pickem') {
                if      (score.home_total > score.away_total) return game.home_team.split(' ').reverse()[0]
                else if (score.home_total < score.away_total) return game.away_team.split(' ').reverse()[0]
                else                                          return 'none'
              }
              if (type === 'points_th') {
                const home_score = score.home_first + score.home_second
                const away_score = score.away_first + score.away_second
                return home_score + away_score
              }
              if (type === 'points_tf') {
                const home_score = score.home_total
                const away_score = score.away_total
                return home_score + away_score
              }
              return null
            }

            const convertBet = {
              'pickem': 'Pick`Em',
              'points_tf': 'Total Points (FT)',
              'points_th': 'Total Points (HT)'
            }

            return (
              <BetContain key={bet.id}>
                <Type>
                  <Logo src={away_data.logo} height="45px" width="45px"/>
                    <BetType>{convertBet[bet.type]}</BetType>
                  <Logo src={home_data.logo} height="45px" width="45px"/>
                </Type>
              {
                user_bets.map(user_bet => {
                  if (user_bet.bet_id === bet.id) {
                    let background = '#E23636'
                    let color = '#000'
                    let difference;
                    const convertTeam = {
                      'home': game.home_team.split(' ').reverse()[0],
                      'away': game.away_team.split(' ').reverse()[0]
                    }
                    const result = getResult(bet.type)
                    if (bet.type === 'pickem' &&
                        result   === convertTeam[user_bet.selection]) {
                      background = '#9DFF89'
                    } else {
                      difference = result - user_bet.selection
                      if (Math.abs(difference) <= 10) background = '#9DFF89'
                      else                            color      = '#fff'
                    }
                    return (
                      <UserBets color={color} background={background} key={user_bet.user_name}>
                        <Name>{user_bet.user_id}</Name> 
                        <Selection>{user_bet.selection}</Selection>
                        <Current>
                          {getResult(bet.type)} 
                          {bet.type !== 'pickem' && <span>&nbsp;({difference})</span>}
                        </Current>
                      </UserBets>
                    )
                  }
                })
              }
              </BetContain>
            )
          })
        }
        </BetsSummary>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}><b>Participants</b> ({participants.length})</Typography>
        </ExpansionPanelSummary>
        <Participants>
          <ParticipantStats>
            <Div><b>Name</b></Div>
            <Div><b>Total Points</b></Div>
            <Div><b>Payout</b></Div>
            <Div><b>Rank</b></Div>
          </ParticipantStats>
        {
          getGSB(parlay_id, false).map(result => {
            const player = Object.keys(result[1])[0]
            return (
              <ParticipantStats>
                <Div>{player}</Div>
                <Div>{result[1][player][0]} </Div>
                <Div>{result[1][player][1]} </Div>
                <Div>{result[0]}</Div>
              </ParticipantStats>
            )
          })
        }
        </Participants>
      {
      }
      </ExpansionPanel>
      <Rankings>
      {
        getGSB(parlay_id, true).map(result => {
          const player = Object.keys(result[1])[0]
          const getAbbrev = (place) => {
            if      (place === '1') return [place + 'st', '#FFD700']
            else if (place === '2') return [place + 'nd', '#C0C0C0']
            else if (place === '3') return [place + 'rd', '#CD7F32']
          }
          return (
            <Placement>
              <UserImg color={getAbbrev(result[0])[1]} src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' />
              <Player>{player}</Player>
              <Div>
                <Rank color={getAbbrev(result[0])[1]}>{getAbbrev(result[0])[0]}</Rank>&nbsp;/&nbsp;
                <Points>{result[1][player][0]}&nbsp;pts</Points>
              </Div>
            </Placement>
          )
        })
      }
      </Rankings>
    </div>
  );
}
