// File Stile CSS
import "./styles/App.css";
import "./styles/Signup.css";
import "./styles/Login.css";
import "./styles/Side.css";
import "./styles/Main.css";
import "./styles/Chat.css";
import "./styles/Contact.css";
import "./styles/Profile.css";
import "./styles/Message.css";
//import io from "socket.io-client";
import useCookie from "./util/useCookies";

// Componenti
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/routesPrivate/PrivateRoute";

//const socket = io.connect("http://localhost:3001");

export default function App() {
  
  const [jwtToken, setJwtToken] = useCookie("jwt", "");

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <PrivateRoute jwt={jwtToken}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login jwt={jwtToken} setJwt={setJwtToken} />}
        />
      </Routes>
    </>
  );
}
