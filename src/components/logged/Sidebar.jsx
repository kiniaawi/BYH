import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../style.css";
import { useCookies } from "react-cookie";

const Sidebar = ({ isOpen, onChangeContent }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
    "isAdminCookie",
  ]);

  const adminCheck = cookies.isAdminCookie;
  const userEmail = cookies.emailCookie;

  const [userData, setUserData] = useState([]);
  const [adminChecking, setAdminChecking] = useState("");

  useEffect(() => {
    fetchUserData();
    CheckIfIsAdmin();
  }, []);

  const fetchUserData = () => {
    axios
      .get("/api/Registration")
      .then((response) => {
        console.log(response.data);
        console.log(response.data.Data[0]);
        setUserData(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CheckIfIsAdmin = () => {
    if (userData.length > 0) {
      const currentUser = userData.find((user) => user.Email === userEmail);

      if (currentUser) {
        if (currentUser.isAdmin) {
          setAdminChecking(true);
        } else {
          setAdminChecking(false);
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Box
      style={{ display: isOpen ? "block" : "none" }}
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
      marginTop={8}
    >
      {adminChecking ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin-home">
              <ListItemText
                primary="Strona Główna"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin-skincare">
              <ListItemText
                primary="Pielęgnacja Skóry"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin-haircare">
              <ListItemText
                primary="Pielęgnacja Włosów"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin-supplementation">
              <ListItemText
                primary="Suplementacja"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin-prevention">
              <ListItemText
                primary="Choroby i Zapobieganie"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/homepage">
              <ListItemText
                primary="Strona Główna"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/user-supplementation">
              <ListItemText
                primary="Pielęgnacja Skóry"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/user-supplementation">
              <ListItemText
                primary="Pielęgnacja Włosów"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/user-supplementation">
              <ListItemText
                primary="Suplementacja"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/user-supplementation">
              <ListItemText
                primary="Choroby I Ich Zapobieganie"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default Sidebar;
