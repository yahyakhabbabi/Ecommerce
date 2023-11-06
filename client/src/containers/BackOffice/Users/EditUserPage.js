import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Select,
} from '@mui/material';

export default function EditUserPage({ isOpen, onClose, onSave, initialUsername, initialEmail, initialStatus }) {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [status,setStatus] = useState(initialStatus);

  const handleSave = () => {
    onSave(username, email, status);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="edit-dialog-title">
      <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the user's information:</DialogContentText>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">passive</option>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}