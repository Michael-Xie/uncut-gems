import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
    scores: [],
    parlays: [],
    user: {}
  })

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/games/0")),
      Promise.resolve(axios.get("http://localhost:8001/api/scores")),
      Promise.resolve(axios.get("http://localhost:8001/api/parlays/open"))
    ])
      .then(res => {
        const games   = res[0].data.sort((a, b) => a.game_id - b.game_id)
        const scores  = res[1].data.sort((a, b) => a.game_id - b.game_id)
        const parlays = res[2].data.sort((a, b) => a.name - b.name)
        dispatch({type: "SET_GAMES", games})
        dispatch({type: "SET_SCORES", scores})
        dispatch({type: "SET_PARLAYS", parlays})
      })
  }, [])

  // useEffect to establish a websocket connection on the client side.
  useEffect(() => {
    const sock = new WebSocket('ws://localhost:8001')

    sock.addEventListener("open", function() {
      console.log('Connection established...');
    })

    sock.addEventListener("message", function(msg) {
      console.log("basket-ball api called to update scores")
      const event = JSON.parse(msg.data)

      if (event.type === "SET_GAMES") {
        return dispatch({...event})
      }
      if (event.type === "SET_SCORES") {
        return dispatch({...event})
      }
      if (event.type === "SET_PARLAY") {
        return dispatch({...event})
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
