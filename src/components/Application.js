import React, {Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navigation from './partials/nav'
import Game from './games/game'
import Group from './groups/group'
import axios from "axios"
import useApplicationData from "../hooks/useApplicationData"

import './app.css'

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
        <Switch>
          <Route path="/games">
            {
              state.games.map(game => {
                return <Game game={game} />
              })
            }
          </Route>
        </Switch>

        <Switch>
          <Route path="/groups">
            <Group 
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
