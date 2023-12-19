import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function CardChart({
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
        maxWidth:1166,
        height: height,
        background: gradient,
        color: colord,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding:1
        }}
      >

          <Typography gutterBottom component="div" style={{fontSize:20 }}>
            {title}
          </Typography>
  

        {chartComponent && (
          <div style={{ flex: 1}}>
            <Typography variant="body2" color="text.secondary">
              {chartComponent}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
