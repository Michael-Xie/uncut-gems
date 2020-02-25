import React, { useState } from "react";
import styled from "styled-components"
import axios from "axios"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  width:100%;
  
  
`
const Video = styled.img`
  max-width:320px;
  max-height: 100px;
  height: 100%;
  width: 100%;
 
  opacity: 0.5;
`

const Title = styled.h1` 
  text-align:center;
  padding: 50px;
 
  font-size:36px;
  color: #fff;
  height: 100px;
  background-image: url('https://www.nba.com/images/cms/2019-07/20190722_KOBE_DUNK.jpg?w=1920&h=1080');
  background-size: cover;
  text-shadow: 2px 1px #000;

`

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 25px;
  padding-right: 25px;


`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  
`

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  margin: 10px 0;
`
const Submit = styled.button`
  background-color: #14191A; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  margin-top: 20px;
  cursor:pointer;
`

export default function Login({ dispatch }) {
  const [error, setError] = useState([]);

  const handleLogin = (event) => {
    event.preventDefault()
    const user = event.target.username.value
    const password = event.target.password.value

    // reset error on next onSubmit
    setError([]);
    
    axios.post("/api/login", {
      user_name: user,
      password: password,
    }, {baseURL: 'https://uncut-gems-api-server.herokuapp.com'}
    )
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          localStorage.setItem('user', JSON.stringify(res.data));
          console.log("logged in:", localStorage.getItem('user'));
          dispatch({
            type: "SET_USER",
            value: res.data
          });
        } else {
          setError((prev) => [...prev, "Error logging in. Please check your user name and password"]);

        }
      })
      .catch(err => console.log(err))

  }
  return (
    <Wrapper>
      {/* <Video  src="https://raw.githubusercontent.com/pizzani/uncut-gems-client/master/images/login_page.gif" /> */}
     
      <Title>Welcome to Uncut Gems</Title>
      

        <Form onSubmit={handleLogin}>
        
          <div className="error-container">
            {error.map((msg, i) => {
              return <div key={i} className="error-message">{msg}</div>
            })}
          </div>
          <Label>
            Username
          <Input type="text" name="username" />
          </Label>
         
          <Label>
            Password
          <Input type="password" name="password" />
          </Label>
          <Submit type="submit">Submit</Submit>
      
   
           <Link className="link"to="/register">Register</Link>
      
    
      </Form>
    </Wrapper>
  )
}

