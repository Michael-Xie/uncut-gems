import React from "react"
import styled from "styled-components"

import ParlayMenu from './parlayMenu'

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
  height: 50px;
  margin: 0 auto 0px;
  font-size: 16px;
  font-weight: bold;
`

const Left = styled.div`
  
`

const Text = styled.span`
  font-size: 1.25rem;
`
const Right = styled.div`
  width: 36px;
`

const Numbers = styled.span`
  font-size: 1.30rem;
  color: #444;
  padding: 5px;
  margin-right: 5px;
  font-weight: bolder;
  
`



export default function Title({ title, buffer, number }) {
  return (
    <Wrapper>
      <Left>
        <ParlayMenu
          buffer={buffer}
        />
      </Left>

      <Text><Numbers>{number}</Numbers>{title}</Text>
      <Right></Right>
    </Wrapper>
  )
}
