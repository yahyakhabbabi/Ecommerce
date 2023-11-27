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

export default function AddUserPage({ isOpen, onClose, onSave }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('active');

  const handleSave = () => {
    onSave(username, email, status);
    setUsername('');
    setEmail('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="add-user-dialog-title">
      <DialogTitle id="add-user-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the user's information:</DialogContentText>
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
          <option value="inactive">Passive</option>
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
