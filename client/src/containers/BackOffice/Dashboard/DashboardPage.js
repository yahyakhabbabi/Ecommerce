import React, { useContext, useEffect, useState } from "react";
import "./dash.css";
import MiniDrawer from "../../../components/Sidnevbar";
import Navbar from "../../../components/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Copyright from "../../../components/Footer";
import Stack from "@mui/material/Stack";
import Tinybarchart from "./Tinybarchart";
import PieChartComponent from "./PieCart";
import CustomCard from "./Card";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthContext from "../../../context/AuthContext";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AreaResponsiveContainer from "./AreaResponsiveContainer";
import PersonIcon from '@mui/icons-material/Person';
import CardChart from "./CardChart";
import axios from "axios";

export default function DashboardPage() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const [orderNbre, setOrderNbre] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrderNbr = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/orders/orders/nbre`, {
          headers: {
            Authorization: `Bearer ${authTokens?.access_token}`,
          },
        });
        setOrderNbre(response.data);
      } catch (error) {
        setError("Error fetching customer data: " + error.message);
      }
    };

    fetchOrderNbr();
  }, [authTokens]);
  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CardChart
                title="Customers"
                chartComponent={<Tinybarchart />}
                height="35vh"
              />
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                <CustomCard
                  title="Number of sales"
                  content2={orderNbre.orderCount}
                  content3="orders"
                  content={<ShoppingCartIcon />}
                  gradient="linear-gradient(120deg, #FF5733, #FFC300)"
                  height="16vh"
                  colord="var(--body_color)"
                />
                <CustomCard
                  title="Number of customer"
                  content={<AccountCircleIcon />}
                  content2="15"
                  gradient="linear-gradient(45deg, #673ab7, #03a9f4)"
                  height="16vh"
                  colord="var(--body_color)"
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                <CustomCard
                  title="Number of users"
                  content={<PersonIcon />}
                  content2="15"
                  gradient="linear-gradient(45deg, #00bcd4, #009688)"
                  height="16vh"
                  colord="var(--body_color)"
                />
                <CustomCard
                  title="Total revenues"
                  content={<MonetizationOnIcon />}
                  content3="orders"
                  content2={`${orderNbre.totalRevenue}$`}
                  gradient="linear-gradient(-45deg, #E91E63, #FF5722)"
                  height="16vh"
                  colord="var(--body_color)"
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <CardChart
                title="product"
                chartComponent={<PieChartComponent />}
                height="35vh"
              />
            </Grid>
            <Grid item xs={12}>
              <CardChart
                title="Card Title 5"
                height="45vh"
                chartComponent={<AreaResponsiveContainer />}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </div>
  );
}
