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
              path="/toners"
              element={
                <Feed
                  currentContent="toners"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/essences"
              element={
                <Feed
                  currentContent="essences"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/serums"
              element={
                <Feed
                  currentContent="serums"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/masks"
              element={
                <Feed
                  currentContent="masks"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/eye-creams"
              element={
                <Feed
                  currentContent="eye-creams"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/moisturizers"
              element={
                <Feed
                  currentContent="moisturizers"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/spf"
              element={
                <Feed
                  currentContent="spf"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/steps-bodycare"
              element={
                <Feed
                  currentContent="steps-bodycare"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/shower-gels"
              element={
                <Feed
                  currentContent="shower-gels"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/body-oils"
              element={
                <Feed
                  currentContent="body-oils"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/body-exfoliants"
              element={
                <Feed
                  currentContent="body-exfoliants"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/body-moisturizers"
              element={
                <Feed
                  currentContent="body-moisturizers"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/body-actives"
              element={
                <Feed
                  currentContent="body-actives"
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
              path="/hair-types"
              element={
                <Feed
                  currentContent="hair-types"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/dealing-hairproblems"
              element={
                <Feed
                  currentContent="dealing-hairproblems"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/haircare-steps"
              element={
                <Feed
                  currentContent="haircare-steps"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/hair-peelings"
              element={
                <Feed
                  currentContent="hair-peelings"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/shampoos"
              element={
                <Feed
                  currentContent="shampoos"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/hair-masks"
              element={
                <Feed
                  currentContent="hair-masks"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/hair-conditioners"
              element={
                <Feed
                  currentContent="hair-conditioners"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/hair-oils"
              element={
                <Feed
                  currentContent="hair-oils"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/heat-protection"
              element={
                <Feed
                  currentContent="heat-protection"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/hair-oils-protection"
              element={
                <Feed
                  currentContent="hair-oils-protection"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/hair-serums"
              element={
                <Feed
                  currentContent="hair-serums"
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
              path="/diseases"
              element={
                <Feed
                  currentContent="diseases"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/diets"
              element={
                <Feed
                  currentContent="diets"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/workouts"
              element={
                <Feed
                  currentContent="workouts"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/diseases-symptoms"
              element={
                <Feed
                  currentContent="diseases-symptoms"
                  onChangeContent={handleChangeContent}
                  setCurrentContent={setCurrentContent}
                />
              }
            />
            <Route
              path="/diseases-prevention"
              element={
                <Feed
                  currentContent="diseases-prevention"
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
              path="/suppl-dosage"
              element={
                <Feed
                  currentContent="suppl-dosage"
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
            <Route
              path="/user-supplementation"
              element={
                <Feed
                  currentContent="user-supplementation"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/skin-supplementation"
              element={
                <Feed
                  currentContent="skin-supplementation"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/hair-nails-supplementation"
              element={
                <Feed
                  currentContent="hair-nails-supplementation"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/digestive-system-supplementation"
              element={
                <Feed
                  currentContent="digestive-system-supplementation"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/functioning-supplementation"
              element={
                <Feed
                  currentContent="functioning-supplementation"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/skin-suppl-advice"
              element={
                <Feed
                  currentContent="skin-suppl-advice"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/hair-nails-suppl-advice"
              element={
                <Feed
                  currentContent="hair-nails-suppl-advice"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/digestive-system-suppl-advice"
              element={
                <Feed
                  currentContent="digestive-system-suppl-advice"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/functioning-suppl-advice"
              element={
                <Feed
                  currentContent="functioning-suppl-advice"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/user-profile"
              element={
                <Feed
                  currentContent="user-profile"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/history-supplementation-advices"
              element={
                <Feed
                  currentContent="history-supplementation-advices"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/user-skincare"
              element={
                <Feed
                  currentContent="user-skincare"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/user-face-skincare"
              element={
                <Feed
                  currentContent="user-face-skincare"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/user-body-skincare"
              element={
                <Feed
                  currentContent="user-body-skincare"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/face-skincare-advice"
              element={
                <Feed
                  currentContent="face-skincare-advice"
                  onChangeContent={handleChangeContent}
                />
              }
            />
            <Route
              path="/history-skincare-face-advices"
              element={
                <Feed
                  currentContent="history-skincare-face-advices"
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
