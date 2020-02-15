import React from "react";
import styled from "styled-components"


const Article = styled.article` 
  background-color: #fff;
  width: 600px;
  height: 200px;
  margin: 30px auto 0;
  border: 1px solid rgba(219,219,219);

  &:hover {
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
  }
`
const Rankings = styled.section`
  display: flex;
  justify-content: center;
  width:50%;
`

const User = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  padding: 0 10px;
  cursor:pointer;


  &:hover {
    color: grey;
  }
`
const Info = styled.p`

`

export default function parlay({}) {
  return (
    <Article>
     <Info>4 total bets</Info>
     <Info>Closes in 30 minutes (730 pm)</Info>
    
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


    
      </Rankings>
    </Article>
  );

}

