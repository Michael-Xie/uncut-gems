import React, {Fragment, useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navigation from './partials/nav'
import Game from './games/game'
import axios from "axios"

const Application = () => {
  const [state, setState] = useState({
    games: []
  })

  useEffect(() => {
    axios.get("http://localhost:8001/api/games")
      .then(res => setState({games: res.data}))
  }, [])

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
            <Game state={state.games} />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default Application
