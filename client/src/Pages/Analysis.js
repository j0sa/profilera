import React from "react";
import "./css/Analysis.scss";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Analysis = () => {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
      secondary: {
        main: "#a239ca",
        darker: "#6a0080",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button variant="contained" component="label" color="secondary">
          Upload Dataset&nbsp;&nbsp;
          <CloudUploadIcon />
          <input type="file" hidden />
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default Analysis;
