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

const SkinIssues = ({ handleSkinIssueClick }) => {
  const [issuesData, setIssuesData] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isRevertModalOpen, setRevertModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [editIssue, setEditIssue] = useState({
    Id: 0,
    IssueName: "",
    Placement: "",
    ImageURL: "",
  });
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

  //   const handleAddFile = () => {
  //     console.log(editIssue.ImageURL);
  //     setImageName(editIssue.ImageURL.name);
  //     console.log("ImageName: ", imageName);
  //     axios
  //       .post("/api/SkinIssues/SaveFile", editIssue.ImageURL)
  //       .then((response) => {
  //         //fetchIssues();
  //         alert(response.data.StatusMessage);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     setImage("");
  //     setImageName("");
  //   };

  const handleAddFile = () => {
    console.log(image);
    setImageName(image.name);
    console.log("ImageName: ", imageName);

    const formData = new FormData();
    formData.append("file", image);

    axios
      .post("/api/SkinIssues/SaveFile", formData)
      .then((response) => {
        //fetchIssues();
        alert(response.data.StatusMessage);
      })
      .catch((error) => {
        console.log("Error uploading file:", error);
        if (error.response) {
          // Błąd odpowiedzi z serwera
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          // Błąd żądania
          console.log("Request data:", error.request);
        } else {
          // Inny błąd
          console.error("Error:", error.message);
        }
      });

    setImage("");
  };

  const handleEditModalOpen = (issue) => {
    setSelectedIssue(issue);
    console.log(issue);
    setEditModalOpen(true);

    setEditIssue({
      Id: issue.Id,
      IssueName: issue.IssueName,
      Placement: issue.Placement,
      ImageURL: issue.ImageURL,
    });

    console.log(editIssue.Id);
  };

  const handleEditModalClose = () => {
    setSelectedIssue(null);
    console.log("handleEditmodalClose");
    setEditModalOpen(false);
    setImageName("");
    setImage("");
  };

  const handleEdit = () => {
    console.log("id", editIssue.Id);
    console.log("editIssue: ", editIssue);

    if (imageName === undefined) {
      setImageName("none.png");
    }

    const data = {
      Id: editIssue.Id,
      IssueName: editIssue.IssueName,
      Placement: editIssue.Placement,
      ImageURL: imageName,
    };

    axios
      .put(`/api/SkinIssues/UpdateIssue/${editIssue.Id}`, data)
      .then((response) => {
        fetchIssues();
        console.log("Issue has been edited", response.data);
        handleEditModalClose();
      })
      .catch((error) => {
        console.error("Error during editing issue", error);
      });

    setImageName("");
  };

  const handleRevertModalOpen = (issue) => {
    setSelectedIssue(issue);
    setRevertModalOpen(true);
  };

  const handleRevertModalClose = () => {
    setSelectedIssue(null);
    setRevertModalOpen(false);
  };

  const handleRevert = () => {
    console.log(selectedIssue);
    axios
      .put(`/api/SkinIssues/RevIssue/${selectedIssue}`)
      .then((response) => {
        console.log(selectedIssue);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchIssues();
    setSelectedIssue(null);
    setRevertModalOpen(false);
  };

  const handleDeleteModalOpen = (issue) => {
    setSelectedIssue(issue);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedIssue(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    console.log(selectedIssue);
    axios
      .put(`/api/SkinIssues/DelIssue/${selectedIssue}`)
      .then((response) => {
        console.log(selectedIssue);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchIssues();
    setSelectedIssue(null);
    setDeleteModalOpen(false);
  };

  const IssuesColumns = [
    {
      field: "Id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "IssueName",
      headerName: "Skin Issue",
      width: 150,
    },
    {
      field: "Placement",
      headerName: "Placement",
      width: 100,
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
                  Are you sure you want to revert this skin issue?
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
