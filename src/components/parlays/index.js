import React, { Fragment, useState, useEffect } from "react"
import styled from "styled-components"
import useVisualMode from "../../hooks/useVisualMode"

import Loading from "./source/loading"
import CreateParlay from "./source/createParlay"
import ShowParlay from "./source/showParlay"
import FillParlay from "./source/fillParlay"
import ActiveParlay from "./source/activeParlay"

import Title from './source/title'
import axios from "axios"

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 600px; */

`

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

const Parlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`
const Search = styled.input`
  max-width: 400px;
  height: 20px;
  width: 100%;

  margin-bottom: 20px;

  font-size: 18px;
  padding: 10px;

  overflow:hidden;
  resize: none;  

  margin: 0 auto;

`

const ResultContainer = styled.div`
  margin: 0 auto;

  max-width: 400px;
  width:100%;
`

const SearchResult = styled.button`
  max-width: 400px;
  width: 100%;
  padding: 5px 10px;
 
`

const ButtonList = styled.div`
  display: flex; 
  flex-direction: column;
  max-width: 600px;
  width:100%;
  margin: 0 auto;


`

const Button = styled.button`
  max-width: 600px;
  width:100%;
  
  padding: 10px 5px;

  border-bottom: 1px solid #DBDBDB;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #DBDBDB;
  }
`

const TenOpen = styled.div`

`


