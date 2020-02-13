import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navigation from './partials/nav'
import Game from './games/game'
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
          username="Jamie"
          userphoto="https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png"
          balance="14.56"
        />
        <Register dispatch={dispatch} />
        <Login dispatch={dispatch} />
        <Switch>
          <Route path="/games">
            { state.games.length > 0 && (
              state.games.map(game => {
                return <Game key={game.game_id} game={game} />
              })
            )
            }
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
