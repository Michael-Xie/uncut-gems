import React, { useState } from "react";
import axios from "axios"
import styled from 'styled-components'



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


export default function Register({ dispatch }) {
  const [error, setError] = useState([]);

  const handleRegister = (event) => {
    event.preventDefault()
    const user = event.target.username.value
    const password = event.target.password.value
    const password_confirmation = event.target.password_confirmation.value

    const errors = [];

    const randomUserPhoto = () => {
      const x = ['https://i.imgur.com/3cIY14i.png', 'https://i.imgur.com/XhF02ie.png']
      return x[Math.floor(Math.random() * (x.length))];
    }

    if (password !== password_confirmation) {
      errors.push("Passwords do not match.");
    }
    if (password.length === 0) {
      errors.push("Password is empty.");
    }
    if (user.length === 0) {
      errors.push("Username is empty.");
    }
    if (errors.length === 0) {
      axios.post("/api/users", {
        user_name: user,
        user_photo: randomUserPhoto(),
        password: password,
        stripe_charge_id: null
      },
        { baseURL: 'https://uncut-gems-api-server.herokuapp.com' })
        .then(res => {
          if (Object.keys(res.data).length > 0) {
            localStorage.setItem('user', JSON.stringify(res.data));
            console.log("registered and logged in:", localStorage.getItem('user'));

            dispatch({
              type: "SET_USER",
              value: res.data
            });
          } else {
            setError((prev) => [...prev, "User name already exists."]);

          }
        })
        .then(() => axios.get(`http://uncut-gems-api-server.herokuapp.com/api/global/1`))
        .catch(err => console.log(err))
    }
    setError(errors);

  }
  return (
    <Wrapper>
      <Title>Register</Title>
      
      <Form onSubmit={handleRegister}>
        <div className="error-container">
          {error.map((msg, i) => {
            return <div key={i} className="error-message">{msg}</div>
          })}
        </div>
        <Label>
          User name
          <Input type="text" name="username" />
        </Label>
        
        <Label>
          Password
          <Input type="password" name="password" />
        </Label>
        <Label>
          Confirm Password
          <Input type="password" name="password_confirmation" />
        </Label>
        <Submit type="submit">Submit</Submit>
      </Form>
    </Wrapper>
  )
}

