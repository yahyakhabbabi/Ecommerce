import React from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";
import "../Dashboard/dash.css";
import OrdersTable from "./ordersTable";


export default function OrdersPage() {
  return (
    <div className="bgcolor">
      <Navbar />

      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        
                  <OrdersTable />
        </Box>
      </Box>
      <Copyright />
    </div>
  );
}
