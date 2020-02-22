import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
    scores: [],
    parlays: [],
    participants: [],
    bets: [],
    user_bets: [],
    user: {}
  })

  useEffect(() => {
    Promise.all([
      /*
      Promise.resolve(axios.get("http://localhost:8001/api/games/0")),
      Promise.resolve(axios.get("http://localhost:8001/api/scores")),
      Promise.resolve(axios.get("http://localhost:8001/api/parlays/0")),
      Promise.resolve(axios.get("http://localhost:8001/api/participants/0")),
      Promise.resolve(axios.get("http://localhost:8001/api/bets/0")),
      Promise.resolve(axios.get("http://localhost:8001/api/user_bets/0")),
      */
      Promise.resolve(axios.get("http://localhost:8001/api/global/0"))
    ])
      .then(res => {
        const games        = res[0].data.games.sort((a, b)        => a.game_id   - b.game_id)
        const scores       = res[0].data.scores.sort((a, b)       => a.game_id   - b.game_id)
        const parlays      = res[0].data.parlays.sort((a, b)      => a.id        - b.id)
        const participants = res[0].data.participants.sort((a, b) => a.parlay_id - b.parlay_id)
        const bets         = res[0].data.bets.sort((a, b)         => a.parlay_id - b.parlay_id)
        const user_bets    = res[0].data.user_bets.sort((a, b)    => a.parlay_id - b.parlay_id)

        dispatch({type: "GLOBAL_UPDATE", games, scores, parlays, participants, bets, user_bets})
      })
      .catch(err => console.log(err))
  }, [])

  // useEffect to establish a websocket connection on the client side.
  useEffect(() => {
    const sock = new WebSocket('ws://localhost:8001')

    sock.addEventListener("open", function() {
      console.log('Connection established...');
    })

    sock.addEventListener("message", function(msg) {
      const event = JSON.parse(msg.data)

      if (event.type === "GLOBAL_UPDATE") {
        console.log("back-end global update")
        const games        = event.games.sort((a, b)        => a.game_id   - b.game_id)
        const scores       = event.scores.sort((a, b)       => a.game_id   - b.game_id)
        const parlays      = event.parlays.sort((a, b)      => a.id        - b.id)
        const participants = event.participants.sort((a, b) => a.parlay_id - b.parlay_id)
        const bets         = event.bets.sort((a, b)         => a.parlay_id - b.parlay_id)
        const user_bets    = event.user_bets.sort((a, b)    => a.parlay_id - b.parlay_id)
        return dispatch({...event, games, scores, parlays, participants, bets, user_bets})
      }

      if (event.type === "SET_GAMES") {
        console.log("back-end games update")
        const games = event.games.sort((a, b) => a.game_id - b.game_id)
        return dispatch({...event, games})
      }

      if (event.type === "UPDATE_PARLAYS") {
        console.log("back-end parlays (update) update")
        const parlays = event.parlays.sort((a, b) => a.id - b.id)
        return dispatch({...event, parlays})
      }

      if (event.type === "SET_PARLAYS") {
        console.log("back-end parlays update")
        const parlays = event.parlays.sort((a, b) => a.id - b.id)
        const bets    = event.bets.sort((a, b)    => a.parlay_id - b.parlay_id)
        return dispatch({...event, parlays, bets})
      }

      if (event.type === "SET_USER_BETS") {
        console.log("back-end user bets update")
        const user_bets    = event.user_bets.sort((a, b)    => a.parlay_id - b.parlay_id)
        const participants = event.participants.sort((a, b) => a.parlay_id - b.parlay_id)
        return dispatch({...event, user_bets, participants})
      }
    })

    sock.addEventListener('close', function() {
      console.log("Connection closed");
    })

    return () => { sock.close() };
  }, [])


  return {state, dispatch}
}

export default useApplicationData
