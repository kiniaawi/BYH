import { Box } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";

const UserHome = ({ lang }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "homepage", { path: "/" });
  return (
    <Box
      flex={12}
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <h1>User page</h1>
    </Box>
  );
};
export default UserHome;
