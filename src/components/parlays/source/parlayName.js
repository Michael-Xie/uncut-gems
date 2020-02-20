import React from "react"
import styled from "styled-components"

const TextArea = styled.textarea`
  max-width: 400px;
  height: 20px;
  width: 100%;

  margin-bottom: 20px;

  font-size: 18px;
  padding: 10px;

  overflow:hidden;
  resize: none;  
  text-align: justify;
  text-align-last: center;
`

export default function TextAreaExample({ value, setName }) {

  return (
    <TextArea
      id="text"
      maxLength="50"
      value={value}
      placeholder="Enter your parlay Name"
      onChange={v => setName(v.target.value)}
    />
  );
}