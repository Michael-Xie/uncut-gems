import React from "react";
import styled from "styled-components"
//import handleRegister from "../../models/register"
import axios from "axios"

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

export default function Form({ reducer }) {
  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  )
}

