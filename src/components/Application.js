import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import Navigation from './partials/nav.js'
import Game from './games/game.js'
import axios from "axios"

const Application = () => {
  const [state, setState] = useState({
    games: []
  })

  useEffect(() => {
    axios.get("http://localhost:8001/api/games")
      .then(res => setState({games: res.data}))
      .catch(err => console.log(err))
  }, [])

  return (
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
  )
}

export default Application;
