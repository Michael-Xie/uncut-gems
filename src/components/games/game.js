import React from "react";
import styled from "styled-components"

/*{ <Game
      homeName="Toronto Raptors"
      awayName="Los Angeles Lakers"
      homeLogo="https://www.stickpng.com/assets/images/58419bf3a6515b1e0ad75a59.png"
      awayLogo="https://www.stickpng.com/assets/images/58419d0aa6515b1e0ad75a6c.png"
      gameStatus="7:30"
      homePoints="20"
      awayPoints="11"
      homeCity="https://raw.githubusercontent.com/JKaram/react-components/master/src/images/toronto-background.png"
      homeColor="195, 14, 47, 0.701"
      awayColor="253, 184, 39, 0.701"
/> }*/

/* --------------------------
 *    helper functions
 * --------------------------
 */

const teamData = (team) => {
  team = team.replace(/\s/g, '_')
  const data = {
    Atlanta_Hawks: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/hawks.png",
      arena: "",
      colors: ""
    },
    Houston_Rockets: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Utah_Jazz: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/jazz.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Boston_Celtics: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/celtics.png",
    Brooklyn_Nets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/nets.png",
    Charlotte_Hornets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/charlotte-hornets.png",
    Chicago_Bulls: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/bulls.png",
    Cleveland_Cavaliers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/cavaliers.png",
    Dallas_Mavericks: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/mavericks.gif",
    Denver_Nuggets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/nuggets.gif",
    Detroit_Pistons: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/pistons.png",
    Golden_State_Warriors: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/warriors.gif",
    Indiana_Pacers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/pacers.png",
    Los_Angeles_Clippers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/clippers.gif",
    Los_Angeles_Lakers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/lakers.gif",
    Memphis_Grizzlies: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/grizzlies.gif",
    Miami_Heat: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/heat.png",
    Milwaukee_Bucks: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/bucks.png",
    Minnesota_Timberwolves: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/timberwolves.gif",
    New_Orleans_Pelicans: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/pelicans.png",
    New_York_Knicks: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/knicks.png",
    Oklahoma_City_Thunder: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/thunder.gif",
    Orlando_Magic: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/magic.gif",
    Philadelphia_76ers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/76ers.png",
    Phoenix_Suns: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/suns.gif",
    Portland_Trail_Blazers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/trail_blazers.gif",
    Sacramento_Kings: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/kings.gif",
    San_Antonio_Spurs: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/spurs.gif",
    Toronto_Raptors: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/raptors.png",
    Washington_Wizards: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/wizzards.png"
  }
  return data[team]
}

const showPointsIfActive = (pointsProp) => {
  if (pointsProp) return pointsProp;
  return null
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
      to right,
      rgba(${props => props.homeColor}),
      rgba(${props => props.awayColor})  
    ),
   url(${props => props.arena ? props.arena : 'https://previews.123rf.com/images/enterline/enterline1311/enterline131100002/24220420-a-realistic-vector-hardwood-textured-basketball-court-.jpg'});
  background-blend-mode: multiply;
  display: flex;

  &:hover {
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
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
  flex-direction: column;
  text-align: center;
  width: 20%;
  font-weight: bold;
`

// ---------------------------

export default function Game({state}) {
  //const state = {"id":1,"game_id":2484,"date":"2020-02-10T00:00:00+00:00","timestamp":"1581292800","status":"FT","home_team":"Houston Rockets","away_team":"Utah Jazz","home_score":113,"away_score":114}
  console.log(state)

  const homeTeam = teamData(state.home_team)
  const awayTeam = teamData(state.away_team)

  return (
    <Article homeColor={homeTeam.colors} awayColor={awayTeam.colors} arena={homeTeam.arena} >
      <Section>
        <h1>{state.home_team}</h1>
        <ScoreLogo>
          <img src={homeTeam.logo} alt={state.home_team} height="100px" width="auto" />
          {showPointsIfActive(state.home_score)}
        </ScoreLogo>
      </Section>

      <GameInfo>
      
      <h3>{state.status}</h3>
      {/* <button type="button">Show More</button> */}
      </GameInfo>

      <Section>
        <h1>{state.away_team}</h1>
        <ScoreLogo>
          {showPointsIfActive(state.away_score)}
          <img src={awayTeam.logo} alt={state.away_team} height="100px" width="auto" />
        </ScoreLogo>
      </Section>
    </Article>
  );

}

