import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navigation from './partials/nav'
import Game from './games/game'
import Parlays from './parlays/index'
import StatsBox from './games/statsBox'
import Register from './sessions/registration'
import Login from './sessions/login'
import Logout from './sessions/logout'

import useApplicationData from "../hooks/useApplicationData"

import "./Application.css"
import functions from "../helpers/functions";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from "moment"

import CheckoutForm from './payment/CheckoutForm';

const stripePromise = loadStripe("pk_test_PmFe0RYTJwj04yOubxzvdSkQ00oIYKFC0L");

const Application = () => {
  const { state, dispatch } = useApplicationData()
  

  return (
    <Fragment>
      <Router>
         <Navigation
          username={
            localStorage.getItem("user") !== null
              ? JSON.parse(localStorage.getItem("user")).user_name
              : ""
          }

          userphoto={
            localStorage.getItem("user") !== null
              ? JSON.parse(localStorage.getItem("user")).user_photo
              : "https://i.imgur.com/XhF02ie.png"
          }

          balance={state.users.length > 0 && JSON.parse(localStorage.getItem("user")) !== null &&
                   state.users.filter(user => JSON.parse(localStorage.getItem("user")).user_name === user.user_name)[0] &&
                    (state.users.filter(user => JSON.parse(localStorage.getItem("user")).user_name === user.user_name)[0].wallet_amount / 100).toFixed(2)}

        />
        {localStorage.getItem("user") ? (
          <Redirect to={{ pathname: "/games" }} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )} 

        <Switch>
          <Route path="/pay">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Route>
          <Route path="/login">
            <Login dispatch={dispatch} />
          </Route>
          <Route path="/register">
            <Register dispatch={dispatch} />
          </Route>


          <Route path="/games">
            {state.games.length > 0 &&
              state.games.map(game => {
                const today = [
                  moment().day(),
                  moment().month()
                ]
                const gameDate = [
                  new Date(game.timestamp * 1000).getDay(),
                  new Date(game.timestamp * 1000).getMonth()
                ]

                if (gameDate[1] === today[1] &&
                    gameDate[0] === today[0]) {
                  return (
                    <Game
                      key={game.game_id}
                      game={game}
                      score={state.scores[state.games.indexOf(game)]}
                    />
                  );
                }
              })}
          </Route>
          <Route path="/parlays">
            <Parlays
              rankings={state.rankings}
              user={JSON.parse(localStorage.getItem("user"))} 
              games={state.games} 
              parlays={state.parlays}
              participants={state.participants}
              bets={state.bets}
              users={state.users}
              user_bets={state.user_bets}
              scores={state.scores}
            />
          </Route>

          <Route path="/logout">

            <Logout dispatch={dispatch} />

            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/groups"></Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default Application
