/*import React from "react";
import Cookies from "universal-cookie";
import { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";


export default function PrivateRoute({children}){


  // we have to validate jwt token here
  const [jwt, setJwt]= useState(null);

  const cookies = useMemo(() => new Cookies(), []);

  setJwt(cookies.get("jwt_authorization"));
  

return (jwt? children : <Navigate to="/login" /> );

}*/