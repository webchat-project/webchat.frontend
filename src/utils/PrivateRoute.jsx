import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, jwt }) {

  // Controlla se esiste il token jwt, nel caso in cui non esista allora riporta alla pagina di login
  return jwt ? children : <Navigate to="/login" />;
}
