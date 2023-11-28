import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import MiniDrawer from "../../../components/Sidnevbar";
import Navbar from "../../../components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const UserProfilePage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(""); // State for new image

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Logic to save the edited values
    // Logic to save newImage if required
  };

  const defaultPassword = "********"; // Default password

  const handleImageChange = (event) => {
    // Logic to handle image change
    const file = event.target.files[0];
    // You can set newImage state with file data or use it directly for upload
    setNewImage(URL.createObjectURL(file));
  };

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={false} md={2} />
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                {isEditing ? (
                  <label htmlFor="image-upload">
                    <Avatar
                      alt={user.username}
                      src={newImage || user.userImage}
                      sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
                    />
                    <input
                      id="image-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </label>
                ) : (
                  <Avatar
                    alt={user.username}
                    src={newImage || user.userImage}
                    sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
                  />
                )}

                {isEditing ? (
                  <TextField
                    label="username"
                    defaultValue={user.username}
                    type="username"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="h4" gutterBottom>
                    {user.username}
                  </Typography>
                )}

                {/* Rest of the fields */}
                {isEditing ? (
                  <>
                    <TextField
                      label="First Name"
                      defaultValue={user.firstName}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Last Name"
                      defaultValue={user.lastName}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  </>
                ) : (
                  <Typography variant="h6" gutterBottom>
                    {user.firstName} {user.lastName}
                  </Typography>
                )}
                {isEditing ? (
                  <TextField
                    label="Email"
                    defaultValue={user.email}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {user.email}
                  </Typography>
                )}
                {isEditing ? (
                  <TextField
                    label="Role"
                    defaultValue={user.role}
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{ readOnly: true }}
                    sx={{
                      mb: 2,
                      backgroundColor: "#f4f4f4",
                      "& .MuiInputBase-root.Mui-disabled": {
                        border: "none",
                      },
                    }}
                  />
                ) : (
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    {user.role}
                  </Typography>
                )}
                {isEditing ? (
                  <TextField
                    label="Password"
                    defaultValue={defaultPassword}
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {defaultPassword}
                  </Typography>
                )}
                {isEditing ? (
                  <Button
                    variant="contained"
                    onClick={handleSaveClick}
                    endIcon={<SaveIcon />}
                    sx={{
                      backgroundColor: "#282c34",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#282c34",
                      },
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleEditClick}
                    endIcon={<EditIcon />}
                    sx={{
                      backgroundColor: "#282c34",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#282c34",
                      },
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Paper>
            </Grid>
            <Grid item xs={false} md={2} />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default UserProfilePage;
