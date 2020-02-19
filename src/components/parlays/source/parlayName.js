import React from "react"
import styled from "styled-components"


export default function TextAreaExample({ value , setName } ) {
  
  return (
      <form>
          <label text="">
              <textarea
                  value={value}
                  placeholder="Enter your parlay Name"
                  onChange={v => setName(v.target.value)}
              />
          </label>
      </form>
  );
}