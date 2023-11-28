
import React from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";

import "../Dashboard/dash.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import UsersTable from "./UsersTable";
// import useRefreshToken from "../../../hooks/useRefreshToken";


export default function UsersListPage() {
<<<<<<< HEAD
  const [users, setUsers] = useState();
  
=======
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

>>>>>>> 31727590568500a5c69c9729e5800885b24d2574
  return (

    <div className="bgcolor">
      <Navbar />

      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
       
                  <UsersTable />
        </Box>
      </Box>
      <Copyright />

  );
}
