import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import UserHome from "../../pages/logged/user/UserHome";
import AdminHome from "../../pages/logged/admin/skin/AdminHome";
import Skincare from "../../pages/logged/admin/skin/Skincare";
import Haircare from "../../pages/logged/admin/hair/Haircare";
import Prevention from "../../pages/logged/admin/prevention/Prevention";
//import SkinIssuesFace from "../../pages/logged/admin/SkinIssues";
import Supplementation from "../../pages/logged/admin/supplementation/Supplementation";
import Navbar from "./Navbar";
import BlankBar from "./BlankBar";
import "../../style.css";
import StepsSkincare from "../../pages/logged/admin/skin/StepsSkincare";
import OilCleaners from "../../pages/logged/admin/skin/OilCleaners";
import Sidebar from "./Sidebar";
import FoamCleansers from "../../pages/logged/admin/skin/FoamCleansers";
import Exfoliants from "../../pages/logged/admin/skin/Exfoliants";

const Feed = ({ currentContent, onChangeContent }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ margin: 0, p: 0, height: "100vh" }}
      //overflow={"auto"}
    >
      <Navbar
        onChangeContent={onChangeContent}
        onSidebarToggle={handleSidebarToggle}
      />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ height: "100%", flexGrow: 1 }}
      >
        <BlankBar />
        <Box flex={8} p={1} justifyContent={"center"} overflow={"auto"}>
          <div>
            {currentContent === "homepage" && (
              <UserHome onChangeContent={onChangeContent} />
            )}
            {currentContent === "admin-home" && (
              <AdminHome onChangeContent={onChangeContent} />
            )}
            {currentContent === "admin-skincare" && (
              <Skincare onChangeContent={onChangeContent} />
            )}
            {currentContent === "skincare-steps" && (
              <StepsSkincare onChangeContent={onChangeContent} />
            )}
            {currentContent === "oil-cleaners" && (
              <OilCleaners onChangeContent={onChangeContent} />
            )}
            {currentContent === "foam-cleansers" && (
              <FoamCleansers onChangeContent={onChangeContent} />
            )}
            {currentContent === "exfoliants" && (
              <Exfoliants onChangeContent={onChangeContent} />
            )}
            {currentContent === "admin-haircare" && (
              <Haircare onChangeContent={onChangeContent} />
            )}
            {currentContent === "admin-prevention" && (
              <Prevention onChangeContent={onChangeContent} />
            )}
            {/* {currentContent === "admin-skinissues" && <SkinIssuesFace />} */}
            {currentContent === "admin-supplementation" && (
              <Supplementation onChangeContent={onChangeContent} />
            )}
          </div>
        </Box>
        <BlankBar />
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <Sidebar
            isOpen={sidebarOpen}
            onChangeContent={onChangeContent}
            onClose={handleSidebarToggle}
          />
        </div>
      </Stack>
    </Box>
  );
};

export default Feed;
