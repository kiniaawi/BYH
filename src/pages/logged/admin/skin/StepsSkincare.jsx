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
import StepsSkincareTable from "./StepsSkincareTable";

const StepsSkincare = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "skincare-steps", { path: "/" });
  const [skinType, setSkinType] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState("");
  const [step4, setStep4] = useState("");
  const [step5, setStep5] = useState("");
  const [step6, setStep6] = useState("");
  const [step7, setStep7] = useState("");
  const [step8, setStep8] = useState("");
  const [step9, setStep9] = useState("");
  const [step10, setStep10] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddRoutine = () => {
    const data = {
      SkinType: skinType,
      DayTime: dayTime,
      Step1: step1,
      Step2: step2,
      Step3: step3,
      Step4: step4,
      Step5: step5,
      Step6: step6,
      Step7: step7,
      Step8: step8,
      Step9: step9,
      Step10: step10,
    };

    axios
      .post("/api/SkincareSteps", data)
      .then((response) => {
        alert(response.data.StatusMessage);
        clearTextArea();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearTextArea = () => {
    setSkinType("");
    setDayTime("");
    setStep1("");
    setStep2("");
    setStep3("");
    setStep4("");
    setStep5("");
    setStep6("");
    setStep7("");
    setStep8("");
    setStep9("");
    setStep10("");
  };

  return (
    <Box p={2} sx={{ height: "300vh" }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Skincare Steps Panel</b>
      </Typography>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" textAlign={"center"}>
              <b>Add Skincare Routine</b>
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography>
                <b>Skin Type</b>
              </Typography>
              <TextField
                type="text"
                label="Skin Type"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                required
              />
              <Typography>
                <b>Day Time</b>
              </Typography>
              <TextField
                type="text"
                label="Day Time"
                value={dayTime}
                onChange={(e) => setDayTime(e.target.value)}
                required
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 4 }}
            >
              <Typography>Step 1</Typography>
              <TextField
                type="text"
                label="Step 1"
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
              />
              <Typography>Step 2</Typography>
              <TextField
                type="text"
                label="Step 2"
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 3</Typography>
              <TextField
                type="text"
                label="Step 3"
                value={step3}
                onChange={(e) => setStep3(e.target.value)}
              />
              <Typography>Step 4</Typography>
              <TextField
                type="text"
                label="Step 4"
                value={step4}
                onChange={(e) => setStep4(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 5</Typography>
              <TextField
                type="text"
                label="Step 5"
                value={step5}
                onChange={(e) => setStep5(e.target.value)}
              />
              <Typography>Step 6</Typography>
              <TextField
                type="text"
                label="Step 6"
                value={step6}
                onChange={(e) => setStep6(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 7</Typography>
              <TextField
                type="text"
                label="Step 7"
                value={step7}
                onChange={(e) => setStep7(e.target.value)}
              />
              <Typography>Step 8</Typography>
              <TextField
                type="text"
                label="Step 8"
                value={step8}
                onChange={(e) => setStep8(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 9</Typography>
              <TextField
                type="text"
                label="Step 9"
                value={step9}
                onChange={(e) => setStep9(e.target.value)}
              />
              <Typography>Step 10</Typography>
              <TextField
                type="text"
                label="Step 10"
                value={step10}
                onChange={(e) => setStep10(e.target.value)}
              />
            </Stack>
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleAddRoutine()}
              >
                Add Routine
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Box>
        <StepsSkincareTable />
      </Box>
    </Box>
  );
};

export default StepsSkincare;
