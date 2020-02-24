import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

import styled from 'styled-components'
const Wrapper = styled.div`
  display: flex;
  margin: 20px auto 0;
  max-width: 600px;
  width:100%;
`
const Video = styled.img`
  max-width:200px;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 25px;
  padding-right: 25px;

  border: 1px solid #000;

  background-color: #fff;

`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  
`

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
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

export default function Register({ dispatch }) {
  const [error, setError] = useState([]);

  const handleRegister = (event) => {
    event.preventDefault()
    const user = event.target.username.value
    const password = event.target.password.value
    const password_confirmation = event.target.password_confirmation.value

    const errors = [];
    
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
      axios.post("http://localhost:8001/api/users", {
        user_name: user,
        password: password,
        stripe_charge_id: null
      })
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
        .catch(err => console.log(err))
    }
    setError(errors);

  }
  return (
    // <>
    //   <h2>Register</h2>
    //   <div className='announcement'>All new registrants will receive 20 opals! </div>
    //   <form onSubmit={handleRegister}>
    //     <div className="error-container">
    //       {error.map((msg, i) => {
    //         return <div key={i} className="error-message">{msg}</div>
    //       })}
    //     </div>
    //     <label>
    //       User name
    //       <input type="text" name="username" />
    //     </label>
    //     <label>
    //       Password
    //       <input type="password" name="password" />
    //     </label>
    //     <label>
    //       Confirm Password
    //       <input type="password" name="password_confirmation" />
    //     </label>

    //     <button type="submit">Submit</button>
    //   </form>
    // </>
    <Wrapper>
    <Video  src="https://raw.githubusercontent.com/pizzani/uncut-gems-client/master/images/login_page.gif" />
   

    

      <Form onSubmit={handleRegister}>
      <h1>Register</h1>
      <div>All new registrants will receive 20 opals! </div>
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
        <Label>
          Confirm Password
        <Input type="password" name="password_confirmation" />
        </Label>
        <Submit type="submit">Submit</Submit>
    
 
         <Link className="link"to="/Login">Login</Link>
    
  
    </Form>
  </Wrapper>
  )
}

