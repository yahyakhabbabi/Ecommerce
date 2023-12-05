import React, { useState, useEffect } from "react";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Alert } from "@mui/material";
import axios from "axios";

// Define the global Html5QrcodeScanner object for ESLint
/* global Html5QrcodeScanner */

export default function PaymentsListPage() {
  const [scanResult, setScanResult] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success"); // Default severity
  const alertColors = {
    success: '#c8e6cb', // A slightly darker shade of green
    warning: '#d95200', // A slightly darker shade of orange
  };
  

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      // preferredCamera: 'user',
    });

    let isScanning = true;

    scanner.render(success, error);

    async function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
        console.log(result)
        const parsedResult = JSON.parse(result);
      console.log(parsedResult.orderId);
      try {
        const response = await axios.put(`http://localhost:3000/v1/orders/${parsedResult.orderId}/${parsedResult.itemId}`);
        console.log(response.data); // Log the response if needed
      
    
          setAlertMessage("Product verified successfully!");
          setAlertSeverity("success");

      } catch (error) {
        console.error("Error updating product:", error);
         setAlertMessage("Product is already verified!");
          setAlertSeverity("warning");
      }
    }      
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      scanner.clear(); // Clean up the scanner when component unmounts
    };
  }, []);
  

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={60} />
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
                    QR Scanning Code
                  </Typography>
                  <Typography variant="body2" color="text.secondary" >
                    {scanResult ? (
                     <div
                    
                     style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '400px', // Set your desired height
                      width: '600px', // Set your desired width
                      border: `1px solid ${alertColors[alertSeverity]}`, // Adding a border using a template literal
                      backgroundColor: alertColors[alertSeverity], // Accessing color from the object
                    }}
                   >
                        <Alert variant="filled" severity={alertSeverity}>
                          {alertMessage}
                        </Alert>
                      </div>
                    ) : (
                      <Typography id="reader"></Typography>
                    )}
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
