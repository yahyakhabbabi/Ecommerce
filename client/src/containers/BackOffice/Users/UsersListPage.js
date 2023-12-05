import React from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";

import "../Dashboard/dash.css";
import UsersTable from "./UsersTable";
// import useRefreshToken from "../../../hooks/useRefreshToken";

export default function UsersListPage() {


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