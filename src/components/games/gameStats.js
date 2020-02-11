import React from "react";
import styled from "styled-components"
import "./gameStats.css"

const Wrapper = styled.article`
  width: 600px;
  background-color: #fff;
  margin: 0 auto 0;
  box-shadow: 0 8px 6px -6px black;
`
const Bet = styled.button`
  background-color: transparent;
  border:none;
  cursor:pointer;
  display: flex;
  align-items: center;
  font-size:15px;
  padding: 0 ;
  margin-right: 13px;
`

const Icon = styled.span`
  font-size:40px;
`
const Gamebets = styled.div`
  display: flex;
  justify-content: center;
`

const Teamstats = styled.div`
  display: flex;
  justify-content: center;
`

export default function GameStats({}) {
  return (
    <Wrapper>
      <Gamebets>
      <Bet><Icon>Ⓟ</Icon>&nbsp; Pick'em</Bet>
      <Bet><Icon>Ⓣ</Icon>&nbsp; Total Points</Bet>
    </Gamebets>
      <Teamstats>
        <Bet><Icon>Ⓡ</Icon>&nbsp;Rebounds</Bet>
        <Bet><Icon>③</Icon>&nbsp;3 Pointers</Bet>
        <Bet><Icon>Ⓢ</Icon>&nbsp;Steals</Bet>
      </Teamstats>
    </Wrapper>

  );

}
