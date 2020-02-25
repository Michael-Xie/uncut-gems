import React from "react"
import styled from "styled-components"


const Wrapper = styled.div`
  display: flex;
  justify-content:center;
  flex-direction: column;
  align-content:center;
  background-color: ${props => props.rank === 1 ? 'rgb(255,223,0, .5)' : props.rank === 2 ? 'silver' : props.rank === 3 ? '#cd7f32' : '#fff'};
  border: 1px solid #DBDBDB;
  padding: 5px;
  margin-right: 5px;
  max-width: 90px;
  width:100%;
  overflow-wrap: break-word;
  font-size: 12px;
  font-weight:bold;
`

const Photo = styled.img`
  margin: 0 auto;
`

const Text = styled.div`
  text-align: center;
`
const Right = styled.div`
  
`



export default function UserRanked({ username, rank, userphoto, points, payout }) {
  return (
    <Wrapper rank={rank} >
      <Photo  src={userphoto} alt={username} height="40px" width="40px" />
      <Text>{username}</Text>
      <Text>{points} points</Text>
    </Wrapper>
  )
}
