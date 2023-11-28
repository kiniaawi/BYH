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
import StepsSkincareTablr from "./StepsSkincareTable";

const StepsSkincare = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "emailCookie",
    "currentPageCookie",
  ]);
  setCookie("currentPageCookie", "skincare-steps", { path: "/" });
  const [skinType, setSkinType] = useState("");
  const [step1, setStep1] = useState("");
  const [dayTime1, setDayTime1] = useState("");
  const [step2, setStep2] = useState("");
  const [dayTime2, setDayTime2] = useState("");
  const [step3, setStep3] = useState("");
  const [dayTime3, setDayTime3] = useState("");
  const [step4, setStep4] = useState("");
  const [dayTime4, setDayTime4] = useState("");
  const [step5, setStep5] = useState("");
  const [dayTime5, setDayTime5] = useState("");
  const [step6, setStep6] = useState("");
  const [dayTime6, setDayTime6] = useState("");
  const [step7, setStep7] = useState("");
  const [dayTime7, setDayTime7] = useState("");
  const [step8, setStep8] = useState("");
  const [dayTime8, setDayTime8] = useState("");
  const [step9, setStep9] = useState("");
  const [dayTime9, setDayTime9] = useState("");
  const [step10, setStep10] = useState("");
  const [dayTime10, setDayTime10] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddRoutine = () => {
    const data = {
      SkinType: skinType,
      Step1: step1,
      DayTime1: dayTime1,
      Step2: step2,
      DayTime2: dayTime2,
      Step3: step3,
      DayTime3: dayTime3,
      Step4: step4,
      DayTime4: dayTime4,
      Step5: step5,
      DayTime5: dayTime5,
      Step6: step6,
      DayTime6: dayTime6,
      Step7: step7,
      DayTime7: dayTime7,
      Step8: step8,
      DayTime8: dayTime8,
      Step9: step9,
      DayTime9: dayTime9,
      Step10: step10,
      DayTime10: dayTime10,
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
    setStep1("");
    setDayTime1("");
    setStep2("");
    setDayTime2("");
    setStep3("");
    setDayTime3("");
    setStep4("");
    setDayTime4("");
    setStep5("");
    setDayTime5("");
    setStep6("");
    setDayTime6("");
    setStep7("");
    setDayTime7("");
    setStep8("");
    setDayTime8("");
    setStep9("");
    setDayTime9("");
    setStep10("");
    setDayTime10("");
  };

  return (
    <Box p={2} sx={{ height: "300vh" }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        <b>Skincare Steps</b>
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
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              <Typography sx={{ marginRight: 2 }}>Skin Type</Typography>
              <TextField
                type="text"
                label="Skin Type"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                required
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 1</Typography>
              <TextField
                type="text"
                label="Step 1"
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
              />
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 1"
                value={dayTime1}
                onChange={(e) => setDayTime1(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 2</Typography>
              <TextField
                type="text"
                label="Step 2"
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
              />
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 2"
                value={dayTime2}
                onChange={(e) => setDayTime2(e.target.value)}
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
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 3"
                value={dayTime3}
                onChange={(e) => setDayTime3(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 4</Typography>
              <TextField
                type="text"
                label="Step 4"
                value={step4}
                onChange={(e) => setStep4(e.target.value)}
              />
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 4"
                value={dayTime4}
                onChange={(e) => setDayTime4(e.target.value)}
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
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 5"
                value={dayTime5}
                onChange={(e) => setDayTime5(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 6</Typography>
              <TextField
                type="text"
                label="Step 6"
                value={step6}
                onChange={(e) => setStep6(e.target.value)}
              />
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 6"
                value={dayTime6}
                onChange={(e) => setDayTime6(e.target.value)}
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
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 7"
                value={dayTime7}
                onChange={(e) => setDayTime7(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 8</Typography>
              <TextField
                type="text"
                label="Step 8"
                value={step8}
                onChange={(e) => setStep8(e.target.value)}
              />
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 8"
                value={dayTime8}
                onChange={(e) => setDayTime8(e.target.value)}
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
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 9"
                value={dayTime9}
                onChange={(e) => setDayTime9(e.target.value)}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", marginTop: 2 }}
            >
              <Typography>Step 10</Typography>
              <TextField
                type="text"
                label="Step 10"
                value={step10}
                onChange={(e) => setStep10(e.target.value)}
              />
              <Typography>DayTime</Typography>
              <TextField
                type="text"
                label="DayTime 10"
                value={dayTime10}
                onChange={(e) => setDayTime10(e.target.value)}
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
        <StepsSkincareTablr />
      </Box>
    </Box>
  );
};

export default StepsSkincare;
