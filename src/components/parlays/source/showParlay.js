import React from "react"
import styled from "styled-components"

import ShowParticipants from './showParticipants'
import { findAllByAltText } from "@testing-library/react"

const Article = styled.article` 
  background-color: #fff;
  width: 600px;

  margin: 30px auto 0;
  border: 1px solid rgba(219,219,219);
  

  &:hover {
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
  }
`

const Header = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 20px;
`

const Title = styled.h1`
 

`

const Rankings = styled.section`
  display: flex;
  justify-content: center;

  margin: 10px auto;
`

const User = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  align-content: flex-end;
  padding: 0 10px;
  cursor:pointer;

`
const Name = styled.div` 
  font-size: 18px;
  margin-top: 5px;
`

const MoreUsers = styled.p`
  display:flex;
  align-items:flex-end;
`

const ParlayInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items:center;

  margin: 10px;
  
`

const Info = styled.h1`
  margin: 5px;
`



export default function ShowParlay({ name, bets, participants, entry, start_time, rankings }) {


  const displayRank = (rank) => {
    const x = rankings[rank]
    return x
  }




  console.log('Participants', participants)
  console.log('Rankings', rankings)

  return (

    <Article>
      <Header>
        <Title>
          {name}
        </Title>
        <div></div>

        <Info><img src="https://toppng.com/uploads/preview/em-svg-png-icon-free-download-gem-icon-11563228146u2haxp4svc.png" alt="gem-icon" height="20px" width="20px" /> {participants.length * entry} </Info>
      </Header>

      {/* <div className="separator">{participants.length} participant(s)</div> */}
      <Rankings>
        {/* {console.log(displayRank('1'))} */}
        {console.log('Display Rank', displayRank('1'))}
        {
          displayRank(1).map(player => {
            const names = Object.keys(player)
            for (let i = 0; i < names.length || i === 3; i++) {

              return (
                <div>
                  <div>{names[i]}</div>
                  <div>{player[names][0]}</div>
                  <div>{player[names][1]}</div>
                </div>
              )
            }
          })

        }
        {/* {
          displayRank('2').map(player => {
            const names = Object.keys(player)
            return (
              <div>{names[0]}</div>
            )
          })

        } */}


        {/* {
          participants.map(player => {
            return (
              <User key={player.user_name}>
                <img
                  src='https://i.imgur.com/pYla8hh.png'
                  alt='#'
                  height="50px"
                  width="50px"
                />
                <Name>{player.user_name}</Name>
           
              </User>
            )
          })
        } */}

        <ShowParticipants />

      </Rankings>
    </Article>
  );

}

