import React from "react"
import styled from "styled-components"


const Text = styled.h1`
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 15px 0;
  margin: 0 auto 20px;
  font-size: 18px;
  
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
`

export default function Title({title}) {
  return ( 
   
    <Text>{title}</Text>

  )
}