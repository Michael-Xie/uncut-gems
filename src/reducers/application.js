const SET_GAMES        = "SET_GAMES"
const SET_SCORES       = "SET_SCORES"
const SET_USER         = "SET_USER"
const SET_PARLAYS      = "SET_PARLAYS"
const SET_USER_BETS    = "SET_USER_BETS"
const UPDATE_PARLAYS   = "UPDATE_PARLAYS"
const GLOBAL_UPDATE    = "GLOBAL_UPDATE"

const handlers = {
  [SET_GAMES]: (prevState, action) => {
    if (action.games.length > 0)
      return {...prevState, games: action.games}
    return null
  },
  [SET_PARLAYS]: (prevState, action) => {
    return {...prevState, parlays: action.parlays, bets: action.bets}
  },
  [UPDATE_PARLAYS]: (prevState, action) => {
    return {...prevState, parlays: action.parlays}
  },
  [SET_USER]: (prevState, action) => {
    return {...prevState, user: action.value}
  },
  /*
  [SET_SCORES]: (prevState, action) => {
    if (action.scores.length > 0)
      return {...prevState, scores: action.scores}
    return null
  },
  [SET_USER]: (prevState, action) => {
    return {...prevState, user: action.value}
  },
  [SET_PARLAYS]: (prevState, action) => {
    return {...prevState, parlays: action.parlays}
  },
  [SET_PARTICIPANTS]: (prevState, action) => {
    return {...prevState, participants: action.parlays}
  },
  [SET_BETS]: (prevState, action) => {
    return {...prevState, bets: action.bets}
  },
  */
  [SET_USER_BETS]: (prevState, action) => {
    return {...prevState, user_bets: action.user_bets, participants: action.participants}
  },
  [GLOBAL_UPDATE]: (prevState, action) => {
    return {...prevState, ...action}
  }
}

const reducer = (prevState, action) => {
  const handler = handlers[action.type]
  if (handler)
    return handler(prevState, action)
  return prevState
}

export default reducer
