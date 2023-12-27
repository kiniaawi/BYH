import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./style.css";
import Register from "./pages/unlogged/Register";
import Login from "./pages/unlogged/Login";
import Feed from "./components/logged/Feed";

function App() {
  const [currentContent, setCurrentContent] = useState("loginPg");

  useEffect(() => {
    handleChangeContent(currentContent);
  }, [currentContent]);

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
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  currentContent="loginPg"
                  onChangeContent={handleChangeContent}
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
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/homepage"
              element={
                <Feed
                  currentContent="homepage"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/admin-home"
              element={
                <Feed
                  currentContent="admin-home"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/admin-skincare"
              element={
                <Feed
                  currentContent="admin-skincare"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/skincare-steps"
              element={
                <Feed
                  currentContent="skincare-steps"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/skin-types"
              element={
                <Feed
                  currentContent="skin-types"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/dealing-skinissues"
              element={
                <Feed
                  currentContent="dealing-skinissues"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/oil-cleaners"
              element={
                <Feed
                  currentContent="oil-cleaners"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/foam-cleansers"
              element={
                <Feed
                  currentContent="foam-cleansers"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/exfoliants"
              element={
                <Feed
                  currentContent="exfoliants"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/admin-haircare"
              element={
                <Feed
                  currentContent="admin-haircare"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/admin-prevention"
              element={
                <Feed
                  currentContent="admin-prevention"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/admin-supplementation"
              element={
                <Feed
                  currentContent="admin-supplementation"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/def-suppl-issues"
              element={
                <Feed
                  currentContent="def-suppl-issues"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/def-suppl-tests"
              element={
                <Feed
                  currentContent="def-suppl-tests"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/dealing-def-suppl"
              element={
                <Feed
                  currentContent="dealing-def-suppl"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/admin-skinisues"
              element={
                <Feed
                  currentContent="admin-skinisues"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
