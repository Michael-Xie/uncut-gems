import React from "react"
import styled from "styled-components"

const Article = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: 300px;
  width: 100%;
  height: 100px;
  margin: 10px 0;
  border: 1px solid rgba(219,219,219);
  
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    width: 60vw;
  }

  &:active {
    box-shadow:inset 0 0 10px #000000;
  }
`

export default function Loading() {
  return (
    <Article>
      <img src="https://i.gifer.com/YCZH.gif" alt="loading"/>
    </Article>
  );

}

