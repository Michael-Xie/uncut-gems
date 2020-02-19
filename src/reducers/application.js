const SET_GAMES  = "SET_GAMES"
const SET_SCORES = "SET_SCORES"
const SET_USER   = "SET_USER"
const SET_PARLAY = "SET_PARLAY"

const handlers = {
  [SET_GAMES]: (prevState, action) => {
    if (action.games.length > 0)
      return {...prevState, games: action.games}
    return null
  },
  [SET_SCORES]: (prevState, action) => {
    if (action.scores.length > 0)
      return {...prevState, scores: action.scores}
    return null
  },
  [SET_USER]: (prevState, action) => {
    return {...prevState, user: action.value}
  },
  [SET_PARLAY]: (prevState, action) => {
    return {...prevState, parlays: action.parlays}
  }
}

const reducer = (prevState, action) => {
  const handler = handlers[action.type]
  if (handler)
    return handler(prevState, action)
  return prevState
}

export default reducer
