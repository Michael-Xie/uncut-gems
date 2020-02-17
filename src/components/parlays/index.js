import React, {useState, useEffect} from "react"
import styled from "styled-components"

import useVisualMode from "../../hooks/useVisualMode"

import Create from "./source/create"
import Loading from "./source/loading"
import Form from "./source/form"
import ShowParlay from "./source/showParlay"

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

const Parlays = ({user, games}) => {
  const ADD      = "ADD"
  const FORM     = "FORM"
  const LOADING  = "LOADING"
  const COMPLETE = "COMPLETE"
  // get the visual mode for create button.
  const {mode, transition} = useVisualMode(ADD)
  const [activeParlays, setParlays] = useState([])
  // transitions
  const buffer = (new_mode) => {
    transition(LOADING)
    setTimeout(() => {
      transition(new_mode)
    }, 1200)
  }
  // get all the parlays the user has participated in.
  useEffect(() => {
    setParlays([])
    axios.get(`http://localhost:8001/api/participants/${user.user_name}`)
      .then(res => {
        res.data.forEach(parlay => {
          const participantInfo = parlay
          axios.get(`http://localhost:8001/api/parlays/${parlay.parlay_id}`)
            .then(res => {
              const parlayInfo = res.data[0]
              participantInfo["fee"]  = parlayInfo.fee
              participantInfo["name"] = parlayInfo.name
              setParlays(prev => ([...prev, participantInfo]))
            })
        })
      })
  }, [mode === "COMPLETE"])

  // if user is not logged in return null [TODO] redirect.
  if (Object.keys(user).length === 0)
    return <div></div>

  return (
    <Container>
      <Div>{mode === ADD && <Create onClick={() => buffer(FORM)} />}</Div>
      <Div>{mode === FORM && <Form user={user} games={games} onSubmit={() => buffer(COMPLETE)} />}</Div>
      <Div>{mode === LOADING  && <Loading />}</Div>
      <Div>{mode === COMPLETE && <Create onClick={() => buffer(FORM)} />}</Div>
      <Parlay>
        {
          activeParlays.map(parlay => {
            // get parlay information
            return (
              <Div key={parlay.id}>
                <ShowParlay 
                  name={parlay.name} 
                  bets={2}
                  participants={2}
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
