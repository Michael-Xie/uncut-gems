import React from "react";
import styled from "styled-components"
//import handleRegister from "../../models/register"
import axios from "axios"


export default function Register({ dispatch }) {
  // const validateRegistration = (username, password, password_confirmation) => {

  // }
  const handleRegister = (event) => {
    event.preventDefault()
    const user = event.target.username.value
    const password = event.target.password.value
    //[TODO] validate username and password
  
    //
    axios.post("http://localhost:8001/api/users", {
      user_name: user,
      password: password,
      wallet_amount: null,
      stripe_charge_id: null
    })
      .then(res => console.log("added to DB"))
      .catch(err => console.log(err))
  }
  
  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          User name
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <label>
          Confirm Password
          <input type="password_confirmation" name="password_confirmation" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

