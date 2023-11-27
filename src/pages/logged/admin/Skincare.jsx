import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import SkinIssues from "./SkinIssues";
import AddIcon from "@mui/icons-material/Add";

const Skincare = ({}) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "admin-skincare", { path: "/" });

  const [skinIssueFlag, setSkinIssueFlag] = useState(false);

  const handleSkinIssueClick = () => {
    setSkinIssueFlag(!skinIssueFlag);
  };

  return (
    <Box flex={12} p={2} overflow={"visible !important"} height={"100vh"}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Skincare Panel</b>
      </Typography>
      <Box sx={{ textAlign: "right", marginBottom: 3 }}>
        <Button onClick={() => handleSkinIssueClick()}>
          <AddIcon />
          Add Skin Issue
        </Button>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Face</b>
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
      <Box sx={{ marginBottom: 5 }}>
        <Typography variant="h6">
          <b>Body</b>
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
      {skinIssueFlag && (
        <Box>
          <SkinIssues handleSkinIssueClick={handleSkinIssueClick} />
        </Box>
      )}
    </Box>
  );
};

export default Skincare;
