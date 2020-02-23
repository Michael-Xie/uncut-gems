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
  display-flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
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
  background-color: #444;
  color: #fff;
  text-align: center;
`

const BetType = styled.h3`
  display: flex;
  width: 33%;
  justify-content: center;
  align-items: center;
`

const Away = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 33%;
`

const Home = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 33%;
`

const Logo = styled.img`
  width: 30%;
`

// UserBets, Name, Selection, Current
const UserBets = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${props => props.background};
  color: ${props => props.color};
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


export default function Expansion({games, bets, scores, rankings, teamData, userScores, user_bets}) {
  const classes = useStyles();

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
      if (result[key]) result[key]++
      else             result[key] = 1
    }
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
          <Typography className={classes.heading}>Games ({getGames().length})</Typography>
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
          <Typography className={classes.heading}>Bets ({bets.length})</Typography>
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
                if      (score.home_total > score.away_total) return 'home'
                else if (score.home_total < score.away_total) return 'away'
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

            return (
              <BetContain key={bet.id}>
                <Type>
                  <Home><Logo src={home_data.logo} /></Home>
                    <BetType>{bet.type}</BetType>
                  <Away><Logo src={away_data.logo} /></Away>
                </Type>
              {
                user_bets.map(user_bet => {
                  if (user_bet.bet_id === bet.id) {
                    let background = '#f00'
                    let color = '#000'
                    let difference;
                    const result = getResult(bet.type)
                    if (bet.type === 'pickem' &&
                        result   === user_bet.selection) {
                      background = '#0f0'
                    } else {
                      difference = result - user_bet.selection
                      if (Math.abs(difference) <= 10) background = '#0f0'
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
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </div>
  );
}
