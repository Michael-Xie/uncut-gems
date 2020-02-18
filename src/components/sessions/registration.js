import React, { useState } from "react";
import axios from "axios"


export default function Register({ dispatch }) {
  const [error, setError] = useState([]);

  const handleRegister = (event) => {
    event.preventDefault()
    const user = event.target.username.value
    const password = event.target.password.value
    const password_confirmation = event.target.password_confirmation.value

    setError([]);

    if (password !== password_confirmation) {
      setError((prev) => [...prev, "Passwords do not match."]);
    }
    if (password.length === 0) {
      setError((prev) => [...prev, "Password is empty."]);
    }
    if (user.length === 0) {
      setError((prev) => [...prev, "Username is empty."]);
    }

    if (error.length === 0) {
      axios.post("http://localhost:8001/api/users", {
        user_name: user,
        password: password,
        wallet_amount: null,
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
  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <label>
          Confirm Password
          <input type="password" name="password_confirmation" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

