import React, {useEffect, Fragment} from "react"
import styled from "styled-components"
import getGames from "../req/getGames.js"

/* styling with styled components */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 80vw;
  margin: 0 auto;
`

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 20%;
  border: 3px ridge #000;
  margin: 1vw;

  @media only screen and (min-width: 768px) {
    height: 25%;
  }
`

const GameInformation = styled.div`
  height: 20%;
  width: 100%;
  border-top: 3px ridge #000;
  background: #000;
  color: #fff;
`


// redundant -- combine into one
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  width: 45%;
`

const AwayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  width: 45%;
`
// -----------------------------

const VersusContainer = styled.div`
  background: #000;
  width: 10%;
`

const Home = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  background: #444;
  color: #fff;
  font-size: 1.5em;

  @media only screen and (max-width: 768px) {
    font-size: 1.15em;
  }
`
const Versus = styled.span`
  margin-right: 2vw;
  margin-left: 2vw;
  font-size: 1.5em;
  color: #f00;
`

const Away = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  background: #444;
  color: #fff;
  font-size: 1.5em;

  @media only screen and (max-width: 768px) {
    font-size: 1.15em;
  }
`

const Dates = styled.span`
  color: #f00;
`

const Team = styled.div`
  color: #fff;
`

const Score = styled.div`
  margin: 0 auto;
  font-size: 5em;
  color: #000;
  text-shadow: 1px 1px #bbb;

  @media only screen and (max-width: 768px) {
    font-size: 3em;
  }
`

const Logo = styled.img`
  width: 20vw;
  height: 20vh;
`


const ScoreHome = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #00f;
`

const ScoreAway = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #00f;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
`

/* ------------------------------ */

const Games = ({setState, state}) => {
  const API_HOST = "api-basketball.p.rapidapi.com" 
  const API_KEY = "d8dfc5cbfdmshbb0b69d2a790b3dp1ba90ejsn8f36ab430b8b"
  const axios = require("axios")

  useEffect(() => {
    getGames(API_KEY, API_HOST, setState, state, formatDate(new Date(), 0))
  }, [])

  const keys = Object.keys(state.games)
  const convertTime = (date) => {
    const hour    = date.getHours()
    const minute  = date.getMinutes() >= 10 ? date.getMinutes() : date.getMinutes() + '0'
    let postfix;
    if (hour >= 12)
      postfix = "pm"
    else
      postfix = "am"
    return `${hour % 12}:${minute} ${postfix}`
  }

  const formatDate = (date, change) => {
    let daysInMonth = 30 // [TODO] determine the days in month.
    let year  = date.getFullYear()
    let month = (date.getMonth() + 1) % 12
    let day   = (date.getDate() + 1 + change) % daysInMonth
    // if day/month < 10 append 0
    if (Number(day) < 10)   day   = String(0) + day
    if (Number(month) < 10) month = String(0) + month
    return `${year}-${month}-${day}`
  }

  /* ---------------------------------
   *  testing final-api
   * ---------------------------------
   */
  useEffect(() => {
    axios.get("http://localhost:8001/api/games/")
         .then(res => {
           console.log(res.data)
         })
         .catch(err => console.log(err))
  }, [])
        

  const getLogo = (team) => {
    team = team.replace(/\s/g, '_')
    const logos = {
      Atlanta_Hawks: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/hawks.png",
      Boston_Celtics: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/celtics.png",
      Brooklyn_Nets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/nets.png",
      Charlotte_Hornets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/charlotte-hornets.png",
      Chicago_Bulls: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/bulls.png",
      Cleveland_Cavaliers: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/cavaliers.png",
      Dallas_Mavericks: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/mavericks.gif",
      Denver_Nuggets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/nuggets.gif",
      Detroit_Pistons: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/pistons.png",
      Golden_State_Warriors: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/warriors.gif",
      Houston_Rockets: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/rockets.gif",
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
      Utah_Jazz: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/jazz.gif",
      Washington_Wizards: "http://www.nbateamslist.com/wp-content/themes/almost-spring-adsense-seo-02/images/logo_history/wizzards.png"
    }
    return logos[team]
  }

  return (
    <Fragment>
      <Dates>
        <a onClick={() => {
          setState((prev) => ({...prev, dayOffset: state.dayOffset - 1}))
          return getGames(API_KEY, API_HOST, setState, state, formatDate(new Date(), state.dayOffset - 1))
        }} href="javascript:null">
          PREV
        </a>
        {state.games[0] && formatDate(new Date(), state.dayOffset - 1)}
        <a onClick={() => {
          setState((prev) => ({...prev, dayOffset: state.dayOffset + 1}))
          return getGames(API_KEY, API_HOST, setState, state, formatDate(new Date(), state.dayOffset + 1))
        }} href="javascript:null">
          NEXT
        </a>
      </Dates>
      <Container>
        { 
          keys.map(value => {
            return (
          <Fragment>
            <GameContainer>
              <HomeContainer>
                <Home>
                  <Team key={value}>{state.games[value].home_team}</Team>
                </Home>
                <ScoreHome>
                  <Logo src={getLogo(state.games[value].home_team)}/>
                  <Score key={value}>
                    {state.games[value].status.short !== "NS" && state.games[value].home_score}
                    {state.games[value].status.short === "NS" && <div>0</div>}
                  </Score>
                </ScoreHome>
              </HomeContainer>
              <VersusContainer>
                <Img key={value} src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png"/> 
              </VersusContainer>
              <AwayContainer>
                <Away>
                  <div key={value}>{state.games[value].away_team}</div>
                </Away>
                <ScoreAway>
                  <Logo src={getLogo(state.games[value].away_team)}/>
                  <Score key={value}>
                    {state.games[value].status !== "NS" && state.games[value].away_score}
                    {state.games[value].status === "NS" && <div>0</div>}
                  </Score>
                </ScoreAway>
              </AwayContainer>
              <GameInformation>
              { convertTime(new Date(state.games[value].date)) }
              </GameInformation>
            </GameContainer>
          </Fragment>
            )})
        }
      </Container>
    </Fragment>
  )
}

export default Games;
