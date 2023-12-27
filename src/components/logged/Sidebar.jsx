import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CallIcon from "@mui/icons-material/Call";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import React, { useState } from "react";
import "../../style.css";
import { useCookies } from "react-cookie";

const Sidebar = ({ isOpen, onChangeContent }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
    "isAdminCookie",
  ]);

  //setCookie("currentPageCookie", "admin-home", { path: "/" });
  const adminCheck = cookies.isAdminCookie;

  return (
    <Box
      style={{ display: isOpen ? "block" : "none" }}
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
      marginTop={8}
    >
      {adminCheck ? (
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
              <ListItemIcon>
                <HomeIcon className="icon-text" />
              </ListItemIcon>
              <ListItemText
                primary="Calendar"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/calls">
              <ListItemIcon>
                <CallIcon className="icon-text" />
              </ListItemIcon>
              <ListItemText
                primary="Calendar"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/meetings">
              <ListItemIcon>
                <GroupsIcon className="icon-text" />
              </ListItemIcon>
              <ListItemText
                primary="Calendar"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/emails">
              <ListItemIcon>
                <EmailIcon className="icon-text" />
              </ListItemIcon>
              <ListItemText
                primary="Calendar"
                primaryTypographyProps={{ className: "icon-text" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/calendar">
              <ListItemIcon>
                <CalendarMonthIcon className="icon-text" />
              </ListItemIcon>
              <ListItemText
                primary="Calendar"
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
