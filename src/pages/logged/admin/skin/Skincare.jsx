import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import AddSkinIssue from "./AddSkinIssue";
import SkinIssuesTable from "./SkinIssuesTable";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../components/unlogged/Footer";

const Skincare = ({ onChangeContent }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "admin-skincare", { path: "/" });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSkinIssueClick = () => {
    setAddModalOpen(true);
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
  };

  return (
    <Box flex={12} p={2} height={"200vh"}>
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "50%",
        }}
        overflow={"auto"}
        open={isAddModalOpen}
        onClose={() => handleModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width="200vw"
          maxWidth="550vw"
          p={3}
          borderRadius={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          padding={3}
        >
          <Grid container spacing={2}>
            <AddSkinIssue />
          </Grid>
        </Box>
      </Modal>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Panel Pielęgnacji Skóry</b>
      </Typography>
      <Box sx={{ textAlign: "right", marginBottom: 3 }}>
        <Button onClick={() => handleSkinIssueClick()}>
          <AddIcon />
          Dodaj Problem Skórny
        </Button>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Twarz</b>
        </Typography>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button
            component={Link}
            to="/skin-types"
            onClick={() => {
              onChangeContent("skin-types");
              navigate("/skin-types");
            }}
          >
            Typy Skóry
          </Button>
          <Button
            component={Link}
            to="/dealing-skinissues"
            onClick={() => {
              onChangeContent("dealing-skinissues");
              navigate("/dealing-skinissues");
            }}
          >
            Rozwiązania Problemów Skórnych
          </Button>
          <Button
            component={Link}
            to="/skincare-steps"
            onClick={() => {
              onChangeContent("skincare-steps");
              navigate("/skincare-steps");
            }}
          >
            Kroki Pielęgnacyjne
          </Button>
        </Stack>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button
            component={Link}
            to="/oil-cleaners"
            onClick={() => {
              onChangeContent("oil-cleaners");
              navigate("/oil-cleaners");
            }}
          >
            Oczyszczanie
          </Button>
          <Button
            component={Link}
            to="/foam-cleansers"
            onClick={() => {
              onChangeContent("foam-cleansers");
              navigate("/foam-cleansers");
            }}
          >
            Mycie
          </Button>
          <Button
            component={Link}
            to="/exfoliants"
            onClick={() => {
              onChangeContent("exfoliants");
              navigate("/exfoliants");
            }}
          >
            Złuszczanie
          </Button>
          <Button>Tonizacja</Button>
          <Button>Esencja</Button>
        </Stack>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button>Serum</Button>
          <Button>Maska</Button>
          <Button>Krem pod oczy</Button>
          <Button>Nawilżanie</Button>
          <Button>SPF</Button>
        </Stack>
      </Box>
      <Box sx={{ marginBottom: 5, marginTop: 2 }}>
        <Typography variant="h6">
          <b>Ciało</b>
        </Typography>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
        </Stack>
        <Stack direction="row" justifyContent={"space-evenly"}>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
          <Button>Add Skin Issue</Button>
        </Stack>
      </Box>
      <SkinIssuesTable />
    </Box>
  );
};

export default Skincare;
