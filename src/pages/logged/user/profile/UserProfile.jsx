import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ onChangeContent }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
    "nameCookie",
  ]);
  const username = cookies.nameCookie;
  setCookie("currentPageCookie", "user-profile", { path: "/" });
  const navigate = useNavigate();

  return (
    <Box flex={12} p={2}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Profil {username}</b>
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 10 }}>
        Poniższe panele zawierają historię porad:
      </Typography>
      <Box sx={{ marginTop: 5 }}>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button
            component={Link}
            to="/history-skin-advices"
            onClick={() => {
              onChangeContent("history-skin-advices");
              navigate("/history-skin-advices");
            }}
          >
            Pielęgnacja Skóry
          </Button>
          <Button
            component={Link}
            to="/history-hair-nails-advices"
            onClick={() => {
              onChangeContent("history-hair-nails-advices");
              navigate("/history-hair-nails-advices");
            }}
          >
            Pielęgnacja Włosów
          </Button>
          <Button
            component={Link}
            to="/history-supplementation-advices"
            onClick={() => {
              onChangeContent("history-supplementation-advices");
              navigate("/history-supplementation-advices");
            }}
          >
            Suplementacja
          </Button>
          <Button
            component={Link}
            to="/history-prevention-advices"
            onClick={() => {
              onChangeContent("history-prevention-advices");
              navigate("/history-prevention-advices");
            }}
          >
            Choroby i Ich Zapobieganie
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default UserProfile;
