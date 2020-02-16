import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom"
import Navigation from './partials/nav'
import Game from './games/game'
import StatsBox from './games/statsBox'
import Parlays from './parlays/index'
import Register from './sessions/registration'
import Login from './sessions/login'
import Logout from './sessions/logout'

import axios from "axios"

import useApplicationData from "../hooks/useApplicationData"

import "./Application.css"

const Application = () => {
  const { state, dispatch } = useApplicationData()
  return (
    <Fragment>
      <Router>
        <Navigation
          username={localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).user_name : ""}
          userphoto="https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png"
          balance="14.56"
        />
        {
          localStorage.getItem('user') ?
          <Redirect to={{ pathname: "/parlays" }} /> :
          <Redirect to={{ pathname: "/login" }} />
        }

        <Switch>
          <Route path="/login">
            <Login dispatch={dispatch} />
          </Route>
          <Route path="/register">
            <Register dispatch={dispatch} />
          </Route>
          <Route path="/games">
            { 
              (state.games || []).map(game => {
                return (
                  <Game
                    key={game.game_id}
                    game={game}
                    score={state.scores[state.games.indexOf(game)]}
                  />
                )
              })
            }
          </Route>
          <Route path="/logout">
            <Logout/>
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/parlays">
            <Parlays userInfo={state.user} games={state.games}/>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default Application
