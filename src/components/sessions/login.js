import React from "react";
import styled from "styled-components"
//import handleRegister from "../../models/register"
import axios from "axios"


export default function Login({dispatch}) {
  const validateLogin = (userName, password, users) => {
    const findUser = users.filter((user) => {
      return user.user_name === userName && user.password === password;
    })
    return findUser.length > 0
  }
  
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
      .then(res => {
        console.log(res);
        console.log("login status", validateLogin(user, password, res.data));
        console.log("getting info from DB");
        if (validateLogin(user, password, res.data)) {
          dispatch({
            type: "SET_USER",
            value: {
              username: user
            }
          });
    
        }
      })
      .catch(err => console.log(err))
  }
  
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

