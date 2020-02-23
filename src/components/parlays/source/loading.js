import React from "react"
import styled from "styled-components"

const Article = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: 600px;
  width: 100%;
  height: 50px;
  border: 1px solid #dbdbdb;

  margin: 0 auto;
`
const Load = styled.img`
 max-height: 20px;
 max-width: 20px;
 height: 50%;
`

export default function Loading() {
  return (
    <Article>
      <Load src="http://cdn.lowgif.com/full/d9675675623d5f27-loading-gif-transparent-background-loading-gif.gif" alt="loading"/>
    </Article>
  );

}

