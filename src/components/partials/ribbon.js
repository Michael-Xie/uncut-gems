import React from "react"
import styled from "styled-components"


const Wrapper = styled.div`
 
`

const Ribbon = styled.img `
  


  background-color: gold;
  
`

const Banner = styled.svg` 
  fill: gold;
  position: relative;
  bottom: -100px;
  max-width:150px;
  width:100%;
  z-index: 40;
 
`

const UserName = styled.h1` 
  color: red;
  z-index: 999;
`

const UserPhoto = styled.img`
  max-height: 25px;
  height: 100%;
`

export default function Navigation({ username, userphoto, place}) {

  return (
    <Wrapper>
     <UserPhoto src={userphoto} />
      <Banner version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	viewBox="0 0 31.617 31.618"  
	 xmlSpace="preserve">
<g>
	<path d="M31.557,14.855c0.087-0.168,0.08-0.368-0.018-0.529c-0.099-0.161-0.272-0.26-0.461-0.26H27.68v-2.944
		c0-0.299-0.242-0.54-0.54-0.54H4.478c-0.298,0-0.54,0.241-0.54,0.54v2.944H0.54c-0.188,0-0.364,0.099-0.461,0.26
		s-0.104,0.361-0.018,0.529l1.403,2.696l-1.403,2.694c-0.087,0.168-0.08,0.368,0.018,0.529s0.273,0.26,0.461,0.26h6.577
		c0.298,0,0.54-0.241,0.54-0.54v-2.943h16.305v2.943c0,0.299,0.242,0.54,0.54,0.54h6.577c0.188,0,0.363-0.099,0.461-0.26
		c0.097-0.161,0.104-0.361,0.018-0.529l-1.401-2.694L31.557,14.855z M7.036,20.453l-3.098-2.901h3.098V20.453z M24.582,20.453
		v-2.901h3.098L24.582,20.453z"/>
</g>

</Banner>

<UserName>{username}</UserName>
      {/* <Ribbon place={place} src="https://images.vexels.com/media/users/3/166337/isolated/preview/3c76e8511ec08b2246c44bd8183c567b-graduation-award-ribbon-flat-by-vexels.png" alt="ribbon"/> */}
    </Wrapper>
  )

}