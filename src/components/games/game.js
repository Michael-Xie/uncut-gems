import React, { useState } from "react";
import styled from "styled-components"
import teamData from "../../helpers/teamData"

import StatsBox from './statsBox'

const showPointsIfActive = (pointsProp) => {
  if (pointsProp) return pointsProp;
  return 0
}

/* ---------------------------
 *    start of styled CSS 
 * ---------------------------
 */

const Article = styled.article` 
  color: #fff;
  width: 600px;
  height: 200px;
  margin: 30px auto 0;
  background: linear-gradient(
      to left,
      rgba(${props => props.homeColor}),
      rgba(${props => props.awayColor})  
    ),
   url(${props => props.arena ? props.arena : 'https://previews.123rf.com/images/enterline/enterline1311/enterline131100002/24220420-a-realistic-vector-hardwood-textured-basketball-court-.jpg'});
  background-blend-mode: multiply;
  display: flex;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 6px -6px black;
  }

`

const Section = styled.section`
  justify-content: space-between;
  width: 40%;
  text-align: center;
`

const ScoreLogo = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2rem;
`

const GameInfo = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  font-weight: bold;
`
const TeamName = styled.h1`
  margin: 20px;
`

const GameStatus = styled.h3`
  text-align: center;
  margin: 0 auto;
`

const Logo = styled.img` 

`

const Stats = styled.div`

`
// ---------------------------

export default function Game({ game, score }) {
  const [statsBoxVisible, setStatsBoxVisible] = useState(false);

  if (game.length === 0 || !game)
    return <div></div>

  const homeTeam = teamData(game.home_team)
  const awayTeam = teamData(game.away_team)

  if (homeTeam === undefined || awayTeam === undefined)
    return <div></div>

  return (
    <div>
      <Article
        onClick={() => setStatsBoxVisible(!statsBoxVisible)}
        homeColor={homeTeam.colors}
        awayColor={awayTeam.colors}
        arena={homeTeam.arena}
      >
        <Section>
          <TeamName>{game.away_team}</TeamName>

          <ScoreLogo>
            <Logo
              src={awayTeam.logo}
              alt={game.away_team}
              height="100px"
              width="auto"
            />
            {showPointsIfActive(score.away_total)}
          </ScoreLogo>
        </Section>

        <GameInfo>
          <GameStatus>{score.status}</GameStatus>
          {/* <button type="button">Show More</button> */}
        </GameInfo>
        <Section>
          <TeamName>{game.home_team}</TeamName>

          <ScoreLogo>
            {showPointsIfActive(score.home_total)}
            <img
              src={homeTeam.logo}
              alt={game.home_team}
              height="100px"
              width="auto"
            />
          </ScoreLogo>
        </Section>
      </Article>
     
      {statsBoxVisible && (
        <StatsBox
          homeFirstQ  = {score.home_first}
          homeSecondQ = {score.home_second}
          homeThirdQ  = {score.home_third}
          homeFourthQ = {score.home_fourth}
          awayFirstQ  = {score.away_first}
          awaySecondQ = {score.away_second}
          awayThirdQ  = {score.away_third}
          awayFourthQ = {score.away_fourth}
        />
      )}
   
    </div>
  );

}

