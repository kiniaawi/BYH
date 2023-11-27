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
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SkinIssues = ({ handleSkinIssueClick }) => {
  const [newIssue, setNewIssue] = useState();
  const [newIssueUrl, setNewIssueUrl] = useState();
  const [issuesData, setIssuesData] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedEditPlace, setSelectedEditPlace] = useState();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [editIssue, setEditIssue] = useState({
    id: 0,
    issue: "",
    place: "",
    issue_photo_url: "",
  });

  const [issueName, setIssueName] = useState("");
  const [placement, setPlacement] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchIssues = () => {
    axios
      .get("/api/SkinIssues")
      .then((response) => {
        console.log(response.data);
        console.log(response.data.Data);
        setIssuesData(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddIssue = () => {
    const data = {
      IssueName: issueName,
      Placement: placement,
      ImageURL: imageName,
    };

    axios
      .post("/api/SkinIssues", data)
      .then((response) => {
        //fetchIssues();
        alert(response.data.StatusMessage);
        clearTextArea();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddFile = () => {
    console.log(image);
    setImageName(image.name);
    console.log("ImageName: ", imageName);
    axios
      .post("/api/SkinIssues/SaveFile", image)
      .then((response) => {
        //fetchIssues();
        alert(response.data.StatusMessage);
      })
      .catch((error) => {
        console.log(error);
      });

    setImage("");
  };

  const clearTextArea = () => {
    setIssueName("");
    setPlacement("");
    setImageName("");
  };

  const handleEditModalOpen = (issue) => {
    setSelectedIssue(issue);
    setEditModalOpen(true);

    setEditIssue({
      id: issue.id,
      issue: issue.issue,
      place: selectedEditPlace,
      issue_photo_url: issue.issue_photo_url,
    });

    console.log(editIssue.id);
    //setSelectedEditPlace(issue.place);
  };

  const handleEditModalClose = () => {
    setSelectedIssue(null);
    console.log("handleEditmodalClose");
    setEditModalOpen(false);
  };

  //   const handleEdit = () => {
  //     console.log("id", editIssue.id);
  //     console.log("editIssue: ", editIssue);

  //     axios
  //       .post(EDIT_ISSUE_UEL, editIssue)
  //       .then((response) => {
  //         fetchIssues();
  //         console.log("User has been edited", response.data);
  //         handleEditModalClose();
  //       })
  //       .catch((error) => {
  //         console.error("Error during editing user", error);
  //       });
  //   };

  const handleDeleteModalOpen = (issue) => {
    setSelectedIssue(issue);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedIssue(null);
    setDeleteModalOpen(false);
  };

  //   const handleDelete = () => {
  //     console.log(selectedIssue);
  //     axios
  //       .delete(DEL_ISSUE_URL, { data: { id: selectedIssue } })
  //       .then((response) => {
  //         setIssuesData(issuesData.filter((issue) => issue.id !== selectedIssue));
  //         console.log(selectedIssue);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     fetchIssues();
  //     setSelectedIssue(null);
  //     setDeleteModalOpen(false);
  //   };

  const handleFlagClose = () => {
    handleSkinIssueClick();
  };

  const IssuesColumns = [
    {
      field: "Id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "IssueName",
      headerName: "Skin Issue",
      width: 150,
    },
    {
      field: "Placement",
      headerName: "Placement",
      width: 150,
    },
    {
      field: "ImageURL",
      headerName: "Issue Picture",
      width: 150,
      renderCell: (params) => {
        console.log(params.row.ImageURL);
        return (
          <img
            src={`https://localhost:44313/Photos/${params.row.ImageURL}`}
            alt="Issue"
            style={{ width: "auto", height: 100 }}
          />
        );
      },
    },
    {
      field: "IsDeleted",
      headerName: "Is Deleted",
      width: 50,
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
        return (
          <Button
            sx={{ color: "red" }}
            size="small"
            onClick={() => {
              console.log("Clicked contact:", params.row.id);
              handleDeleteModalOpen(params.row.id);
            }}
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <Box flex={12} p={2} overflow={"auto"}>
      {/* Edit Issue Modal */}
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
                    value={editIssue.issue}
                  />
                  <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                    <InputLabel id="place-label">Placement</InputLabel>
                    <Select
                      labelId="place-label"
                      id="place-select"
                      value={editIssue.place}
                      onChange={(e) =>
                        setEditIssue({
                          ...editIssue,
                          place: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="face">Face</MenuItem>
                      <MenuItem value="neck">Neck</MenuItem>
                      <MenuItem value="back">Back</MenuItem>
                      <MenuItem value="arms">Arms</MenuItem>
                      <MenuItem value="legs">Legs</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    sx={{ marginBottom: 2 }}
                    name="issue_photo_url"
                    label="Skin Picture Src"
                    fullWidth
                    value={editIssue.issue_photo_url}
                  />
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
                            //onClick={handleEdit}
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
                <Typography>
                  Are you sure you want to delete this skin issue?
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
                        //onClick={handleDelete}
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

      <div style={{ overflow: "auto" }}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: "right" }}>
              <Button onClick={() => handleFlagClose()}>
                <CloseIcon />
                Close
              </Button>
            </Box>
            <Typography variant="h6" textAlign={"center"}>
              <b>Add Skin Issue</b>
            </Typography>
            <Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1} margin="auto">
                  <Grid item xs={12} margin={2}>
                    <TextField
                      type="text"
                      label="Skin Issue"
                      value={issueName}
                      onChange={(e) => setIssueName(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} margin={2}>
                    <FormControl fullWidth required>
                      <InputLabel id="place-label">Placement</InputLabel>
                      <Select
                        labelId="place-label"
                        id="place-select"
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                      >
                        <MenuItem key="face" value="face">
                          Face
                        </MenuItem>
                        <MenuItem key="neck" value="neck">
                          Neck
                        </MenuItem>
                        <MenuItem key="back" value="back">
                          Back
                        </MenuItem>
                        <MenuItem key="arms" value="arms">
                          Arms
                        </MenuItem>
                        <MenuItem key="legs" value="legs">
                          Legs
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} margin={2}>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <Button onClick={() => handleAddFile()}>Add File</Button>
                    {/* <TextField
                      type="text"
                      label="Skin Picture Src"
                      value={image}
                      onChange={(e) =>
                        setImage(
                          '"/skin_issues_pictures/' + e.target.value + '"'
                        )
                      }
                      required
                      fullWidth
                    /> */}
                  </Grid>
                  <Grid item xs={12} margin={2}>
                    <Box textAlign={"center"}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddIssue()}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
        {issuesData && issuesData.length !== 0 ? (
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h6" textAlign={"center"} marginBottom={1}>
                  <b>Skin Issues Table</b>
                </Typography>
              </Box>
              <div style={{ height: "80vh" }}>
                <DataGrid
                  columns={IssuesColumns}
                  rows={issuesData.map((issue, index) => ({
                    id: index,
                    Id: issue.Id,
                    IssueName: issue.IssueName,
                    Placement: issue.Placement,
                    ImageURL: issue.ImageURL,
                    IsDeleted: issue.IsDeleted,
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
            <Typography>No skin issues found in the database</Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default SkinIssues;
