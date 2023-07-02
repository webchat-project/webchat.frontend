// File Stile CSS
import "./styles/App.css";
import "./styles/Await.css";
import "./styles/Signup.css";
import "./styles/Login.css";
import "./styles/Side.css";
import "./styles/Main.css";
import "./styles/Chat.css";
import "./styles/Contact.css";
import "./styles/Profile.css";
import "./styles/Message.css";
import "./styles/Theme.css";

// Cookies
import UseCookie from "./utils/UseCookies";

// Componenti navigazione
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

// Pagine
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";


// Impostazione tema app
// Root element
var rootElement = document.documentElement;

// Light Theme
var lightTheme = {
  "--back": "#ffffff",
  "--text": "#000000",
  "--main": "rgba(255, 255, 255, 0.8)",
  "--border": "rgba(0, 0, 0, 0.2)",
  "--primary": "#eceff1",
  "--input-focus": "#f2f2f2",
  "--button-hover": "#f2f2f2",
  "--button-click": "#e0e0e0",
  "--sent-message": "#8be9b9",
  "--text-message": "#000000",
  "--loading": "#8be9b9"
}

// Dark Theme
var darkTheme = {
  "--back": "#212121",
  "--text": "#9E9E9E",
  "--main": "rgba(0, 0, 0, 0.9)",
  "--border": "rgba(255, 255, 255, 0.1)",
  "--primary": "#000000",
  "--input-focus": "#263238",
  "--button-hover": "#263238",
  "--button-click": "#1f282c",
  "--sent-message": "#263238",
  "--text-message": "#9E9E9E",
  "--loading": "#8be9b9"
}

// Default color
var defaultColor = {
  "--back": "#ffffff",
  "--text": "#000000",
  "--main": "rgba(255, 255, 255, 0.8)",
  "--border": "rgba(0, 0, 0, 0.2)",
  "--primary": "#eceff1",
  "--input-focus": "#f2f2f2",
  "--button-hover": "#f2f2f2",
  "--button-click": "#e0e0e0",
  "--sent-message": "#8be9b9",
  "--text-message": "#000000",
  "--loading": "#8be9b9"
};

// Gold color
var goldColor = {
  "--back": "#ffffff",
  "--text": "#000000",
  "--main": "rgba(255, 255, 255, 0.8)",
  "--border": "rgba(0, 0, 0, 0.2)",
  "--primary": "#fece2f",
  "--input-focus": "#fff6d7",
  "--button-hover": "#fff6d7",
  "--button-click": "#ffe695",
  "--sent-message": "#ffcc80",
  "--text-message": "#000000",
  "--loading": "#fece2f"
};

// Nature color
var natureColor = {
  "--back": "#ffffff",
  "--text": "#000000",
  "--main": "rgba(255, 255, 255, 0.8)",
  "--border": "rgba(0, 0, 0, 0.2)",
  "--primary": "#46a094",
  "--input-focus": "#c4e8c2",
  "--button-hover": "#c4e8c2",
  "--button-click": "#aecfa4",
  "--sent-message": "#6bbd99",
  "--text-message": "#000000",
  "--loading": "#46a094"
};

// Sky color
var skyColor = {
  "--back": "#ffffff",
  "--text": "#000000",
  "--main": "rgba(255, 255, 255, 0.8)",
  "--border": "rgba(0, 0, 0, 0.2)",
  "--primary": "#3b7197",
  "--input-focus": "#a1e1fa",
  "--button-hover": "#a1e1fa",
  "--button-click": "#74bde0",
  "--sent-message": "#4a8db7",
  "--text-message": "#ffffff",
  "--loading": "#3b7197"
};

// Metodo per cambiare il tema
const setColorTheme = (color) => {
  Object.keys(color).forEach(function (key) {
    rootElement.style.setProperty(key, color[key]);
  });
}

// Controllo impostazione salvata in LocalStorage, se si, applico quella, altrimenti applico il tema di default
const storedTheme = localStorage.getItem("theme");

// Switch per cambio tema app
switch (storedTheme) {
  case "light":
    setColorTheme(lightTheme);
    break;
  case "dark":
    setColorTheme(darkTheme);
    break;
  case "gold":
    setColorTheme(goldColor);
    break;
  case "nature":
    setColorTheme(natureColor);
    break;
  case "sky":
    setColorTheme(skyColor);
    break;
  default:
    setColorTheme(defaultColor);
    break;
}

// Default
export default function App() {

  // Imposta un token vuoto nei cookie
  const [jwtToken, setJwtToken] = UseCookie("jwt", "");

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <PrivateRoute jwt={jwtToken}>
              <Home jwt={jwtToken} setJwt={setJwtToken} />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <Signup />
          }
        />
        <Route
          path="/login"
          element={<Login jwt={jwtToken} setJwt={setJwtToken} />}
        />
      </Routes>
    </>
  );
};