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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #fff;
  width: 100%;
  max-width: 600px;
  height: 200px;
  margin: 30px auto 0;
  background: linear-gradient(
      to left,
      rgba(${props => props.homeColor}),
      rgba(${props => props.awayColor})  
    ),
   url(${props => props.arena ? props.arena : 'https://previews.123rf.com/images/enterline/enterline1311/enterline131100002/24220420-a-realistic-vector-hardwood-textured-basketball-court-.jpg'});
  background-blend-mode: multiply;
  background-size: cover;
  background-position: 50% 0;
  display: flex;
  cursor: pointer;
  
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 6px -6px black;
  }
`

const Teams = styled.section`
  display:flex;
  width:100%;
  justify-content: space-between;

`

const ScoreLogo = styled.div`
  font-family: Orbitron, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  font-size: 2rem;

  padding: 0 20px;
`

const GameInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`
const TeamNames = styled.header`
  display:flex;
  justify-content: space-around;

  background-color: rgba(0, 0, 0, 0.3);
  
`
const Name = styled.h1`
  font-size: 20px;
  text-align: center;
`
const GameStatus = styled.h3`
  text-align: center;
  margin: 0 auto;
`

const Points = styled.div`
  margin: 0 10px;


`
const Logo = styled.img`
  max-width: 100px;
  width: 100%;
`;
// ---------------------------

export default function Game({ game, score }) {
  const [statsBoxVisible, setStatsBoxVisible] = useState(false);

  if (game.length === 0 || !score)
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
        <TeamNames>
          <Name>{game.away_team}</Name>
          <Name>{game.home_team}</Name>
        </TeamNames>
   
        <Teams>
          

          <ScoreLogo>
            <Logo src={awayTeam.logo} alt={game.away_team} />
            <Points>{showPointsIfActive(score.away_total)}</Points>
          </ScoreLogo>
      
        <GameInfo>
          <GameStatus>{score.status}</GameStatus>
        </GameInfo>
     
        

          <ScoreLogo>
            <Points>{showPointsIfActive(score.home_total)}</Points>
            <Logo src={homeTeam.logo} alt={game.home_team} />
          </ScoreLogo>
        </Teams>
      </Article>

      {statsBoxVisible && (
        <StatsBox
          homeFirstQ={score.home_first}
          homeSecondQ={score.home_second}
          homeThirdQ={score.home_third}
          homeFourthQ={score.home_fourth}
          awayFirstQ={score.away_first}
          awaySecondQ={score.away_second}
          awayThirdQ={score.away_third}
          awayFourthQ={score.away_fourth}
        />
      )}
    </div>
  );

}

