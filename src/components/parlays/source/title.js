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

border-bottom: 1px solid #dbdbdb;
background-color: #fff;
`

const Left = styled.div`
  
`

const Text = styled.h1`
font-size: 24px;
  
`
const Right = styled.div`
  width: 36px;
`



export default function Title({ title, buffer }) {
  return (
    <Wrapper>
      <Left>
        <ParlayMenu
          buffer={buffer}
        />
      </Left>

      <Text>{title}</Text>
      <Right></Right>
    </Wrapper>
  )
}
