import React from "react"
import styled from "styled-components"
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const Article = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  height: 50px;

  margin: 0 auto;
`
const Load = styled.img`
 max-height: 40px;
 max-width: 40px;
 height: 100%;
`

export default function Loading() {


  return (
    <Article>
      <Load src="https://i.imgur.com/Ge37ukG.gif" alt="loading"/>
    </Article>
  
  );
}
