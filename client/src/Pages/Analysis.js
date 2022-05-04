import React, { useEffect } from "react";
import "./css/Analysis.scss";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Cookies from "universal-cookie";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Analysis = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

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

  useEffect(() => {
    if (cookies.get("userLoggedIn") === "true") {
      document.getElementById("overlaybr-icon-info").style.display = "block";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="uploadButton">
        <ThemeProvider theme={theme}>
          <Button variant="contained" component="label" color="secondary">
            Upload New Dataset&nbsp;&nbsp;
            <CloudUploadIcon />
            <input type="file" accept=".csv,.xlsx,.xls" hidden />
          </Button>
        </ThemeProvider>
      </div>
      <div class="overlaybr-icon-info" id="overlaybr-icon-info">
        <ThemeProvider theme={theme}>
          <Fab
            color="secondary"
            aria-label="navigate"
            onClick={() => navigate("/")}
          >
            <ArrowBackIosNewIcon />
          </Fab>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Analysis;
