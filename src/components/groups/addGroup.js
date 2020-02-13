import React from "react";
import styled from "styled-components"

const Article = styled.article` 
  display:flex;
  justify-content:center;
  background-color: #fff;
  width: 400px;
  height: 50px;
  margin: 30px auto 0;
  border: 1px solid rgba(219,219,219);
  cursor:pointer;

  &:active {
    box-shadow:inset 0 0 10px #000000;
  }
`

const Text = styled.h1`
  margin: auto;
`



export default function AddGroup({onclick}) {
  return (
    <Article>
      <Text>Add Group</Text>
    </Article>
  );

}

