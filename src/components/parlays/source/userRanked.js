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
  font-size: 12px;
`
const Right = styled.div`
  
`



export default function UserRanked({ username, rank, userphoto, points, payout }) {
  return (
    <Wrapper rank={rank} >
      <Photo  src={userphoto} alt={username} height="50px" width="50px" />
      <Text>{username}</Text>
      <Text>{points} points</Text>
      <Text>{payout} <img src="https://i.imgur.com/NhP56Q2.png" alt="gem-icon" height="18px" width="18px" /></Text>
    </Wrapper>
  )
}
