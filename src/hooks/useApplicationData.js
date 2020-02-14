import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
    user: {}
  })

  useEffect(() => {
    axios.get("http://localhost:8001/api/games/0")
      .then(res => {
        const games = res.data.sort((a, b) => b.date - a.date)
        dispatch({type: "SET_GAMES", games: games})
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
    })

    sock.addEventListener('close', function() {
      console.log("Connection closed");
    })

    return () => { sock.close() };
  }, [])


  return {state, dispatch}
}

export default useApplicationData
