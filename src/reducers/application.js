const SET_GAMES = "SET_GAMES"
const SET_USER  = "SET_USER"

const handlers = {
  [SET_GAMES]: (prevState, action) => {
    return {games: action.games}
  },
  [SET_USER]: (prevState, action) => {
    return {user: action.username}
    return {...prevState, games: action.games}
  },
  [SET_USER]: (prevState, action) => {
    return {...prevState, user: action.username}
  }
}

const reducer = (prevState, action) => {
  const handler = handlers[action.type]
  if (handler)
    return handler(prevState, action)
  return prevState
}

export default reducer
