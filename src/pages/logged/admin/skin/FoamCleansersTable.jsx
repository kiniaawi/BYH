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

const FoamCleansersTable = () => {
  const [productsData, setProductsData] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isRevertModalOpen, setRevertModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({
    Id: 0,
    ProductName: "",
    ProductType: "",
    SkinType: "",
    SkinIssue: "",
    DayTime: "",
    Frequency: "",
    minAge: "",
    isPregnant: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchFoamCleansers();
  }, []);

  const fetchFoamCleansers = () => {
    axios
      .get("/api/FoamCleansers")
      .then((response) => {
        console.log(response.data);
        console.log(response.data.Data);
        setProductsData(response.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditModalOpen = (prod) => {
    setSelectedProduct(prod);
    console.log(prod);
    setEditModalOpen(true);

    setEditProduct({
      Id: prod.Id,
      ProductName: prod.ProductName,
      ProductType: prod.ProductType,
      SkinType: prod.SkinType,
      SkinIssue: prod.SkinIssue,
      DayTime: prod.DayTime,
      Frequency: prod.Frequency,
      minAge: prod.minAge,
      isPregnant: prod.isPregnant,
    });

    console.log(editProduct.Id);
  };

  const handleEditModalClose = () => {
    setSelectedProduct(null);
    console.log("handleEditmodalClose");
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    console.log("id", editProduct.Id);
    console.log("editStep: ", editProduct);

    const data = {
      Id: editProduct.Id,
      ProductName: editProduct.ProductName,
      ProductType: editProduct.ProductType,
      SkinType: editProduct.SkinType,
      SkinIssue: editProduct.SkinIssue,
      DayTime: editProduct.DayTime,
      Frequency: editProduct.Frequency,
      minAge: editProduct.minAge,
      isPregnant: editProduct.isPregnant,
    };

    axios
      .put(`/api/FoamCleansers/UpdateFoamCl/${editProduct.Id}`, data)
      .then((response) => {
        fetchFoamCleansers();
        console.log("Step has been edited", response.data);
        handleEditModalClose();
      })
      .catch((error) => {
        console.error("Error during editing step", error);
      });
  };

  const handleRevertModalOpen = (prod) => {
    setSelectedProduct(prod);
    setRevertModalOpen(true);
  };

  const handleRevertModalClose = () => {
    setSelectedProduct(null);
    setRevertModalOpen(false);
  };

  const handleRevert = () => {
    console.log(selectedProduct);
    axios
      .put(`/api/FoamCleansers/RevFoamCl/${selectedProduct}`)
      .then((response) => {
        console.log(selectedProduct);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchFoamCleansers();
    setSelectedProduct(null);
    setRevertModalOpen(false);
  };

  const handleDeleteModalOpen = (prod) => {
    setSelectedProduct(prod);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setSelectedProduct(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    console.log(selectedProduct);
    axios
      .put(`/api/FoamCleansers/DelFoamCl/${selectedProduct}`)
      .then((response) => {
        console.log(selectedProduct);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchFoamCleansers();
    setSelectedProduct(null);
    setDeleteModalOpen(false);
  };

  const FoamCleansersColumns = [
    {
      field: "Id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "ProductName",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "ProductType",
      headerName: "Product Type",
      width: 150,
    },
    {
      field: "SkinType",
      headerName: "Skin Type",
      width: 150,
    },
    {
      field: "SkinIssue",
      headerName: "Skin Issue",
      width: 150,
    },
    {
      field: "DayTime",
      headerName: "Day Time",
      width: 100,
    },
    {
      field: "Frequency",
      headerName: "Frequency",
      width: 100,
    },
    {
      field: "minAge",
      headerName: "Minimum Age",
      width: 100,
    },
    {
      field: "isPregnant",
      headerName: "Is Safe For Pregnancy",
      width: 100,
    },
    {
      field: "isDeleted",
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
        const isDeleted = params.row.isDeleted === 1;

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
                  Are you sure you want to delete this Foam Cleanser?
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
                  Are you sure you want to revert this Foam Cleanser?
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
        {productsData && productsData.length !== 0 ? (
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h6" textAlign={"center"} marginBottom={1}>
                  <b>Foam Cleansers Table</b>
                </Typography>
              </Box>
              <div style={{ height: "80vh" }}>
                <DataGrid
                  columns={FoamCleansersColumns}
                  rows={productsData.map((prod, index) => ({
                    id: index,
                    Id: prod.Id,
                    ProductName: prod.ProductName,
                    ProductType: prod.ProductType,
                    SkinType: prod.SkinType,
                    SkinIssue: prod.SkinIssue,
                    DayTime: prod.DayTime,
                    Frequency: prod.Frequency,
                    minAge: prod.minAge,
                    isPregnant: prod.isPregnant,
                    isDeleted: prod.isDeleted,
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
            <Typography>No Foam Cleansers Found in the Database</Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default FoamCleansersTable;
