import React from "react"
import styled from "styled-components"

import useVisualMode from "../../hooks/useVisualMode"

import AddGroup from "./addGroup"
import Form from "./form"
import Loading from "./loading"
import Group from "./group"

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

// [TODO] make a function that queries the username.
const userGroups = (username) => {
  const groups = []
  return groups
}

const Groups = ({}) => {
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
      <Div>{mode === ADD && <AddGroup onClick={() => buffer(FORM)} />}</Div>
      <Div>{mode === FORM  && <Form onSubmit={() => buffer(CONFIRM)}/>}</Div>
      <Div>{mode === LOADING  && <Loading />}</Div>
      
      <Div>
        <Group 
          groupName="uncut" 
          username="jamie" 
          userphoto="https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png"
        />
      </Div>
    </Container>
  )
}

export default Groups
