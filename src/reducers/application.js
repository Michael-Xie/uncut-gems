const SET_GAMES  = "SET_GAMES"
const SET_SCORES = "SET_SCORES"
const SET_USER   = "SET_USER"
const SET_ACTIVE = "SET_ACTIVE"

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
  [SET_ACTIVE]: (prevState, action) => {
    if (action.activeParlays.length > 0)
      return {...prevState, activeParlays: action.activeParlays}
    return null
  }
}

const reducer = (prevState, action) => {
  const handler = handlers[action.type]
  if (handler)
    return handler(prevState, action)
  return prevState
}

export default reducer
