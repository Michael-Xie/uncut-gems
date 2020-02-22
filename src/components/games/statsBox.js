import React from "react";
import styled from "styled-components"


const Wrapper = styled.article`
  max-width: 600px;
  width:100%;
  background-color: #fff;
  box-shadow: 0 8px 6px -6px black;
`


const QuarterPoints = styled.div`
  display:flex;
  justify-content: space-between;
  
  margin: 0 20%;
  padding: 5px 0;

`
const Quarter = styled.h4`
`


export default function StatsBox ({ homeFirstQ, homeSecondQ, homeThirdQ, homeFourthQ, awayFirstQ, awaySecondQ, awayThirdQ, awayFourthQ }) {
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