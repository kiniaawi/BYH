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
import TableDefSupplIssues from "./TableDefSupplIssues";

const DefSupplIssues = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "def-suppl-issues", { path: "/" });
  const [defSupplIssue, setDefSupplIssue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAdd = () => {
    const data = {
      Issue: defSupplIssue,
    };

    axios
      .post("api/DefSupplDealing", data)
      .then((response) => {
        alert(response.data.StatusMessage);
      })
      .catch((error) => {
        console.log(error);
      });

    setDefSupplIssue("");
  };

  return (
    <Box p={2} sx={{ height: "300vh" }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        <b>Panel Objawów Deficytów Suplementów</b>
      </Typography>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" textAlign={"center"}>
              <b>Dodaj Objaw</b>
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 4 }}
            >
              <Stack direction="row">
                <Typography sx={{ marginRight: 4, marginLeft: 4 }}>
                  Wprowadź objaw:{" "}
                </Typography>
                <TextField
                  type="text"
                  label="Typ Skóry"
                  value={defSupplIssue}
                  onChange={(e) => setDefSupplIssue(e.target.value)}
                />
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                sx={{ marginRight: 4 }}
                onClick={() => handleAdd()}
              >
                Dodaj
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <Box>
        <TableDefSupplIssues />
      </Box>
    </Box>
  );
};

export default DefSupplIssues;
