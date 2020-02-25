import React from "react";
import styled from "styled-components"


const Wrapper = styled.article`
  max-width: 600px;
  width:100%;
  background-color: #fff;
  box-shadow: 0 8px 6px -6px black;

  margin: 0 auto;
`


const QuarterPoints = styled.div`
  display:flex;
  justify-content: space-between;
  
  margin: 0 20%;
  padding: 5px 0;

`
const Quarter = styled.h4`
`


export default function StatsBox({ homeFirstQ, homeSecondQ, homeThirdQ, homeFourthQ, awayFirstQ, awaySecondQ, awayThirdQ, awayFourthQ }) {
  return (
    <Wrapper>
      <QuarterPoints>
        {awayFirstQ}

        <Quarter>First Quarter</Quarter>
        {homeFirstQ}
      </QuarterPoints>

      <QuarterPoints>
        {awaySecondQ}
        <Quarter>Second Quarter</Quarter>

        {homeSecondQ}
      </QuarterPoints>

      <QuarterPoints>
        {awayThirdQ}
        <Quarter>Third Quarter</Quarter>

        {homeThirdQ}
      </QuarterPoints>

      <QuarterPoints>
        {awayFourthQ}
        <Quarter>Fourth Quarter</Quarter>

        {homeFourthQ}
      </QuarterPoints>
    </Wrapper>

  );

}
