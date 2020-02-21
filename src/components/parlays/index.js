import React, {Fragment, useState, useEffect} from "react"
import styled from "styled-components"
import useVisualMode from "../../hooks/useVisualMode"

import Loading from "./source/loading"
import CreateParlay from "./source/createParlay"
import ShowParlay from "./source/showParlay"
import FillParlay from "./source/fillParlay"

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
  justify-content: center;
`

const ResultContainer = styled.div`
  
`

const SearchResult = styled.div`
`

const ButtonList = styled.div`
  max-width: 600px;
  width:100%;
  margin: 0 auto;

`

const Button = styled.button`
  max-width: 120px;
  width:100%;
  
  padding: 5px;

  border: 1px solid #000;

  cursor: pointer;
`


const Parlays = ({user, games, parlays, user_bets, bets, participants}) => {
  // constants to handle visual transitions.
  const CREATE   = "CREATE"
  const ACTIVE   = "ACTIVE"
  const OPEN     = "OPEN"
  const CLOSED   = "CLOSED"
  const SEARCH   = "SEARCH"
  const LOADING  = "LOADING"
  const JOIN     = "JOIN"

  // get the visual mode for create button.
  const { mode, transition } = useVisualMode(CREATE)
  // parlays that the user has participated in.
  const [searchRes, setSearchRes] = useState([])

  const searching = (value) => {
    setSearchRes([])
    if (value === "")
      return setSearchRes(["No results"])
    const parlayIds = userParlays()
    const results = parlays.filter(parlay => {
      if (!(parlayIds.includes(parlay.id))  &&
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
    }).map(result => result.user_name)

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
      if (parlayIds.includes(parlay.id) &&
          parlay.current_status === 'in-progress')
        return parlay
    })
    return activeParlays
  }

  // get open parlays the user has participated in.
  const getOpenParlays = () => {
    const parlayIds = userParlays()
    const openParlays = parlays.filter(parlay => {
      if (parlayIds.includes(parlay.id) &&
          parlay.current_status === 'open')
        return parlay
    })
    return openParlays
  }

  const getAdminParlays = () => {
    const parlayIds = userParlays()
    const admin = parlays.filter(parlay => {
      if (parlay.admin === user.id &&
          !parlayIds.includes(parlay.id))
        return parlay
    })
    return admin
  }

  // get closed parlays the user has participated in.
  const getClosedParlays = () => {
    const parlayIds = userParlays()
    const closedParlays = parlays.filter(parlay => {
      if (parlayIds.includes(parlay.id) &&
          parlay.current_status === 'close')
        return parlay
    })
    return closedParlays
  }
  // get bets for a given parlay
  const getBets = (parlay_id) => {
    const filtered = bets.filter(bet => {
      if (bet.parlay_id === parlay_id)
        return bet
    })
    return filtered
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
      <ButtonList>
        <Button onClick={() => buffer(CREATE)} >CREATE</Button>
        <Button onClick={() => buffer(ACTIVE)} >ACTIVE</Button>
        <Button onClick={() => buffer(OPEN)}   >OPEN  </Button>
        <Button onClick={() => buffer(CLOSED)} >CLOSED</Button>
        <Button onClick={() => buffer(SEARCH)} >SEARCH</Button>
      </ButtonList>
      {mode === LOADING && <Loading />}
      {mode === CREATE && (
        <CreateParlay
          user={user}
          onSubmit={() => buffer(OPEN)}
          games={games.filter(game => {
            if (game.status === "NS")
              return game
          })}
        />
      )}
      {mode === ACTIVE && (
        getActiveParlays().map(parlay => {
          return (
            <Div key={parlay.id}>
              <ShowParlay 
                name={parlay.name} 
                bets={getBets(parlay.id).length}
                participants={[...getParticipants(parlay.id)]}
                entry={parlay.fee}
                start_time={parlay.start_time}
              />
            </Div>
          )
        })
      )}
      {mode === OPEN && (
        getOpenParlays().map(parlay => {
          return (
            <Div key={parlay.id}>
              <ShowParlay 
                name={parlay.name} 
                bets={getBets(parlay.id).length}
                participants={[...getParticipants(parlay.id)]}
                entry={parlay.fee}
                start_time={parlay.start_time}
              />
            </Div>
          )
        })
      )} 
      {mode === OPEN && (
        getAdminParlays().map(parlay => {
          return (
            <Div key={parlay.fee * parlay.id}>
              <FillParlay
                user={user}
                parlay_id={parlay.id}
                games={games}
                allBets={bets}
                onSubmit={() => buffer(OPEN)}
                participants={participants}
              />
            </Div>
          )
        })
      )}
      {mode === CLOSED && (
        getClosedParlays().map(parlay => {
          return (
            <Div key={parlay.id}>
              <ShowParlay 
                name={parlay.name} 
                bets={getBets(parlay.id).length}
                participants={[...getParticipants(parlay.id)]}
                entry={parlay.fee}
                start_time={parlay.start_time}
              />
            </Div>
          )
        })
      )}
      {mode === SEARCH && (
        <Fragment>
          <SearchContainer>
            <input type="text" onChange={(e) => searching(e.target.value)} />
          </SearchContainer>

          <ResultContainer>
            {
              searchRes.map(search => {
                return (
                  <SearchResult>
                    <button onClick={() => {
                      buffer(JOIN)
                    }}>{search.name}</button>
                  </SearchResult>
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
                      parlay_id={parlay.id}
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
