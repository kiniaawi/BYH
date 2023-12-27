import styled from "@emotion/styled";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Box,
  MenuItem,
  Menu,
  Avatar,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Flag from "react-world-flags";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import logoBig from "../../logo/BYH_logo3.png";
import logoSmall from "../../logo/BYHlogo1.png";
import { useCookies } from "react-cookie";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  backgroundColor: "",
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const Navbar = ({ setLang, onSidebarToggle }) => {
  const [open, setOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageContent",
    "nameCookie",
  ]);

  const username = cookies.nameCookie;

  const onLogout = () => {
    removeCookie("emailCookie");
    removeCookie("nameCookie");
    removeCookie("currentPageCookie");
    localStorage.removeItem("token"); // Remove the token from localStorage
    window.location.href = "http://localhost:3000"; // Navigate to the desired route
  };

  function getInitial(username) {
    if (username) {
      const userInitial = username.charAt(0).toUpperCase();

      return `${userInitial}`;
    } else {
      return "";
    }
  }

  const initial = getInitial(username);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#d90f8b" }}>
      {/* //"#d90f8b" #FF006E */}
      <StyledToolbar>
        <Stack direction="row" spacing={1}>
          <Link to="/">
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <img
                src={logoBig}
                alt="logo_BYH"
                style={{ width: "auto", height: "75px" }}
              />
            </Typography>
            <Typography
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <img
                src={logoSmall}
                alt="logo_BYH"
                style={{ width: "auto", height: "80px" }}
              />
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent={"center"}
        >
          <Avatar
            sx={{
              bgcolor: "#f2efe6",
              width: 35,
              height: 35,
              fontSize: 20,
              color: "black",
              fontWeight: "bold",
            }}
            alt=""
            src=""
            onClick={(e) => setOpen(true)}
          >
            {initial}
          </Avatar>
          <IconButton
            onClick={onSidebarToggle}
            size="large"
            edge="start"
            //color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Icons onClick={(e) => setOpenLang(true)}>
            <Typography marginTop={1}>
              <LanguageIcon sx={{ width: 37, height: 37, color: "black" }} />
              <ArrowDropDownIcon sx={{ color: "black" }} />
            </Typography>
          </Icons> */}
        </Stack>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem sx={{ gap: "20px" }} onClick={onLogout}>
          Logout
          <LogoutIcon />
        </MenuItem>
      </Menu>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openLang}
        onClose={(e) => setOpenLang(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem sx={{ gap: "20px" }}>
          <Flag
            value="English"
            style={{ cursor: "pointer" }}
            height="16"
            code="gb"
            onClick={(e) => setLang("English")}
          />
        </MenuItem>
        <MenuItem sx={{ gap: "20px" }}>
          <Flag
            value="Polish"
            style={{ cursor: "pointer" }}
            code="pl"
            height="16"
            onClick={(e) => setLang("Polish")}
          />
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
