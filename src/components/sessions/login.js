import React, {useState} from "react";
import styled from "styled-components"
import axios from "axios"
import {Link} from "react-router-dom"

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
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="error-container">
          {error.map((msg, i) => {
            return <div key={i} className="error-message">{msg}</div>
          })}
        </div>
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
      <Link to="/register">Register</Link>
    </>
  )
}

