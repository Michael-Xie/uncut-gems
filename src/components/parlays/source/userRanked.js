import React from "react"
import styled from "styled-components"


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.rank === 1 ? 'gold' : props.rank === 2 ? 'silver' : props.rank === 3 ? '#cd7f32' : '#fff'};
`

const Left = styled.div`
  
`

const Text = styled.h1`
  
`
const Right = styled.div`
  
`



export default function UserRanked({ username, rank, userphoto, points, payout }) {
  return (
    <Wrapper rank={rank}>
      <img src={userphoto} alt={username} height="30" width="30px" />
      <div>{username}</div>
      <div>{points}</div>
    </Wrapper>
  )
}
