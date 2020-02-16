import React from "react";
import styled from "styled-components"


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
const Title = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
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


  &:hover {
    color: grey;
  }
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

export default function parlay({ }) {
  return (
    <Article>

      <Title>
        <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
        &nbsp;  &nbsp;
       <h1>J_Dog's Parlay</h1>
      </Title>

      <ParlayInfo>
        <Info>Closes in 30 minutes (730 pm)</Info>
        <Info>4 total bets</Info>
        <Info>5$ Entry</Info>
        <Info>20$ PotSize</Info>

      </ParlayInfo>
      <div class="separator">4 paticipants</div>
      <Rankings>

        <User>
          <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
          J_Dog
      </User>
        <User>
          <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
          Sand Pills
      </User>
        <User>
          <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
          Pizani
      </User>
        <User>
          <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
          Pizani
      </User>
        <MoreUsers>... 5 more</MoreUsers>

      </Rankings>
    </Article>
  );

}

