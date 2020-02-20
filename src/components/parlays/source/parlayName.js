import React from "react"
import styled from "styled-components"

const Form = styled.div`
 
`

const TextArea = styled.textarea`
  max-width: 400px;
  width: 100%;
  resize: none;
  
`

export default function TextAreaExample({ value , setName } ) {
  
  return (
      <Form>
          <label text="">
              <TextArea
                  value={value}
                  placeholder="Enter your parlay Name"
                  onChange={v => setName(v.target.value)}
              />
          </label>
      </Form>
  );
}