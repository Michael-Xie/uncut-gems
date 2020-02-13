import React from "react";
import styled from "styled-components"


const Wrapper = styled.article`
  width: 600px;
  background-color: #fff;
  margin: 0 auto 30px;
  box-shadow: 0 8px 6px -6px black;
`


const QuarterPoints = styled.div`
  display:flex;
  justify-content: space-evenly ;
  padding: 5px 0;

`
const Quarter = styled.h4`

`


export default function StatsBox ({ homeFirstQ, homeSecondQ, homeThirdQ, homeFourthQ, awayFirstQ, awaySecondQ, awayThirdQ, awayFourthQ, homeTotal, awayTotal }) {
  return (
    <Wrapper>
      <QuarterPoints>
        {homeFirstQ}
        <Quarter>First Quarter</Quarter>
        {awayFirstQ}
      </QuarterPoints>

      <QuarterPoints>
        {homeSecondQ}
        <Quarter>Second Quarter</Quarter>
        {awaySecondQ}
      </QuarterPoints>

      <QuarterPoints>
        {homeThirdQ}
        <Quarter>Third Quarter</Quarter>
        {awayThirdQ}
      </QuarterPoints>

      <QuarterPoints>
        {homeFourthQ}
        <Quarter>Fourth Quarter</Quarter>
        {awayFourthQ}
      </QuarterPoints>
    </Wrapper>

  );

}