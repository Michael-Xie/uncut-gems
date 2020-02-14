import {useEffect, useReducer} from "react"
import axios from "axios"
import reducer from "../reducers/application"

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
    user: {}
  })

  useEffect(() => {
    axios.get("http://localhost:8001/api/games")
      .then(res => {
        console.log("called")
        const games = res.data.sort((a, b) => b.date - a.date)
        dispatch({type: "SET_GAMES", games: games})
      })
  }, [])
  
  let i = 0
  setInterval(() => {
    axios.get("http://localhost:8001/api/games")
      .then(res => {
        i++
        console.log(`Games Updated #${i}`)
        const games = res.data.sort((a, b) => b.date - a.date)
        dispatch(() => ({type: "SET_GAMES", games: games}))
      })
  }, 30000)

  return {state, dispatch}
}

export default useApplicationData
