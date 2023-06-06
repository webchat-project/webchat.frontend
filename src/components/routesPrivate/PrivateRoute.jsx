import React from "react";
import { Navigate } from "react-router-dom";


export default function PrivateRoute({ children , jwt }) {

  return jwt ? children : <Navigate to="/login"/>;
}
