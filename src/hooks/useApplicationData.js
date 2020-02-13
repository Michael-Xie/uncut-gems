import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: []
  })

  useEffect(() => {
    axios.get("http://localhost:8001/api/games")
      .then(res => dispatch({type: "SET_GAMES", games: res.data}))
  }, [])
  
  setInterval(() => {
    axios.get("http://localhost:8001/api/games")
      .then(res => dispatch({type: "SET_GAMES", games: res.data}))  
  }, 30000)

  return {state, dispatch}
}

export default useApplicationData
