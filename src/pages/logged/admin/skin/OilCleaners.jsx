import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import OilCleansersTable from "./OilCleansersTable";

const OilCleaners = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "oil-cleaners", { path: "/" });
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinIssue, setSkinIssue] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const [minAge, setMinAge] = useState("");
  const [pregnant, setPregnant] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddOilCleaner = () => {
    const data = {
      ProductName: productName,
      ProductType: productType,
      SkinType: skinType,
      SkinIssue: skinIssue,
      DayTime: dayTime,
      Frequency: frequency,
      minAge: minAge,
      isPregnant: pregnant,
    };

    axios
      .post("/api/OilCleaners", data)
      .then((response) => {
        alert(response.data.StatusMessage);
        clearTextArea();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearTextArea = () => {
    setProductName("");
    setProductType("");
    setSkinType("");
    setSkinIssue("");
    setDayTime("");
    setFrequency("");
    setMinAge("");
    setPregnant("");
  };

  return (
    <Box p={2} sx={{ height: "300vh" }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Oil Cleaners Panel</b>
      </Typography>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" textAlign={"center"}>
              <b>Add Oil Cleaner</b>
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 4 }}
            >
              <Typography>Product Name</Typography>
              <TextField
                type="text"
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Typography>Product Type</Typography>
              <TextField
                type="text"
                label="Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Skin Type</Typography>
              <TextField
                type="text"
                label="Skin Type"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
              />
              <Typography>Skin Issue</Typography>
              <TextField
                type="text"
                label="Skin Issue"
                value={skinIssue}
                onChange={(e) => setSkinIssue(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Day Time</Typography>
              <TextField
                type="text"
                label="Day Time"
                value={dayTime}
                onChange={(e) => setDayTime(e.target.value)}
              />
              <Typography>Frequency</Typography>
              <TextField
                type="text"
                label="Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Minimum Age</Typography>
              <TextField
                type="text"
                label="Minimum Age"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
              />
              <Typography>Is For Pregnant</Typography>
              <TextField
                type="text"
                label="Is For Pregnant"
                value={pregnant}
                onChange={(e) => setPregnant(e.target.value)}
              />
            </Stack>
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleAddOilCleaner()}
              >
                Add Oil Cleaner
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Box>
        <OilCleansersTable />
      </Box>
    </Box>
  );
};

export default OilCleaners;
