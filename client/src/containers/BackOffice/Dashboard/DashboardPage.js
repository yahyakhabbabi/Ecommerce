import "./dash.css";
import React,{useContext} from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Navbar from "../../../components/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Copyright from "../../../components/Footer";
import Stack from "@mui/material/Stack";
import Barchart from "./Barchart";
import Tinybarchart from "./Tinybarchart";
import PieChartComponent from "./PieCart";
import CustomCard from "./Card";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) {

    navigate("/");
    return null;
  }
  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CustomCard
                title="Customers"
                chartComponent={<Tinybarchart />}
                height="42vh"
              />
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                <CustomCard
                  title="Number of sales"
                  content2="500$"
                  content={<ShoppingCartIcon/>}
                  gradient="linear-gradient(120deg, #FF5733, #FFC300)"
                  height="20vh"
                  colord="var(--body_color)"
                  chartComponent={<Barchart />}
                />
                <CustomCard
                  title="customers"
                  content=""
                  gradient="linear-gradient(45deg, #673ab7, #03a9f4)"
                  height="20vh"
                  colord="var(--body_color)"
                  chartComponent={<Barchart />}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={2}>
                <CustomCard
                  title="Card Title 3"
                  content=""
                  gradient="linear-gradient(45deg, #00bcd4, #009688)"
                  height="20vh"
                  colord="var(--body_color)"
                  chartComponent={<Barchart />}
                />
                <CustomCard
                  title="Total revenues"
                  content=""
                  gradient="linear-gradient(-45deg, #E91E63, #FF5722)"
                  height="20vh"
                  colord="var(--body_color)"
                  chartComponent={<Barchart />
               }
                />
              </Stack>
            </Grid>
            <Grid item xs={3} >
              <CustomCard
                title=""
                content={<PieChartComponent />}
                height="42vh"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomCard title="Card Title 5" height="35vh" chartComponent={<Barchart />}/>
            </Grid>
            <Grid item xs={6}>
              <CustomCard title="Card Title 6"height="35vh" chartComponent={<Barchart />} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </div>
  );
}
