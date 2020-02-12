import React from "react";
import styled from "styled-components"

const Article = styled.article` 
  background-color: #fff;
  width: 600px;
  height: 200px;
  margin: 30px auto 0;
  border: 1px solid rgba(219,219,219);

  &:hover {
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
  }
`

const Header = styled.section`
  display:flex;
`

const Title = styled.h1`
  font-size: 20px;
  margin: 20px 30px;
  letter-spacing: 2px;
  text-transform: uppercase;

`

const Admin = styled.div`
  display:flex;
  border:1px solid black;
`

const User = styled.div`
  display:flex;
  align-items:center;
  cursor:pointer;
  font-size: small;
  padding-right: 10px;
`

const Divider = styled.hr`
  width: 90%;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
`

const Body = styled.div`
  display:flex;
`

const Section = styled.div`
  width:50%;
`

const Heading = styled.h2`
  text-align:center;
  margin:5px 0 0 0;
`

const ActiveParlays = styled.span`
  margin:auto;
  font-size: 50px;
`


const Footer = styled.footer`
  display:flex;
  justify-content: center;
`

const UserList = styled.a`
  padding-top: 5px;
  font-size: 11px;
`

export default function Group({ groupName, username, userphoto }) {
  return (
    <Article  >
      <Header>

        <Title>{groupName}</Title>
        <Admin>
          <User>
            <img src={userphoto} alt={username} height="24px" width="24px"></img>
            &nbsp;
              {username}
          </User>
        </Admin>
      </Header>
      {/* <Divider /> */}
      <Body>
        <Section>
          <Heading>5 Total Bets</Heading>
        </Section>
        
      

      {/* <Divider /> */}

      <Section>
        <User>
          <img src={userphoto} alt={username} height="20px" width="20px"></img>
          &nbsp;
              {username}
        </User>
        <User>
          <img src={userphoto} alt={username} height="20px" width="20px"></img>
          &nbsp;
              {username}
        </User>
        <User>
          <img src={userphoto} alt={username} height="20px" width="20px"></img>
          &nbsp;
              {username}
        </User>

        <UserList>... 5 more</UserList>
      </Section>
      </Body>
    </Article>
  );

}

