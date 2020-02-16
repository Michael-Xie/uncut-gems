import React from "react";
import styled from "styled-components"

const Article = styled.article` 
  display:flex;
  justify-content:center;
  background-color: #fff;
  width: 80vw;
  height: 20vh;
  margin: 2vw auto 0;
  border: 1px solid rgba(219,219,219);
  cursor:pointer;

  @media only screen and (min-width: 768px) {
    width: 60vw;
  }

  &:active {
    box-shadow:inset 0 0 10px #000000;
  }
`

const FormStyled = styled.form`
  
`

const handleForm = (event) => {

}

export default function Form({onSubmit}) {
  return (
    <Article>
      <FormStyled onSubmit={handleForm}>
        <span>Group Name</span>
          <input type="text" name="name" />
      </FormStyled>
    </Article>
  );

}

