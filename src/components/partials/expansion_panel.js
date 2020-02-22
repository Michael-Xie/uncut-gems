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

const Type = styled.h3`
  background-color: #444;
  color: #fff;
  text-align: center;
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
          <Typography className={classes.heading}>Games</Typography>
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
          <Typography className={classes.heading}>Bets</Typography>
        </ExpansionPanelSummary>
        <BetsSummary>
        {
          bets.map(bet => {
            const game       = games.filter(game => game.game_id === bet.game_id)[0]
            const home_data  = teamData(game.home_team)
            const home_away  = teamData(game.away_team)
            const home_short = game.home_team.split(' ').reverse()[0]
            const away_short = game.away_team.split(' ').reverse()[0]
            return (
              <BetContain key={bet.id}>
                <Type>{bet.type}</Type>
              {
                user_bets.map(user_bet => {
                  if (user_bet.bet_id === bet.id)
                    return <div>{user_bet.user_id}</div>
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