const Parlays = ({ user, games, parlays, user_bets, bets, participants, scores, users, rankings }) => {
  
  // constants to handle visual transitions.
  const CREATE = "CREATE"
  const ACTIVE = "ACTIVE"
  const OPEN = "OPEN"
  const CLOSED = "CLOSED"
  const SEARCH = "SEARCH"
  const LOADING = "LOADING"
  const JOIN = "JOIN"

  // get the visual mode for create button.
  const { mode, transition } = useVisualMode(CREATE)
  // parlays that the user has participated in.
  const [searchRes, setSearchRes] = useState([])
  const [title, setTitle] = useState('Create a Parlay')

  const searching = (value) => {
    setSearchRes([])
    if (value === "")
      return setSearchRes(["No results"])
    const parlayIds = userParlays()
    const results = parlays.filter(parlay => {
      if (!(parlayIds.includes(parlay.id)) &&
        parlay.current_status === 'open' &&
        parlay.name.includes(value))
        return setSearchRes(prev => [...prev, parlay])
    })
  }

  // get participants given a parlay id
  const getParticipants = (parlay_id) => {
    const filtered = participants.filter(participant => {
      if (parlay_id === participant.parlay_id)
        return participant
    })
    return filtered
  }

  // get user parlays.
  const userParlays = () => {
    const parlayIds = []
    const userParlays = participants.map(participant => {
      if (participant.user_name === user.user_name)
        parlayIds.push(participant.parlay_id)
    })
    return parlayIds
  }

  // get active parlays.
  const getActiveParlays = () => {
    const parlayIds = userParlays()
    const activeParlays = parlays.filter(parlay => {
      // check to see the differnce in dates.
      if (parlay.current_status === 'open' &&
        Date.now() >= (parlay.start_time * 1000)) {
        axios.put(`http://localhost:8001/api/parlays/set_active/${parlay.id}`, {
          current_status: 'in-progress'
        })
          .catch(err => console.log(err))
        if (parlayIds.includes(parlay.id)) {
          parlay.current_status = 'in-progress'
          return parlay
        }
      }

      if (parlayIds.includes(parlay.id) &&
        parlay.current_status === 'in-progress')
        return parlay
    })
    return activeParlays.sort((a, b) => b.id - a.id)
  }

  // get open parlays the user has participated in.
  const getOpenParlays = (max) => {
    const parlayIds = userParlays()
    let index = 0;
    const openParlays = parlays.filter(parlay => {
      index++
      if (max && index <= max) {
        index++
        if (parlayIds.includes(parlay.id) &&
            parlay.current_status === 'open')
          return parlay
      } else {
        if (parlayIds.includes(parlay.id) &&
            parlay.current_status === 'open')
          return parlay
      }
    })
    return openParlays.sort((a, b) => b.id - a.id)
  }

  const getAdminParlays = () => {
    const parlayIds = userParlays()
    const admin = parlays.filter(parlay => {
      if (parlay.admin === user.id &&
        !parlayIds.includes(parlay.id))
        return parlay
    })
    return admin.sort((a, b) => b.id - a.id)
  }

  // get closed parlays the user has participated in.
  const getClosedParlays = () => {
    const parlayIds = userParlays()
    const closedParlays = parlays.filter(parlay => {
      if (parlayIds.includes(parlay.id) &&
        parlay.current_status === 'close')
        return parlay
    })
    return closedParlays.sort((a, b) => b.id - a.id)
  }

  const getRankingsForParlays = (parlayID) => {
    return rankings[parlayID]
  }

  
  // get bets for a given parlay
  const getBets = (parlay_id) => {
    const filtered = bets.filter(bet => {
      if (bet.parlay_id === parlay_id)
        return bet
    })
    return filtered.sort((a, b) => b.id - a.id)
  }

  const getUserBets = (parlay_id) => {
    const filtered = user_bets.filter(bet => {
      if (bet.parlay_id === parlay_id)
        return bet
    })
    return filtered.sort((a, b) => b.id - a.id)
  }

  // helper function for the search feature.
  const search = (value) => {
    setSearchRes([])
    if (value === '')
      return setSearchRes([])
    parlays.map(parlay => {
      if (parlay.name.includes(value))
        return setSearchRes(prev => [...prev, parlay])
      return null
    })
  }
  // if the user has participated in a parlay (filled out a bet form)
  if (!user || Object.keys(user).length === 0)
    return <div></div>

  const buffer = (newMode) => {
    transition(LOADING)
    setTimeout(() => {
      transition(newMode)
    }, 1250)
  }

  return (
    <Container>
      {/* <ButtonList>
        <Button onClick={() => buffer(CREATE)}>CREATE</Button>
        <Button onClick={() => buffer(ACTIVE)}>ACTIVE</Button>
        <Button onClick={() => buffer(OPEN)}>OPEN  </Button>
        <Button onClick={() => buffer(CLOSED)}>CLOSED</Button>
        <Button onClick={() => buffer(SEARCH)}>SEARCH</Button>
      </ButtonList> */}

      {mode === LOADING && <Loading />}
      {mode === CREATE && (
        <Fragment>
          <Title
            title={'Create a Parlay'}
            buffer={buffer}
          />
          <CreateParlay
            user={user}
            onSubmit={() => buffer(OPEN)}
            games={games.filter(game => {
              if (game.timestamp * 1000 > Date.now())
                return game
            })}
          />
        </Fragment>
      )}
      {mode === ACTIVE && (
        <Fragment>
          <Title
            title={`Active [${getActiveParlays().length}]`}
            buffer={buffer}
          />
          {
            getActiveParlays().map(parlay => {
              return (
                <Div key={parlay.id}>
                  <ActiveParlay
                    rankings={rankings}
                    name={parlay.name}
                    user_bets={getUserBets(parlay.id)}
                    bets={getBets(parlay.id)}
                    start_time={parlay.start_time}
                    participants={getParticipants(parlay.id)}
                    entry={parlay.fee}
                    parlay_id={parlay.id}
                    parlays={parlays}
                    scores={scores}
                    users={users}
                    games={games}
                  />
                </Div>
              )
            })
          }
        </Fragment>
      )}
      {mode === OPEN && (
        <Fragment>
          {
            getAdminParlays().length > 0 && (
              <Title
                title={`Parlays to Fill [${getAdminParlays().length}]`}
                buffer={buffer}
              />
            )
          }
          {
            getAdminParlays().map(parlay => {
              return (
                <Div key={parlay.fee * parlay.id}>
                  <FillParlay
                    user={user}
                    users={users}
                    parlay_name={parlay.name}
                    parlay_id={parlay.id}
                    parlay_fee={parlay.fee}
                    parlay_admin={parlay.admin}
                    games={games}
                    allBets={bets}
                    onSubmit={() => buffer(OPEN)}
                    participants={participants}
                  />
                </Div>
              )
            })
          }
        </Fragment>
      )}
      {mode === OPEN && (
        <Fragment>
          <Title
            title={`Open Parlays [${getOpenParlays().length}]`}
            buffer={buffer}
          />
         
          {
            getOpenParlays().map(parlay => {
              return (
                <Div key={parlay.id}>
                  <ShowParlay
                    users={users}
                    name={parlay.name}
                    bets={getBets(parlay.id).length}
                    participants={getParticipants(parlay.id)}
                    entry={parlay.fee}
                    start_time={parlay.start_time}
                  />
                </Div>
              )
            })
          }
        </Fragment>
      )}
      {mode === CLOSED && (
        <Fragment>
          <Title
            title={`Closed [${getClosedParlays().length}]`}
            buffer={buffer}
          />
        
          {
            getClosedParlays().map(parlay => {
              return (
                <Div key={parlay.id}>
                  <ShowParlay
                    users={users}
                    name={parlay.name}
                    rankings={getRankingsForParlays(parlay.id)}
                    bets={getBets(parlay.id).length}
                    participants={[...getParticipants(parlay.id)]}
                    entry={parlay.fee}
                    start_time={parlay.start_time}
                  />
                </Div>
              )
            })
          }
        </Fragment>
      )}
      {mode === SEARCH && (
        <Fragment>
          <Title
            title={'Search'}
            buffer={buffer}
          />
          <SearchContainer>
            <Search placeholder='Search Open Parlays...' type="text" onChange={(e) => searching(e.target.value)} />
          </SearchContainer>
          <TenOpen>
          {
            getOpenParlays(10).map(parlay => {
              return <div>HELLO</div>
            })
          }
          </TenOpen>

          <ResultContainer>
            {
              searchRes.map(search => {
                if (search.name)
                  return (
                    <SearchResult onClick={() => {
                      setSearchRes([search])
                      buffer(JOIN)
                    }}>{search.name}</SearchResult>
                  )
              })
            }
          </ResultContainer>
        </Fragment>
      )}
      {mode === JOIN && (
        
        
        <Fragment>
          {
            searchRes.map(parlay => {
              return (
                <Div key={parlay.fee * parlay.id}>
                  <FillParlay
                    user={user}
                    users={users}
                    parlay_id={parlay.id}
                    parlay_name={parlay.name}
                    parlay_fee={parlay.fee}
                    parlay_admin={parlay.admin}
                    games={games}
                    allBets={bets}
                    onSubmit={() => {
                      buffer(OPEN)
                      setSearchRes([])
                    }}
                    participants={participants}
                  />
                </Div>
              )
            })
          }
        </Fragment>
      )}
    </Container>
  )
}

export default Parlays
