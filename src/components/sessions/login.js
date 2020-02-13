import React from "react";
import styled from "styled-components"
//import handleRegister from "../../models/register"
import axios from "axios"

const handleLogin = (event) => {
  event.preventDefault()
  const user = event.target.username.value
  const password = event.target.password.value
  //[TODO] validate username and password

  //
  axios.get("http://localhost:8001/api/users", {
    user_name: user,
    password: password,
  })
    .then(res => console.log("getting info from DB"))
    .catch(err => console.log(err))
}

export default function Login({ reducer }) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          User name
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

