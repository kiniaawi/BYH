import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserHome = ({ onChangeContent }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
    "nameCookie",
  ]);
  const username = cookies.nameCookie;
  setCookie("currentPageCookie", "homepage", { path: "/" });
  const navigate = useNavigate();

  return (
    <Box flex={12} p={2}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Witaj na stronie BoostYourHealth, {username}!</b>
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 10 }}>
        Wybierz dziedzinę, w której potrzebujesz pomocy
      </Typography>
      <Box sx={{ marginTop: 5 }}>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button
            component={Link}
            to="/user-skincare"
            onClick={() => {
              onChangeContent("user-skincare");
              navigate("/user-skincare");
            }}
          >
            Pielęgnacja Skóry
          </Button>
          <Button
            component={Link}
            to="/user-haircare"
            onClick={() => {
              onChangeContent("user-haircare");
              navigate("/user-haircare");
            }}
          >
            Pielęgnacja Włosów
          </Button>
          <Button
            component={Link}
            to="/user-supplementation"
            onClick={() => {
              onChangeContent("user-supplementation");
              navigate("/user-supplementation");
            }}
          >
            Suplementacja
          </Button>
          <Button
            component={Link}
            to="/dealing-def-suppl"
            onClick={() => {
              onChangeContent("dealing-def-suppl");
              navigate("/dealing-def-suppl");
            }}
          >
            Choroby i Ich Zapobieganie
          </Button>
        </Stack>
      </Box>
      <Box sx={{ marginTop: 4 }}>{/* Formularz kontaktowy */}</Box>
    </Box>
  );
};
export default UserHome;
