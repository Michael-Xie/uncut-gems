import React from "react";
import { Redirect } from "react-router-dom"

export default function Logout() {
  localStorage.clear('user');
  return (
    <Redirect to={{ pathname: "/login" }} />
  )
}

