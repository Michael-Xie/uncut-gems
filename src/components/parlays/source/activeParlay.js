import React, {useState, useEffect} from "react"
import styled from "styled-components"

import teamData from "../../../helpers/teamData"
import Expansion from "../../partials/expansion_panel"

const Article = styled.div`
  margin-top: 10px;
`

const Parlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 600px;
  margin-bottom: 10px;
  border: 1px ridge #000;
`

const Games = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0,0,255,0.25);
  padding-top: 5px;
  padding-bottom: 5px;
`

const Game = styled.div`
  width: 33%;
`

const Title = styled.h3`
  display: flex;
  width: 100%;
  background-color: #999;
  border-bottom: 1px solid #000;
  font-size: 1rem;
`

const Name = styled.span`
  padding: 5px;
  width: 50%;
  text-align: left;
`

const Prize = styled.span`
  padding: 5px;
  width: 50%;
  text-align: end;
`

const Logo = styled.img`
  width: 20%;
`

const Participants = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  width: 100%;
`

const Participant = styled.div`
  width: 33%;
`

const ParticipantInfo = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const PlayerImage = styled.img`
  background-color: ${props => props.color};
  border-radius: 50%;
`

const Bets = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Bet = styled.div`
  width: 33%
`

const BetTitle = styled.div`
  justify-content: center;
  width: 10%;
  background: #ff0;
`

export default function ActiveParlay({
  name, bets, user_bets, participants, entry, 
  parlay_id, games, scores, parlays, users
  }) {

  return (
    <Article>
      <Parlay>
        <Title>
          <Name>{name}</Name>
          <Prize> ${entry}.00 / ${participants.length * entry}.00 </Prize>
        </Title>
        <Expansion 
          bets={bets} 
          games={games} 
          scores={scores} 
          teamData={teamData}
          user_bets={user_bets}
        />
      </Parlay>
    </Article>
  );

}

