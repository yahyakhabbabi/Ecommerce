import React from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export default function ModalsDelete({ open, onClose, onDeleteConfirmed }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          Confirm Delete
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to delete this user?
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={onDeleteConfirmed}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
