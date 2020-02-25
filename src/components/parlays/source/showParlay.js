
import React from "react"
import styled from "styled-components"

import ShowParticipants from './showParticipants'

const Article = styled.article` 
    background-color: #fff;
    max-width: 600px;
    width:100%;
    margin: 30px auto 0;
    border: 1px solid rgba(219,219,219);
    
    &:hover {
      box-shadow: 0 8px 6px -6px black;
      cursor: pointer;
    }
  `
const Header = styled.header` 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 15px;
`

const Title = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
  `

const Rankings = styled.section`
    display: flex;
    justify-content: space-evenly;
     margin: 15px 0;
  `

const Fees = styled.div` 
  display: flex;
  
`
const User = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    align-content: flex-end;
   
    cursor:pointer;
  
  `
const MoreUsers = styled.p`
    display:flex;
    align-items:flex-end;
  `

const ParlayInfo = styled.section`
    display: flex;
    justify-content: space-around;
    align-items:center;
  `

const Time = styled.h1`
    font-size: 12px;
  `


const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  text-align: center;
  font-size: 18px;
  margin-bottom: 10px;

  font-weight: bold;
`

const Bottom = styled.div`

  margin-bottom: 5px;
`

export default function ShowParlay({ name, bets, participants, entry, start_time, users }) {
  const findUserByName = (userName) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].user_name === userName) {
        return users[i].user_photo
      }
    }
  }

  return (
    <Article>
      <Header>
        <Title>
          <h1>{name}</h1>
        </Title>
        {start_time > 1 && (
          <Time>{new Date(start_time * 1000).toTimeString().slice(0, 5)} start time</Time>
        )}
      </Header>
      <ParlayInfo>
        <Info>
          <Bottom>Number of bets</Bottom>
          <Top>{bets}</Top>

        </Info>
        <Info>
          <Bottom>Entry Fee</Bottom>
          <Top><img src="https://i.imgur.com/NhP56Q2.png" alt="gem-icon" height="15px" width="15px" />  {entry}</Top>

        </Info>

        <Info>

          <Bottom>Total Pot</Bottom>
          <Top><img src="https://i.imgur.com/NhP56Q2.png" alt="gem-icon" height="15px" width="15px" /> {participants.length * entry}</Top>

        </Info>

      </ParlayInfo>
      <div className="separator">{participants.length} participant(s)</div>
      <Rankings>
        {
          participants.sort().slice(0, 4).map(player => {
            return (
              <User key={player.user_name}>
                <img
                  src={findUserByName(player.user_name)}
                  alt={player.user_name}
                  height="40px"
                  width="40px"
                />
                {player.user_name}
              </User>
            )
          })
        }


        
      </Rankings>
      <ShowParticipants 
        participants={participants}
      />
    </Article>
  );

}
