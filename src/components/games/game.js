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
    Boston_Celtics: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Brooklyn_Nets: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Charlotte_Hornets: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Chicago_Bulls: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Cleveland_Cavaliers: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Dallas_Mavericks: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Denver_Nuggets: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Detroit_Pistons: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Golden_State_Warriors: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Houston_Rockets: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Indiana_Pacers: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Los_Angeles_Clippers: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Memphis_Grizzlies: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Miami_Heat: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Milwaukee_Bucks: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Minnesota_Timberwolves: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    New_Orleans_Pelicans: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    New_York_Knicks: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Oklahoma_City_Thunder: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Orlando_Magic: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Philadelphia_76ers: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Phoenix_Suns: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Portland_Trail_Blazers: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Sacramento_Kings: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    San_Antonio_Spurs: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Toronto_Raptors: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Utah_Jazz: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/jazz.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    },
    Washingtion_Wizards: {
      logo: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
      arena: "https://i.cdn.turner.com/dr/nba/teamsites-nbateams/release/jazz/sites/jazz/files/imagecache/jazz_standard/content/images-top/2012/04/2014-energysolutionsarena-640.jpg",
      colors: "111, 200, 111, 0.701"
    }

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
  if (state.length === 0)
    return <div></div>
  const homeTeam = teamData(state[0].home_team)
  const awayTeam = teamData(state[0].away_team)

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

