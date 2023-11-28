import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StepsSkincareTable = () => {
  const [stepsData, setStepsData] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isRevertModalOpen, setRevertModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [editStep, setEditStep] = useState({
    Id: 0,
    SkinType: "",
    Step1: "",
    DayTime1: "",
    Step2: "",
    DayTime2: "",
    Step3: "",
    DayTime3: "",
    Step4: "",
    DayTime4: "",
    Step5: "",
    DayTime5: "",
    Step6: "",
    DayTime6: "",
    Step7: "",
    DayTime7: "",
    Step8: "",
    DayTime8: "",
    Step9: "",
    DayTime9: "",
    Step10: "",
    DayTime10: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = () => {
    axios
      .get("/api/SkincareSteps")
      .then((response) => {
        console.log(response.data);
        console.log(response.data.Data);
        setStepsData(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditModalOpen = (step) => {
    setSelectedStep(step);
    console.log(step);
    setEditModalOpen(true);

    setEditStep({
      Id: step.Id,
      SkinType: step.SkinType,
      Step1: step.Step1,
      DayTime1: step.DayTime1,
      Step2: step.Step2,
      DayTime2: step.DayTime2,
      Step3: step.Step3,
      DayTime3: step.DayTime3,
      Step4: step.Step4,
      DayTime4: step.DayTime4,
      Step5: step.Step5,
      DayTime5: step.DayTime5,
      Step6: step.Step6,
      DayTime6: step.DayTime6,
      Step7: step.Step7,
      DayTime7: step.DayTime7,
      Step8: step.Step8,
      DayTime8: step.DayTime8,
      Step9: step.Step9,
      DayTime9: step.DayTime9,
      Step10: step.Step10,
      DayTime10: step.DayTime10,
      IsDeleted: step.IsDeleted,
    });

    console.log(editStep.Id);
  };

  const handleEditModalClose = () => {
    setSelectedStep(null);
    console.log("handleEditmodalClose");
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    console.log("id", editStep.Id);
    console.log("editStep: ", editStep);

    const data = {
      Id: editStep.Id,
      SkinType: editStep.SkinType,
      Step1: editStep.Step1,
      DayTime1: editStep.DayTime1,
      Step2: editStep.Step2,
      DayTime2: editStep.DayTime2,
      Step3: editStep.Step3,
      DayTime3: editStep.DayTime3,
      Step4: editStep.Step4,
      DayTime4: editStep.DayTime4,
      Step5: editStep.Step5,
      DayTime5: editStep.DayTime5,
      Step6: editStep.Step6,
      DayTime6: editStep.DayTime6,
      Step7: editStep.Step7,
      DayTime7: editStep.DayTime7,
      Step8: editStep.Step8,
      DayTime8: editStep.DayTime8,
      Step9: editStep.Step9,
      DayTime9: editStep.DayTime9,
      Step10: editStep.Step10,
      DayTime10: editStep.DayTime10,
    };

    axios
      .put(`/api/SkincareSteps/UpdateStep/${editStep.Id}`, data)
      .then((response) => {
        fetchSteps();
        console.log("Step has been edited", response.data);
        handleEditModalClose();
      })
      .catch((error) => {
        console.error("Error during editing step", error);
      });
  };

  const handleRevertModalOpen = (step) => {
    setSelectedStep(step);
    setRevertModalOpen(true);
  };

  const handleRevertModalClose = () => {
    setSelectedStep(null);
    setRevertModalOpen(false);
  };

  const handleRevert = () => {
    console.log(selectedStep);
    axios
      .put(`/api/SkincareSteps/RevStep/${selectedStep}`)
      .then((response) => {
        console.log(selectedStep);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchSteps();
    setSelectedStep(null);
    setRevertModalOpen(false);
  };

  const handleDeleteModalOpen = (step) => {
    setSelectedStep(step);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedStep(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    console.log(selectedStep);
    axios
      .put(`/api/SkincareSteps/DelStep/${selectedStep}`)
      .then((response) => {
        console.log(selectedStep);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchSteps();
    setSelectedStep(null);
    setDeleteModalOpen(false);
  };

  const StepsColumns = [
    {
      field: "Id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "SkinType",
      headerName: "Skin Type",
      width: 150,
    },
    {
      field: "Step1",
      headerName: "Step 1",
      width: 100,
    },
    {
      field: "DayTime1",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step2",
      headerName: "Step 2",
      width: 100,
    },
    {
      field: "DayTime2",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step3",
      headerName: "Step 3",
      width: 100,
    },
    {
      field: "DayTime3",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step4",
      headerName: "Step 4",
      width: 100,
    },
    {
      field: "DayTime4",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step5",
      headerName: "Step 5",
      width: 100,
    },
    {
      field: "DayTime5",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step6",
      headerName: "Step 6",
      width: 100,
    },
    {
      field: "DayTime6",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step7",
      headerName: "Step 7",
      width: 100,
    },
    {
      field: "DayTime7",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step8",
      headerName: "Step 8",
      width: 100,
    },
    {
      field: "DayTime8",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step9",
      headerName: "Step 9",
      width: 100,
    },
    {
      field: "DayTime9",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "Step10",
      headerName: "Step 10",
      width: 100,
    },
    {
      field: "DayTime10",
      headerName: "DayTime",
      width: 100,
    },
    {
      field: "IsDeleted",
      headerName: "Is Deleted",
      width: 90,
    },
    {
      field: "action-edit",
      headerName: "Edit",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            sx={{ color: "green" }}
            size="small"
            onClick={() => handleEditModalOpen(params.row)}
          >
            <EditIcon />
          </Button>
        );
      },
    },
    {
      field: "action-delete",
      headerName: "Delete",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const isDeleted = params.row.IsDeleted === 1;

        return (
          <Button
            sx={{ color: isDeleted ? "blue" : "red" }}
            size="small"
            onClick={() => {
              console.log("Clicked issue:", params.row.Id);
              if (isDeleted) {
                handleRevertModalOpen(params.row.Id);
              } else {
                handleDeleteModalOpen(params.row.Id);
              }
            }}
          >
            {isDeleted ? <AddIcon /> : <DeleteIcon />}
          </Button>
        );
      },
    },
  ];

  return (
    <Box flex={12} p={2}>
      {/* Edit Issue Modal */}
      {/* <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "50%",
          }}
          overflow={"auto"}
          open={isEditModalOpen}
          onClose={() => handleEditModalClose()}
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
              <Card>
                <Typography variant="h5" sx={{ textAlign: "center", p: 3 }}>
                  <b>Edit Skin Issue</b>
                </Typography>
                <CardContent sx={{ maxHeight: "600px", overflow: "auto" }}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      sx={{ marginBottom: 2 }}
                      name="issue"
                      label="Skin Issue"
                      fullWidth
                      value={editIssue.IssueName}
                    />
                    <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                      <InputLabel id="place-label">Placement</InputLabel>
                      {editIssue.Placement !== undefined && (
                        <Select
                          labelId="place-label"
                          id="place-select"
                          value={editIssue.Placement}
                          onChange={(e) =>
                            setEditIssue({
                              ...editIssue,
                              Placement: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="face">Face</MenuItem>
                          <MenuItem value="neck">Neck</MenuItem>
                          <MenuItem value="back">Back</MenuItem>
                          <MenuItem value="arms">Arms</MenuItem>
                          <MenuItem value="legs">Legs</MenuItem>
                        </Select>
                      )}
                    </FormControl>
                    <TextField
                      sx={{ marginBottom: 2 }}
                      name="issue_photo_url"
                      label="Picture"
                      fullWidth
                      value={imageName}
                      disabled
                    />
                    <Grid item xs={12} margin={2}>
                      <input
                        type="file"
                        //   onChange={(e) =>
                        //     setEditIssue({
                        //       ...editIssue,
                        //       ImageURL: e.target.files[0],
                        //     })
                        //   }
                        onChange={(e) => handleImageChange(e)}
                      />
                      <Button onClick={() => handleAddFile()}>Add File</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
                      <Box
                        sx={{
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          width={"30vw"}
                          sx={{
                            textAlign: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <Stack direction="row" justifyContent={"space-between"}>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{
                                marginTop: 2,
                                marginRight: 0.5,
                                textAlign: "center",
                              }}
                              onClick={handleEdit}
                            >
                              Submit
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                marginTop: 2,
                                marginLeft: 0.5,
                                textAlign: "center",
                              }}
                              onClick={handleEditModalClose}
                            >
                              Close
                            </Button>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        </Modal> */}

      {/* Delete Issue Modal */}
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
        open={isDeleteModalOpen}
        onClose={() => handleDeleteModalClose()}
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
            <Card>
              <CardContent>
                <Typography sx={{ textAlign: "center" }}>
                  Are you sure you want to delete this skincare routine?
                </Typography>
                <Box
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    width={"30vw"}
                    sx={{
                      textAlign: "center",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                  >
                    <Stack direction="row" justifyContent={"space-between"}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          marginTop: 2,
                          marginRight: 0.5,
                          textAlign: "center",
                        }}
                        onClick={handleDelete}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginLeft: 0.5,
                          textAlign: "center",
                        }}
                        onClick={handleDeleteModalClose}
                      >
                        No
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Modal>

      {/* Delete Issue Modal */}
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
        open={isRevertModalOpen}
        onClose={() => handleRevertModalClose()}
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
            <Card>
              <CardContent>
                <Typography>
                  Are you sure you want to revert this skincare routine?
                </Typography>
                <Box
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    width={"30vw"}
                    sx={{
                      textAlign: "center",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                  >
                    <Stack direction="row" justifyContent={"space-between"}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          marginTop: 2,
                          marginRight: 0.5,
                          textAlign: "center",
                        }}
                        onClick={handleRevert}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          marginLeft: 0.5,
                          textAlign: "center",
                        }}
                        onClick={handleRevertModalClose}
                      >
                        No
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Modal>

      <div style={{ overflow: "auto" }}>
        {stepsData && stepsData.length !== 0 ? (
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h6" textAlign={"center"} marginBottom={1}>
                  <b>Skincare Routines Table</b>
                </Typography>
              </Box>
              <div style={{ height: "80vh" }}>
                <DataGrid
                  columns={StepsColumns}
                  rows={stepsData.map((step, index) => ({
                    id: index,
                    Id: step.Id,
                    SkinType: step.SkinType,
                    Step1: step.Step1,
                    DayTime1: step.DayTime1,
                    Step2: step.Step2,
                    DayTime2: step.DayTime2,
                    Step3: step.Step3,
                    DayTime3: step.DayTime3,
                    Step4: step.Step4,
                    DayTime4: step.DayTime4,
                    Step5: step.Step5,
                    DayTime5: step.DayTime5,
                    Step6: step.Step6,
                    DayTime6: step.DayTime6,
                    Step7: step.Step7,
                    DayTime7: step.DayTime7,
                    Step8: step.Step8,
                    DayTime8: step.DayTime8,
                    Step9: step.Step9,
                    DayTime9: step.DayTime9,
                    Step10: step.Step10,
                    DayTime10: step.DayTime10,
                    IsDeleted: step.IsDeleted,
                  }))}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20, 50]}
                  slots={{ toolbar: GridToolbar }}
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Box textAlign={"center"} marginTop={2}>
            <Typography>No skincare routines found in the database</Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default StepsSkincareTable;
