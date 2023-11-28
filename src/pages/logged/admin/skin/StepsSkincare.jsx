import { Box, Typography } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";

const StepsSkincare = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "skincare-steps", { path: "/" });
  return (
    <Box p={2}>
      <Typography variant="h5" textAlign={"center"}>
        <b>Skincare Steps</b>
      </Typography>
    </Box>
  );
};

export default StepsSkincare;
