import React, {useState, useEffect} from "react"
import styled from "styled-components"

import useVisualMode from "../../hooks/useVisualMode"

import Create from "./source/create"
import Loading from "./source/loading"
import Form from "./source/form"
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

const Parlays = ({user, games, parlays}) => {
  // constants to handle visual transitions.
  const ADD      = "ADD"
  const FORM     = "FORM"
  const LOADING  = "LOADING"
  const COMPLETE = "COMPLETE"

  // get the visual mode for create button.
  const {mode, transition} = useVisualMode(ADD)
  // parlays that the user has participated in.
  const [userParlays, setUserParlays] = useState([])
  // state to handle search bar -- searching parlays by name (default shows all
  const [openParlays, setOpenParlays] = useState([...parlays])
  // open parlays that can be joined.
  const [searchRes, setSearchRes] = useState([])

  // helper function for the search feature.
  const search = (value) => {
    if (value === '')
      return setSearchRes([])
    axios.get(`http://localhost:8001/api/parlays/${value}`)
      .then(res => {
        if (res.data.length === 0)
          return setSearchRes([{name: "No results"}])
        return setSearchRes([...res.data])
      })
      .catch(err => console.log(err))
  }
  // if the user has participated in a parlay (filled out a bet form)
  // show the parlay.
  const showParlay = (parlay, parlayInformation) => {
    parlayInformation["state"] = "SHOW"
    Promise.resolve(
      axios.get(`http://localhost:8001/api/parlay/${parlay.id}/participants/${user.user_name}`))
      .then(res => {
        if (res.data.length !== 0) {
          parlayInformation["id"]    = parlay.id
          parlayInformation["name"]  = parlay.name
          parlayInformation["fee"]   = parlay.fee
          parlayInformation["users"] = []
          parlayInformation["bets"]  = []
          // get the rest of the participants.
          axios.get(`http://localhost:8001/api/parlay/${parlay.id}/participants`)
            .then(res => {
              res.data.map(player => {
                parlayInformation.users.push(player.user_name)
              })
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
  // transitions
  const buffer = (new_mode) => {
    transition(LOADING)
    setTimeout(() => {
      transition(new_mode)
    }, 1200)
  }
  // get all the parlays the user has participated in.
  useEffect(() => {
    setUserParlays([])
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
        })
      })
  // now update the parlays search table.
  axios.get("http://localhost:8001/api/parlays/open")
    .then(res => {
      res.data.map(parlay => {
        return setOpenParlays(prev => [...prev, parlay])
      })
    })

  }, [mode === "COMPLETE"])

  // if user is not logged in return null [TODO] redirect.
  if (Object.keys(user).length === 0)
    return <div></div>

  return (
    <Container>
      <SearchContainer><input tpye="text" onChange={(e) => search(e.target.value)} /></SearchContainer>
      <ResultContainer>{searchRes.map(search => <SearchResult><a href='#'>{search.name}</a></SearchResult>)}</ResultContainer>
      <Div>{mode === ADD && <Create onClick={() => buffer(FORM)} />}</Div>
      <Div>{mode === FORM && <Form user={user} games={games} onSubmit={() => buffer(COMPLETE)} />}</Div>
      <Div>{mode === LOADING  && <Loading />}</Div>
      <Div>{mode === COMPLETE && <Create onClick={() => buffer(FORM)} />}</Div>
      <Parlay>
        {
          userParlays.map(parlay => {
            // get parlay information
            if (parlay.state === "FILL")
              return (
                <Div key={parlay.id}>
                  <FillParlay 
                    user_id={user.id}
                    parlay_id={parlay.id}
                    games={games}
                    onSubmit={() => buffer(COMPLETE)}
                  />
                </Div>
              )
            else 
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
        }
      </Parlay>
      <br/><br/>
    </Container>
  )
}

export default Parlays
