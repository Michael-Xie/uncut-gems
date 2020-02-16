import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom"

export default function Logout() {
  localStorage.clear('user');
  return (
    <Redirect to={{ pathname: "/login" }} />
  )
}

