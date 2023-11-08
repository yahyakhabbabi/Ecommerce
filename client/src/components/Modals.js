import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function Modals({ modal, toggle, save, fields }) {
  const initialFieldValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formValues, setFormValues] = useState( initialFieldValues );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = () => {
    save(formValues);
  };

  return (
    <Dialog open={modal} onClose={toggle}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
{        <form>
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <TextField
                label={field.label}
                variant="outlined"
                value={formValues[field.name]}
                onChange={handleChange}
                name={field.name}
                fullWidth
                multiline={field.type === "textarea"}
                rows={field.type === "textarea" ? 5 : undefined}
              />
            </div>
          ))}
        </form> }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button variant="contained" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
