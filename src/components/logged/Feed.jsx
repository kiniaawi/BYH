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
import SkinTypes from "../../pages/logged/admin/skin/SkinTypes";
import Footer from "../unlogged/Footer";
import DealingSkinIssues from "../../pages/logged/admin/skin/DealingSkinIssues";
import DefSupplIssues from "../../pages/logged/admin/supplementation/DefSupplIssues";
import DefSupplBloodTests from "../../pages/logged/admin/supplementation/DefSupplBloodTests";
import DefSupplDealing from "../../pages/logged/admin/supplementation/DefSupplDealing";
import Toners from "../../pages/logged/admin/skin/Toners";
import Essences from "../../pages/logged/admin/skin/Essences";
import Serums from "../../pages/logged/admin/skin/Serums";
import Masks from "../../pages/logged/admin/skin/Masks";
import EyeCreams from "../../pages/logged/admin/skin/EyeCreams";
import Moisturizers from "../../pages/logged/admin/skin/Moisturizers";
import SPF from "../../pages/logged/admin/skin/SPF";

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
            {currentContent === "dealing-skinissues" && (
              <DealingSkinIssues onChangeContent={onChangeContent} />
            )}
            {currentContent === "skin-types" && (
              <SkinTypes onChangeContent={onChangeContent} />
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
            {currentContent === "toners" && (
              <Toners onChangeContent={onChangeContent} />
            )}
            {currentContent === "essences" && (
              <Essences onChangeContent={onChangeContent} />
            )}
            {currentContent === "serums" && (
              <Serums onChangeContent={onChangeContent} />
            )}
            {currentContent === "masks" && (
              <Masks onChangeContent={onChangeContent} />
            )}
            {currentContent === "eye-creams" && (
              <EyeCreams onChangeContent={onChangeContent} />
            )}
            {currentContent === "moisturizers" && (
              <Moisturizers onChangeContent={onChangeContent} />
            )}
            {currentContent === "spf" && (
              <SPF onChangeContent={onChangeContent} />
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
            {currentContent === "def-suppl-issues" && (
              <DefSupplIssues onChangeContent={onChangeContent} />
            )}
            {currentContent === "def-suppl-tests" && (
              <DefSupplBloodTests onChangeContent={onChangeContent} />
            )}
            {currentContent === "dealing-def-suppl" && (
              <DefSupplDealing onChangeContent={onChangeContent} />
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
      <Footer />
    </Box>
  );
};

export default Feed;
