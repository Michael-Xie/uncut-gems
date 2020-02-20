import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useParlaysData = () => {
  const [state, dispatch] = useReducer(reducer, {
    activeParlays: []
  })

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/parlays/active"))
    ])
      .then(res => {
        const parlays = res[0].data.sort((a, b) => b.id - a.id)
        dispatch({type: "SET_ACTIVE", activeParlays: parlays})
      })
  }, [])

  // useEffect to establish a websocket connection on the client side.
  useEffect(() => {
    const sock = new WebSocket('ws://localhost:8001')

    sock.addEventListener("message", function(msg) {
      const event = JSON.parse(msg.data)

      if (event.type === "SET_ACTIVE") {
        console.log("back-end api called to update active parlays")
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

export default useParlaysData
