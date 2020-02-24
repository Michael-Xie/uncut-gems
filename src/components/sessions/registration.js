import React, { useState } from "react";
import axios from "axios"


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
      axios.post("/api/users", {
        user_name: user,
        password: password,
        stripe_charge_id: null
      },
      {baseURL: 'https://uncut-gems-api-server.herokuapp.com'})
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
    <>
      <h2>Register</h2>
      <div className='announcement'>All new registrants will receive 20 opals! </div>
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

