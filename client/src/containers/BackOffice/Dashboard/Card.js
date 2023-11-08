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
        maxWidth: 700,
        height: height,
        background: gradient,
        color:colord
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div className="flexCard">
          <Typography variant="body2">{content}</Typography>
            <Typography gutterBottom component="div">
              {title}
            </Typography>
            <Typography variant="body2">{content2}</Typography>
         
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {chartComponent}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
