import React, {Fragment, useState, useEffect} from "react"
import styled from "styled-components"
import useVisualMode from "../../hooks/useVisualMode"

import Loading from "./source/loading"
import CreateParlay from "./source/createParlay"
import ShowParlay from "./source/showParlay"
import FillParlay from "./source/fillParlay"

import axios from "axios"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80vw;

  @media only screen and (min-width: 768px) {
    width: 60vw;
  }
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

const Button = styled.button`
  max-width: 100px;
`


const Parlays = ({user, games}) => {
  // constants to handle visual transitions.
  const CREATE   = "CREATE"
  const ACTIVE   = "ACTIVE"
  const OPEN     = "OPEN"
  const CLOSED   = "CLOSED"
  const SEARCH   = "SEARCH"
  const LOADING  = "LOADING"
  const JOIN     = "JOIN"

  // get the visual mode for create button.
  const {mode, transition} = useVisualMode(CREATE)
  // parlays that the user has participated in.
  const [userParlays, setUserParlays] = useState([])
  // state to handle search bar -- searching parlays by name (default shows all

  const [openParlays, setOpenParlays] = useState([])
  // open parlays that can be joined.
  const [searchRes, setSearchRes] = useState([])

  // helper function for the search feature.
  const search = (value) => {
    setSearchRes([])
    if (value === '')
      return setSearchRes([])
    openParlays.map(parlay => {
      if (parlay.name.includes(value))
        return setSearchRes(prev => [...prev, parlay])
      return null
    })
  }
  // if the user has participated in a parlay (filled out a bet form)
  // show the parlay.
  const showParlay = (parlay, parlayInformation) => {
    parlayInformation["state"] = "SHOW"
    axios.get(`http://localhost:8001/api/parlay/${parlay.id}/participants/${user.user_name}`)
      .then(res => {
        if (res.data.length !== 0) {
          parlayInformation["id"]    = parlay.id
          parlayInformation["status"]= parlay.current_status
          parlayInformation["start_time"]= parlay.start_time
          parlayInformation["name"]  = parlay.name
          parlayInformation["fee"]   = parlay.fee
          parlayInformation["users"] = []
          parlayInformation["bets"]  = []
          // get the rest of the participants.
          axios.get(`http://localhost:8001/api/parlay/${parlay.id}/participants`)
            .then(res => {
              res.data.map(player => {
                parlayInformation.users.push(player.user_name)
                return null
              })
              return null
            })
            .then(res => {
              axios.get(`http://localhost:8001/api/parlay/bet/${parlay.id}`)
                .then(res => {
                  res.data.map(bet => parlayInformation.bets.push(bet))
                })
                .then(() => setUserParlays(prev => [...prev, parlayInformation]))
            })
        }
      })
  }
  // get all the parlays the user has participated in.
  useEffect(() => {
    setUserParlays([])
    setSearchRes([])
    setOpenParlays([])
    // check to see if the admin has filled out his parlay.
    axios.get(`http://localhost:8001/api/parlays`)
      .then(res => {
        res.data.map(parlay => {
          const parlayInformation = {}
          // ensure that the user has filled out the bet form for his own parlays.
          if (parlay.admin === user.id) {
            axios.get(`http://localhost:8001/api/parlay/${parlay.id}/bet/fill/${user.id}`)
              .then(res => {
                if (res.data.length === 0) {
                  parlayInformation["state"] = "FILL"
                  parlayInformation["id"]    = parlay.id
                  setUserParlays(prev => [...prev, parlayInformation])
                } else {
                  showParlay(parlay, parlayInformation)
                }
              })
          } else {
            showParlay(parlay, parlayInformation)
          }
          return null
        })
      })
    // now update the parlays search table
    // where the user is not in the parlay
    axios.get("http://localhost:8001/api/parlays/open")
      .then(res => {
        res.data.map(parlay => {
          axios.get(`http://localhost:8001/api/parlay/${parlay.id}/participants`)
            .then(res => {
              const participants = res.data.map(user => user.user_name)
              return participants
            })
            .then(participants => {
              if (!participants.includes(user.user_name))
                setOpenParlays(prev => [...prev, parlay])
            })
          return null
        })
      })
  }, [mode === LOADING])

  // if user is not logged in return null [TODO] redirect.
  if (Object.keys(user).length === 0)
    return <div></div>

  const buffer = (newMode) => {
    transition(LOADING)
    setTimeout(() => {
      transition(newMode)
    }, 1250)
  }

  return (
    <Container>
      <Button onClick={() => buffer(CREATE)} >CREATE</Button>
      <Button onClick={() => buffer(ACTIVE)} >ACTIVE</Button>
      <Button onClick={() => buffer(OPEN)}   >OPEN  </Button>
      <Button onClick={() => buffer(CLOSED)} >CLOSED</Button>
      <Button onClick={() => buffer(SEARCH)} >SEARCH</Button>

      {mode === LOADING && <Loading />}
      {mode === CREATE && (
        <CreateParlay
          user={user}
          games={games.filter(game => {
            if (game.status === "NS")
              return game
          })}
          onSubmit={() => buffer(OPEN)}
        />
      )}
      {mode === ACTIVE && (
        userParlays.map(parlay => {
            if (parlay.status === "in-progress")
              return (
                <Div key={parlay.id}>
                  <ShowParlay 
                    name={parlay.name} 
                    bets={parlay.bets.length}
                    participants={parlay.users}
                    entry={parlay.fee}
                    start_time={parlay.start_time}
                  />
                </Div>
              )
          })
      )}
      {mode === OPEN && (
        <Parlay>
          {
            userParlays.map(parlay => {
              // get parlay information
              if (parlay.state === "FILL")
                return (
                  <Div key={parlay.id}>
                    <FillParlay 
                      user={user}
                      parlay_id={parlay.id}
                      games={games}
                      onSubmit={() => buffer(OPEN)}
                    />
                  </Div>
                )
              else 
                if (parlay.status === "open")
                  return (
                    <Div key={parlay.id}>
                      <ShowParlay 
                        name={parlay.name} 
                        bets={parlay.bets.length}
                        participants={parlay.users}
                        entry={parlay.fee}
                        start_time={parlay.start_time}
                      />
                    </Div>
                  )
                return <div></div>
            })
          }
        </Parlay>
      )}
      {mode === CLOSED && (
        userParlays.map(parlay => {
            if (parlay.status === "close")
              return (
                <Div key={parlay.id}>
                  <ShowParlay
                    name={parlay.name} 
                    bets={parlay.bets.length}
                    participants={parlay.users}
                    entry={parlay.fee}
                  />
                </Div>
              )
          })
      )}
      {mode === SEARCH && (
        <Fragment>
          <SearchContainer>
            <input type="text" onChange={(e) => search(e.target.value)} />
          </SearchContainer>

          <ResultContainer>
            {
              searchRes.map(search => {
                return (
                  <SearchResult>
                    <button onClick={() => {
                      setSearchRes([search])
                      transition(JOIN)
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
                  onSubmit={() => buffer(OPEN)}
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
