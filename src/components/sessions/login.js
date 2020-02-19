import React, {useState} from "react";
import styled from "styled-components"
import axios from "axios"
import {Link} from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  


`
const Video = styled.img`
`

const Form = styled.div`
  display: flex;
  flex-direction: column;

`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 10px;
`
const Submit = styled.button`
    background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`
export default function Login({ dispatch }) {
  const [error, setError] = useState([]);

  const handleLogin = (event) => {
    event.preventDefault()
    const user = event.target.username.value
    const password = event.target.password.value

    // reset error on next onSubmit
    setError([]);
    axios.post("http://localhost:8001/api/login", {
      user_name: user,
      password: password,
    })
      .then(res => {
        if (Object.keys(res.data).length>0) {
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
      <Video src="../../../images/login.gif"/> 
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
     
        <Link to="/register">Register</Link>
      </Form>
    </Wrapper>
  )
}

