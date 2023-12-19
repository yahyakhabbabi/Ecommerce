import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function CustomCard({
  title,
  content2,
  content,
  gradient,
  height,
  chartComponent,
  colord
}) {
  return (
    <Card
      sx={{
        maxWidth: 500,
        height: height,
        background: gradient,
        color: colord,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative", // Make the card position relative
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "8px",
          position: "relative", // Ensure content positioning is relative to the card
        }}
      >
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <Typography variant="h5" style={{ marginRight: "10px" }}>
            {title}
          </Typography>
          <div style={{ position: "absolute", left: "250px" }}> {/* Adjust left position as needed */}
            <Typography variant="body1">
              {content}
            </Typography>
          </div>
        </div>
        <Typography variant="body1" style={{ marginTop: "10px", fontSize: "26px" }}>
          {content2}
        </Typography>
      </CardContent>
    </Card>
  );
}
