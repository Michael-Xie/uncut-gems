const SET_GAMES = "SET_GAMES"

const handlers = {
  [SET_GAMES]: (prevState, action) => {
    return {games: action.games}
  }
}

const reducer = (prevState, action) => {
  const handler = handlers[action.type]
  if (handler)
    return handler(prevState, action)
  return prevState
}

export default reducer
