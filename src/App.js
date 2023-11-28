import React from "react";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/unlogged/Register";
import Login from "./pages/unlogged/Login";
import Feed from "./components/logged/Feed";

function App() {
  const [currentLang, setCurrentLang] = useState("English"); // State for language

  const handleLangChange = (newLang) => {
    setCurrentLang(newLang);
    {
      /* setting new language */
    }
  };

  const [currentContent, setCurrentContent] = useState("loginPg");

  const handleChangeContent = (currentContent) => {
    setCurrentContent(currentContent);
  };

  const [mode, setMode] = useState("light");

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 750,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      mode: mode,
      primary: {
        main: "#1F2833",
      },
    },
  });

  return (
    <div overflow={"auto"}>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  currentContent="loginPg"
                  onChangeContent={handleChangeContent}
                  lang={currentLang}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  currentContent="registerPg"
                  onChangeContent={handleChangeContent}
                  lang={currentLang}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/homepage"
              element={<Feed currentContent="homepage" />}
            />
            <Route
              path="/admin-home"
              element={<Feed currentContent="admin-home" />}
            />
            <Route
              path="/admin-skincare"
              element={<Feed currentContent="admin-skincare" />}
            />
            <Route
              path="/skincare-steps"
              element={<Feed currentContent="skincare-steps" />}
            />
            <Route
              path="/admin-haircare"
              element={<Feed currentContent="admin-haircare" />}
            />
            <Route
              path="/admin-prevention"
              element={<Feed currentContent="admin-prevention" />}
            />
            <Route
              path="/admin-supplementation"
              element={<Feed currentContent="admin-supplementation" />}
            />
            <Route
              path="/admin-skinisues"
              element={<Feed currentContent="admin-skinisues" />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
