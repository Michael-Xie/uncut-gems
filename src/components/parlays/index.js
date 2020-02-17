import React, {useState, useEffect} from "react"
import styled from "styled-components"

import useVisualMode from "../../hooks/useVisualMode"

import Create from "./source/create"
import Loading from "./source/loading"
import Form from "./source/form"

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

const Parlays = ({user, games}) => {
  const ADD     = "ADD"
  const FORM    = "FORM"
  const LOADING = "LOADING"
  const REFRESH = "REFRESH"
  // get the visual mode for create button.
  const {mode, transition, back} = useVisualMode(ADD)
  const [activeParlays, setParlays] = useState([])
  // transitions
  const buffer = (new_mode) => {
    transition(LOADING)
    setTimeout(() => {
      transition(new_mode)
    }, 2000)
  }
  // check if user is in any active parlays.
  useEffect(() => {
    setParlays([])
    axios.get(`http://localhost:8001/api/participants/${user.user_name}`)
      .then(res => {
        res.data.forEach(parlay => {
          setParlays(prev => ([...prev, parlay]))
        })
      })
  }, [mode])


  // if user is not logged in return null [TODO] redirect.
  if (Object.keys(user).length === 0)
    return <div></div>

  return (
    <Container>
      <Div>{mode === ADD && <Create onClick={() => buffer(FORM)} />}</Div>
      <Div>{mode === FORM && <Form user={user} games={games} onSubmit={() => buffer(ADD)} />}</Div>
      <Div>{mode === LOADING  && <Loading />}</Div>
    </Container>
  )
}

export default Parlays
