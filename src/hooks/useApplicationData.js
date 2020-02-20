import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
    scores: [],
    user: {}
  })

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/games/0")),
      Promise.resolve(axios.get("http://localhost:8001/api/scores")),
    ])
      .then(res => {
        const games   = res[0].data.sort((a, b) => a.game_id - b.game_id)
        const scores  = res[1].data.sort((a, b) => a.game_id - b.game_id)
        dispatch({type: "SET_GAMES", games})
        dispatch({type: "SET_SCORES", scores})
      })
  }, [])

  // useEffect to establish a websocket connection on the client side.
  useEffect(() => {
    const sock = new WebSocket('ws://localhost:8001')

    sock.addEventListener("open", function() {
      console.log('Connection established...');
    })

    sock.addEventListener("message", function(msg) {
      const event = JSON.parse(msg.data)

      if (event.type === "SET_GAMES") {
        console.log("back-end api called to update games")
        const games = event.games.sort((a, b) => a.game_id - b.game_id)
        return dispatch({...event, games: games})
      }
      if (event.type === "SET_SCORES") {
        console.log("back-end api called to update scores")
        const scores = event.scores.sort((a, b) => a.game_id - b.game_id)
        return dispatch({...event, scores: scores})
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
