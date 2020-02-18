import React from "react";
import { Redirect } from "react-router-dom"

export default function Logout({dispatch}) {
  localStorage.clear('user');
  dispatch({
    type: "SET_USER",
    value: {}
  });

  return (
    <Redirect to={{ pathname: "/login" }} />
  )
}

