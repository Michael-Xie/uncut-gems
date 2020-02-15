import React from "react"
import styled from "styled-components"

// EXAMPLE PROPS
// groupName
// totalGroupBets
// groupMembers
// AdminName
// AdminPhoto
// UsersActive total

const Article = styled.article` 
  background-color: #fff;
  width: 100vw;
  margin: 30px auto 0;
  border: 1px solid rgba(219,219,219);

  &:hover {
    box-shadow: 0 8px 6px -6px black;
    cursor: pointer;
  }
`

const Header = styled.section`
  display:flex;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 20px;
  margin: 15px 0 0;
  letter-spacing: 2px;
  text-transform: uppercase;
`

const Admin = styled.div`
  display:flex;
  border:1px solid black;
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
  margin-bottom: 1vh;
`

const Section = styled.div`
  width:60%;
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

const UserList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width:30%;
  border-left: 1px solid black;
`

const User = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  padding:5px 8px;
  cursor:pointer;

  &:hover {
    color: grey;
  }
`

export default function Group({ groupName, username, userphoto }) {
  return (
    <Article>
      <Header>

        <Title>{groupName}</Title>
        {/* <Admin>
          <User>
            <img src={userphoto} alt={username} height="24px" width="24px"></img>
            &nbsp;
              {username}
          </User>
        </Admin> */}
      </Header>
      <Divider />
      <Body>
        <Section>
          <Heading>You have 5 Active parlays</Heading>
          <Heading>5 Total Bets</Heading>

        </Section>


        <UserList>
          Friends in this group
          <User>
            <img src={userphoto} alt={username} height="30px" width="30px"></img>
            &nbsp;
              {username}
          </User>
          <User>
            <img src={userphoto} alt={username} height="30px" width="30px"></img>
            &nbsp;
              {username}
          </User>
          <User>
            <img src={userphoto} alt={username} height="30px" width="30px"></img>
            &nbsp;
              {username}
          </User>
          <User>
            <img src={userphoto} alt={username} height="30px" width="30px"></img>
            &nbsp;
              {username}
          </User>


        </UserList>



      </Body>
    </Article>
  );

}

