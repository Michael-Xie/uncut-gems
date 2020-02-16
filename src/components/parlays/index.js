import React from "react"
import styled from "styled-components"

import useVisualMode from "../../hooks/useVisualMode"

import Create from "./source/create"
import Loading from "./source/loading"
import Form from "./source/form"

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
const Parlays = ({userInfo, games}) => {
  const ADD     = "ADD"
  const FORM    = "FORM"
  const CONFIRM = "CONFIRM"
  const LOADING = "LOADING"
  // get the visual mode for create button.
  const {mode, transition, back} = useVisualMode(ADD)
  // transitions
  const buffer = (new_mode) => {
    transition(LOADING)
    setTimeout(() => {
      transition(new_mode)
    }, 2000)
  }

  return (
    <Container>
      <Div>{mode === ADD && <Create onClick={() => buffer(FORM)} />}</Div>
      <Div>{mode === FORM && <Form games={games} onSubmit={() => buffer(CONFIRM)} />}</Div>
      <Div>{mode === LOADING  && <Loading />}</Div>
    </Container>
  )
}

export default Parlays
