import React, {useState, useEffect} from "react"
import styled from "styled-components"

import teamData from "../../../helpers/teamData"
import Expansion from "../../partials/expansion_panel"

const Article = styled.div`
`

const Parlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 600px;
  margin-bottom: 10px;
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
  border-bottom: 1px solid #000;
  color: #fff;
  font-size: 1.15rem;
  background-color: #000;
  background-image: url("https://www.transparenttextures.com/patterns/blizzard.png");
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
  width: 33%;
`

const BetTitle = styled.div`
  justify-content: center;
  width: 10%;
  background: #ff0;
`

export default function ActiveParlay({
  name, bets, user_bets, participants, entry, 
  parlay_id, games, scores, parlays, users, rankings
  }) {

  return (
    <Article>
      <Parlay>
        <Title>
          <Name>{name}</Name>
          <Prize> ${entry}.00 / ${participants.length * entry}.00 </Prize>
        </Title>
        <Expansion
          parlay_id={parlay_id}
          participants={participants}
          rankings={rankings}
          bets={bets} 
          games={games} 
          scores={scores} 
          teamData={teamData}
          user_bets={user_bets}
        />
        <br/>
        <svg viewBox="-34 0 512 512" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="m221.703125 0-221.703125 128v256l221.703125 128 221.703125-128v-256zm0 0" fill="#96a0f0" /><path d="m374.6875 168.15625v176.660156l-152.984375 88.320313-152.984375-88.320313v-176.660156l152.984375-88.320312zm0 0" fill="#39689f" /><g fill="#75e1f7"><path d="m221.703125 0v79.832031l152.988281 88.328125 68.714844-40.160156zm0 0" /><path d="m443.40625 384-68.714844-39.1875-152.988281 88.328125v78.859375zm0 0" /><path d="m0 128 68.714844 40.160156v176.652344l-68.714844 39.1875zm0 0" /></g><path d="m374.6875 168.15625v176.660156l-152.984375 88.320313v-353.300781zm0 0" fill="#224370" /></svg>
      </Parlay>
    </Article>
  );

}

