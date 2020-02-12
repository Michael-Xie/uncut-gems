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

  &:hover {
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
  } 
`

const Text = styled.h1`
  
`



export default function AddGroup() {
  return (
    <Article>
      <Text>Add Group</Text>
    </Article>
  );

}

