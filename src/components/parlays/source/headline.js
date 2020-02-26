import React from "react";
import styled from "styled-components"




/* ---------------------------
 *    start of styled CSS 
 * ---------------------------
 */

const Article = styled.article` 
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: 100px;
  margin: 0 auto ;
  background: linear-gradient(
      to left,
      rgba(${props => props.homeColor}),
      rgba(${props => props.awayColor})  
    ),
   url(${props => props.arena ? props.arena : 'https://previews.123rf.com/images/enterline/enterline1311/enterline131100002/24220420-a-realistic-vector-hardwood-textured-basketball-court-.jpg'});
   background-position: 0px -50px;
   background-blend-mode: multiply;
  overflow: hidden;
  color: #fff;
`

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items:center;
`

const TeamName = styled.div`
  display: flex;
  justify-content: space-around;
`
const Team = styled.div` 

`

const Logo = styled.img`
  max-width: 60px;
  width: 100%;
`
// ---------------------------

export default function Headline({ game }) {

  if (game.home_team === undefined || game.away_team === undefined)
    return <div></div>

  return (

    <Article
      homeColor={game.home_team.colors}
      awayColor={game.away_team.colors}
      arena={game.home_team.arena}
    >
      <TeamName>
        <h1>{game.away_team.name}</h1>
        <h1>{game.home_team.name}</h1>
      </TeamName>

      <Section>
        <Team>
          <Logo
            src={game.away_team.logo}
            alt={game.away_team.name}
          />
        </Team>
        <Team>
          <Logo
            src={game.home_team.logo}
            alt={game.home_team.name}
          />
        </Team>
      </Section>

    </Article>
  );

}

