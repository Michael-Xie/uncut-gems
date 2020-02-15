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
  width:30%;
`

const User = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  cursor:pointer;

  &:hover {
    color: grey;
  }
`


export default function parlay({}) {
  return (
    <Article>
      4 active parlays
      Ranking
    
    <Rankings>
      <User>
            <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
            &nbsp;
              Mikey
      </User>
      <User>
            <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
            &nbsp;
              Mikey
      </User>
      <User>
            <img src='https://raw.githubusercontent.com/JKaram/react-components/master/src/images/img_98061.png' alt='#' height="30px" width="30px"></img>
            &nbsp;
              Mikey
      </User>
      </Rankings>
    </Article>
  );

}

