import { Box, Stack } from "@mui/material";
import React from "react";
import UserHome from "../../pages/logged/user/UserHome";
import AdminHome from "../../pages/logged/admin/AdminHome";
import Skincare from "../../pages/logged/admin/Skincare";
import Haircare from "../../pages/logged/admin/Haircare";
import Prevention from "../../pages/logged/admin/Prevention";
import SkinIssuesFace from "../../pages/logged/admin/SkinIssues";
import Supplementation from "../../pages/logged/admin/Supplementation";
import Navbar from "./Navbar";
import BlankBar from "./BlankBar";

const Feed = ({ currentContent }) => {
  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ margin: 0, p: 0 }}
      overflow={"auto"}
    >
      <Navbar />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ height: "100%", flexGrow: 1 }}
      >
        <BlankBar />
        <Box flex={8} p={1} justifyContent={"center"} overflow={"auto"}>
          <div>
            {currentContent === "homepage" && <UserHome />}
            {currentContent === "admin-home" && <AdminHome />}
            {currentContent === "admin-skincare" && <Skincare />}
            {currentContent === "admin-haircare" && <Haircare />}
            {currentContent === "admin-prevention" && <Prevention />}
            {currentContent === "admin-skinissues" && <SkinIssuesFace />}
            {currentContent === "admin-supplementation" && <Supplementation />}
          </div>
        </Box>
        <BlankBar />
      </Stack>
    </Box>
  );
};

export default Feed;
