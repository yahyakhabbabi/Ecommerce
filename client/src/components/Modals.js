import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { Box } from "@mui/system";

export default function Modals({ modal, toggle, save, fields, dialogTitle }) {
  const initialFieldValues = fields.reduce((acc, field) => {
    acc[field.field] = "";
    return acc;
  }, {});

  const [formValues, setFormValues] = useState(initialFieldValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = () => {
    save(formValues);
    setFormValues(initialFieldValues); // Reset form values after saving
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      product_image: file,
    });
  };

  return (
    <Dialog open={modal} onClose={toggle}>
      <DialogTitle>
        <Box sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
          {dialogTitle}
        </Box>
      </DialogTitle>
      <Divider />
      <Box sx={2} />
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            {fields.map((field) => (
              <Grid item xs={fields.length === 1 ? 12 : fields.length <= 8 ? 6 : 4} key={field.field}>
                {field.type === "email" ? (
                  <TextField
                    label={field.label}
                    variant="outlined"
                    value={formValues[field.field]}
                    onChange={handleChange}
                    name={field.field}
                    fullWidth
                    style={{
                      marginBottom: "16px",
                    }}
                    type="email"
                  />
                ) : field.type === "password" ? (
                  // Handle password input
                  <TextField
                    label={field.label}
                    variant="outlined"
                    value={formValues[field.field]}
                    onChange={handleChange}
                    name={field.field}
                    fullWidth
                    style={{
                      marginBottom: "16px",
                    }}
                    type="password"
                  />
                ) : field.type === "Booleen" ? (
                  <FormControl fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={formValues[field.field]}
                      onChange={handleChange}
                      name={field.field}
                      variant="outlined" 
                      sx={{ border: "1px solid #ccc", borderRadius: "4px" }} 
                    >
                      <MenuItem value={field.option1}>{field.option1}</MenuItem>
                      <MenuItem value={field.option2}>{field.option2}</MenuItem>
                    </Select>
                  </FormControl>
                ):field.type === "image" ? (
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                   
                    id="imageInput"
                  />
                ) : (
                  <TextField
                    label={field.label}
                    variant="outlined"
                    value={formValues[field.field]}
                    onChange={handleChange}
                    name={field.field}
                    fullWidth
                    style={{
                      marginBottom: "16px",
                    }}
                    multiline={field.type === "textarea"}
                    rows={field.type === "textarea" ? 5 : 1}
                    type="text"
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#1976D2",
            color: "#fff",
            marginRight: "8px",
          }}
          onClick={handleSave}
        >
          Create
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#E53935",
            color: "#fff",
          }}
          onClick={toggle}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
