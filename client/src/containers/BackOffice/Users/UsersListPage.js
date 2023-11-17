import React from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import "../Dashboard/dash.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import UsersTable from "./UsersTable";
import useRefreshToken from "../../../hooks/useRefreshToken";

export default function UsersListPage() {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();
  
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
    </div>
  );
}
