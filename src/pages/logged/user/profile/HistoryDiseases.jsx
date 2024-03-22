import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { format } from "date-fns";
import HistoryDiseasesAdvice from "./HistoryDiseasesAdvice";
import HistoryDiseasesPreventionAdvice from "./HistoryDiseasesPreventionAdvice";

const HistoryDiseases = ({ onChangeContent }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
    "nameCookie",
    "userIdCookie",
  ]);
  const username = cookies.nameCookie;
  const userId = cookies.userIdCookie;
  setCookie("currentPageCookie", "history-diseases", {
    path: "/",
  });
  const navigate = useNavigate();

  return (
    <Box p={2} sx={{ height: "300vh" }}>
      <Button
        component={Link}
        to="/user-profile"
        onClick={() => {
          onChangeContent("user-profile");
          navigate("/user-profile");
        }}
        size="small"
      >
        <ArrowBackIcon />
        Twój Profil
      </Button>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: 3, marginTop: 2 }}
      >
        <b>Historia porad chorobowych {username}</b>
      </Typography>
      <Box>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
        >
          Historia porad dotyczących Chorób
        </Typography>
        <Box>
          <HistoryDiseasesAdvice />
        </Box>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: 4, marginBottom: 2 }}
        >
          Historia porad dotyczących Zapobiegania Chorobom
        </Typography>
        <Box>
          <HistoryDiseasesPreventionAdvice />
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryDiseases;
