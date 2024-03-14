import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import UserHome from "../../pages/logged/user/UserHome";
import AdminHome from "../../pages/logged/admin/skin/AdminHome";
import Skincare from "../../pages/logged/admin/skin/Skincare";
import Haircare from "../../pages/logged/admin/hair/Haircare";
import Prevention from "../../pages/logged/admin/prevention/Prevention";
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
import StepsBodycare from "../../pages/logged/admin/skin/StepsBodycare";
import ShowerGels from "../../pages/logged/admin/skin/ShowerGels";
import BodyOils from "../../pages/logged/admin/skin/BodyOils";
import BodyExfoliants from "../../pages/logged/admin/skin/BodyExfoliants";
import BodyMoisturizers from "../../pages/logged/admin/skin/BodyMoisturizers";
import BodyActives from "../../pages/logged/admin/skin/BodyActives";
import HairTypes from "../../pages/logged/admin/hair/HairTypes";
import StepsHaircare from "../../pages/logged/admin/hair/StepsHaircare";
import DealingHairProblems from "../../pages/logged/admin/hair/DealingHairProblems";
import HairPeelings from "../../pages/logged/admin/hair/HairPeelings";
import Shampoos from "../../pages/logged/admin/hair/Shampoos";
import HairMasks from "../../pages/logged/admin/hair/HairMasks";
import HairConditioners from "../../pages/logged/admin/hair/HairConditioners";
import HairOils from "../../pages/logged/admin/hair/HairOils";
import HeatProtection from "../../pages/logged/admin/hair/HeatProtection";
import HairOilsProtection from "../../pages/logged/admin/hair/HairOilsProtection";
import HairSerums from "../../pages/logged/admin/hair/HairSerums";
import SupplDosage from "../../pages/logged/admin/supplementation/SupplDosage";
import Diseases from "../../pages/logged/admin/prevention/Diseases";
import Diets from "../../pages/logged/admin/prevention/Diets";
import Workouts from "../../pages/logged/admin/prevention/Workouts";
import DiseasesSymptoms from "../../pages/logged/admin/prevention/DiseasesSymptoms";
import DiseasesPrevention from "../../pages/logged/admin/prevention/DiseasesPrevention";
import UserSupplementation from "../../pages/logged/user/Supplementation/UserSupplementation";
import SkinSupplementation from "../../pages/logged/user/Supplementation/SkinSupplementation";
import HairNailsSupplementation from "../../pages/logged/user/Supplementation/HairNailsSupplementation";
import DigestiveSystemSupplementation from "../../pages/logged/user/Supplementation/DigestiveSystemSupplementation";
import FunctioningSupplementation from "../../pages/logged/user/Supplementation/FunctioningSupplementation";
import HairNailsSupplAdvice from "../../pages/logged/user/Supplementation/HairNailsSupplAdvice";
import DigestiveSystemSupplAdvice from "../../pages/logged/user/Supplementation/DigestiveSystemSupplAdvice";
import FunctioningSupplAdvice from "../../pages/logged/user/Supplementation/FunctioningSupplAdvice";
import SkinSupplAdvice from "../../pages/logged/user/Supplementation/SkinSupplAdvice";
import UserProfile from "../../pages/logged/user/profile/UserProfile";
import HistorySupplAdvices from "../../pages/logged/user/profile/HistorySupplAdvices";
import UserSkincare from "../../pages/logged/user/skincare/UserSkincare";
import UserFaceSkincare from "../../pages/logged/user/skincare/UserFaceSkincare";
import UserBodySkincare from "../../pages/logged/user/skincare/UserBodySkincare";
import FaceSkincareAdvice from "../../pages/logged/user/skincare/FaceSkincareAdvice";
import HistorySkincareFaceAdvice from "../../pages/logged/user/profile/HistorySkincareFaceAdvice";
import DealingBodySkinIssues from "../../pages/logged/admin/skin/DealingBodySkinIssues";
import BodySkincareAdvice from "../../pages/logged/user/skincare/BodySkincareAdvice";
import HistorySkincareBodyAdvice from "../../pages/logged/user/profile/HistorySkincareBodyAdvice";
import HairCreams from "../../pages/logged/admin/hair/HairCreams";
import UserHaircare from "../../pages/logged/user/haircare/UserHaircare";
import UserHaircareAdvice from "../../pages/logged/user/haircare/UserHaircareAdvice";
import HistoryHaircareAdvice from "../../pages/logged/user/profile/HistoryHaircareAdvice";

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
            {currentContent === "dealing-body-skinissues" && (
              <DealingBodySkinIssues onChangeContent={onChangeContent} />
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
            {currentContent === "steps-bodycare" && (
              <StepsBodycare onChangeContent={onChangeContent} />
            )}
            {currentContent === "shower-gels" && (
              <ShowerGels onChangeContent={onChangeContent} />
            )}
            {currentContent === "body-oils" && (
              <BodyOils onChangeContent={onChangeContent} />
            )}
            {currentContent === "body-exfoliants" && (
              <BodyExfoliants onChangeContent={onChangeContent} />
            )}
            {currentContent === "body-moisturizers" && (
              <BodyMoisturizers onChangeContent={onChangeContent} />
            )}
            {currentContent === "body-actives" && (
              <BodyActives onChangeContent={onChangeContent} />
            )}
            {currentContent === "admin-haircare" && (
              <Haircare onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-types" && (
              <HairTypes onChangeContent={onChangeContent} />
            )}
            {currentContent === "dealing-hairproblems" && (
              <DealingHairProblems onChangeContent={onChangeContent} />
            )}
            {currentContent === "haircare-steps" && (
              <StepsHaircare onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-peelings" && (
              <HairPeelings onChangeContent={onChangeContent} />
            )}
            {currentContent === "shampoos" && (
              <Shampoos onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-masks" && (
              <HairMasks onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-conditioners" && (
              <HairConditioners onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-oils" && (
              <HairOils onChangeContent={onChangeContent} />
            )}
            {currentContent === "heat-protection" && (
              <HeatProtection onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-oils-protection" && (
              <HairOilsProtection onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-serums" && (
              <HairSerums onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-creams" && (
              <HairCreams onChangeContent={onChangeContent} />
            )}
            {currentContent === "admin-prevention" && (
              <Prevention onChangeContent={onChangeContent} />
            )}
            {currentContent === "diseases" && (
              <Diseases onChangeContent={onChangeContent} />
            )}
            {currentContent === "diets" && (
              <Diets onChangeContent={onChangeContent} />
            )}
            {currentContent === "workouts" && (
              <Workouts onChangeContent={onChangeContent} />
            )}
            {currentContent === "diseases-symptoms" && (
              <DiseasesSymptoms onChangeContent={onChangeContent} />
            )}
            {currentContent === "diseases-prevention" && (
              <DiseasesPrevention onChangeContent={onChangeContent} />
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
            {currentContent === "suppl-dosage" && (
              <SupplDosage onChangeContent={onChangeContent} />
            )}
            {currentContent === "dealing-def-suppl" && (
              <DefSupplDealing onChangeContent={onChangeContent} />
            )}
            {currentContent === "user-supplementation" && (
              <UserSupplementation onChangeContent={onChangeContent} />
            )}
            {currentContent === "skin-supplementation" && (
              <SkinSupplementation onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-nails-supplementation" && (
              <HairNailsSupplementation onChangeContent={onChangeContent} />
            )}
            {currentContent === "digestive-system-supplementation" && (
              <DigestiveSystemSupplementation
                onChangeContent={onChangeContent}
              />
            )}
            {currentContent === "skin-suppl-advice" && (
              <SkinSupplAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "hair-nails-suppl-advice" && (
              <HairNailsSupplAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "digestive-system-suppl-advice" && (
              <DigestiveSystemSupplAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "functioning-supplementation" && (
              <FunctioningSupplementation onChangeContent={onChangeContent} />
            )}
            {currentContent === "functioning-suppl-advice" && (
              <FunctioningSupplAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "user-profile" && (
              <UserProfile onChangeContent={onChangeContent} />
            )}
            {currentContent === "history-supplementation-advices" && (
              <HistorySupplAdvices onChangeContent={onChangeContent} />
            )}
            {currentContent === "user-skincare" && (
              <UserSkincare onChangeContent={onChangeContent} />
            )}
            {currentContent === "user-face-skincare" && (
              <UserFaceSkincare onChangeContent={onChangeContent} />
            )}
            {currentContent === "user-body-skincare" && (
              <UserBodySkincare onChangeContent={onChangeContent} />
            )}
            {currentContent === "face-skincare-advice" && (
              <FaceSkincareAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "body-skincare-advice" && (
              <BodySkincareAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "history-skincare-face-advices" && (
              <HistorySkincareFaceAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "history-skincare-body-advices" && (
              <HistorySkincareBodyAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "user-haircare" && (
              <UserHaircare onChangeContent={onChangeContent} />
            )}
            {currentContent === "haircare-advice" && (
              <UserHaircareAdvice onChangeContent={onChangeContent} />
            )}
            {currentContent === "history-haircare-advice" && (
              <HistoryHaircareAdvice onChangeContent={onChangeContent} />
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
