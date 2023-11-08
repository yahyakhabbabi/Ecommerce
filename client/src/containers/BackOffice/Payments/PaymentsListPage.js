import React from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";
import Grid from "@mui/material/Grid";
import  Typography  from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../Dashboard/dash.css";

export default function PaymentsListPage() {
  return (
    <div className="bgcolor">
    <Navbar />
    
    <Box height={60}/>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Card
      sx={{
        maxWidth: 1200,
        height: "83vh",
        background: "white",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            payments
        </Typography>
        <Typography variant="body2" color="text.secondary">
       
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
    </Card>
            
            </Grid>
            </Grid>
        </Box>
      </Box>
      <Copyright />
 </div>
  );
}

