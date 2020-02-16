import React from "react"
import styled from "styled-components"

const Article = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 80vw;
  height: 20vh;
  margin: 2vw auto 0;
  border: 1px solid rgba(219,219,219);
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    width: 60vw;
  }

  &:active {
    box-shadow:inset 0 0 10px #000000;
  }
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
`

const Img = styled.img`
  display: flex;
  align-self: center;
  width: 15%;
  height: 50%;

  @media only screen and (min-width: 768px) {
    width: 20%;
  }
`

export default function Loading() {
  return (
    <Article>
      <img src="https://i.gifer.com/YCZH.gif"/>
    </Article>
  );

}

