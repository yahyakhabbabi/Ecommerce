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
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './users.css';
import DeleteUser from './DeleteUser';
import EditUserPage from './EditUserPage';
import AddUserPage from './AddUserPage';

export default function UsersListPage() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'status', headerName: 'Status', width: 220 },
    { field: 'date', headerName: 'Date', width: 220 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        const handleDeleteUser = () => {
          setUserToDelete(params.row);
          setDeleteDialogOpen(true);
        };

        const handleEditUser = () => {
          setUserToEdit(params.row);
          setEditDialogOpen(true);
        };

        return (
          <>
            <EditIcon className="userListEdit" onClick={handleEditUser} />
            <DeleteIcon className="userListDelete" onClick={handleDeleteUser} />
          </>
        );
      },
    },
  ];

  const initialRows = [
    { id: 1, username: 'Snowbaby', email: 'snpwbaby@gmail.com', status: 'active', date: '02/11/2023' },
    { id: 2, username: 'John Doe', email: 'john.doe@yahoo.com', status: 'active', date: '02/11/2023' },
    { id: 3, username: 'Jane Smith', email: 'janesmith@hotmail.com', status: 'passive', date: '02/11/2023' },
    { id: 4, username: 'Alice Johnson', email: 'alicejohnson@aol.com', status: 'passive', date: '03/11/2023' },
  ];

  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(initialRows);

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteUser = () => {
    console.log('User deleted:', userToDelete);
    setDeleteDialogOpen(false);
  };

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (newUsername, newEmail) => {
    console.log('User edited:', newUsername, newEmail);
    setEditDialogOpen(false);
  };

  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };

  const handleSaveNewUser = (newUsername, newEmail, newStatus) => {
    const newUser = {
      id: rows.length + 1,
      username: newUsername,
      email: newEmail,
      status: newStatus,
      date: new Date().toLocaleDateString(),
    };

    setRows((prevRows) => [...prevRows, newUser]);
    setAddUserDialogOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', marginTop: '12px' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
          style={{ marginRight: '8px', marginLeft: '8px' }}
        />
        <Button
          variant="outlined"
          onClick={handleAddUser}
          style={{ width: '20%', background: 'blue', color: 'white' }}
        >
          Add User
        </Button>
      </div>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableSelectionOnClick
        pageSize={5}
        checkboxSelection
      />

      <EditUserPage
        isOpen={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        initialUsername={userToEdit ? userToEdit.username : ''}
        initialEmail={userToEdit ? userToEdit.email : ''}
      />

      <DeleteUser
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirmDelete={handleDeleteUser}
        username={userToDelete ? userToDelete.username : ''}
      />

      <AddUserPage
        isOpen={isAddUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        onSave={handleSaveNewUser}
      />
    </div>
  );
}
