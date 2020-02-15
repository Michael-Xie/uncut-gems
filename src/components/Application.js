import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom"
import Navigation from './partials/nav'
import Game from './games/game'
import StatsBox from './games/statsBox'
import Group from './groups/group'
import Register from './sessions/registration'
import Login from './sessions/login'

import AddGroup from './groups/addGroup'
import axios from "axios"

import useApplicationData from "../hooks/useApplicationData"

import "./Application.css"

const Application = () => {
  const { state, dispatch } = useApplicationData()
  return (
    <Fragment>
      <Router>
        <Navigation
          username={localStorage.getItem('user')!==null ? JSON.parse(localStorage.getItem('user')).user_name : ""}
          userphoto="https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png"
          balance="14.56"
        />
        {localStorage.getItem('user') ?
          <Redirect to={{ pathname: "/games" }}/>:
          <Redirect to={{ pathname: "/login" }} /> }
        <Switch>
          <Route path="/login">
            <Login dispatch={dispatch} />
          </Route>
          <Route path="/register">
            <Register dispatch={dispatch} />
          </Route>
          <Route path="/logout"> 
            {localStorage.clear('user')}
          </Route>
          <Route path="/games">
            {state.games.length > 0 && (
              state.games.map(game => {
                return (
                  <Game
                    key={game.game_id}
                    game={game}
                    score={state.scores[state.games.indexOf(game)]}
                  />
                )
              })
            )
            }
            {/* <StatsBox
              homeFirstQ="12"
              homeSecondQ="43"
              homeThirdQ="0"
              homeFourthQ="0"
              awayFirstQ="12"
              awaySecondQ="0"
              awayThirdQ="0"
              awayFourthQ="0"
            /> */}
          </Route>
        </Switch>
        <Switch>

          <Route path="/groups">
            <AddGroup
              onClick="?"
            />

            <Group
              // EXAMPLE PROPS NOT SURE YET
              // groupName
              // totalGroupBets
              // groupMembers
              // AdminName
              // AdminPhoto
              // UsersActive total
              groupName="Super Sports Group"
              username="Jamie"
              userphoto="https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png"
            />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default Application
