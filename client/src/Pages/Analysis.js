import React, { useEffect } from "react";
import "./css/Analysis.scss";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Cookies from "universal-cookie";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Papa from "papaparse";
import * as CryptoJS from "crypto-js";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Analysis = () => {
  // let [data, setData] = React.useState("");

  const navigate = useNavigate();
  const cookies = new Cookies();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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

  // const handleFileRead = ({file}) =>{
  //   const fileReader = new FileReader();

  // }

  const decryptStringWithAES = (encryptedText) => {
    const passphrase = "123"; // make this an environment variable
    const bytes = CryptoJS.AES.decrypt(encryptedText, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  const handleGetAnalys = (e) => {
    fetch(
      "http://localhost:3001/users//getAnalyses/" +
        decryptStringWithAES(cookies.get("userId")),
      {
        method: "GET",
      }
    ).then((response) => {
      if (response.ok) {
        console.log(response);
        response.json().then((dataJson) => {
          const info = JSON.stringify(dataJson);

          return info;
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleFile = (e) => {
    const content = e.target.result;
    console.log(decryptStringWithAES(cookies.get("userId")));
    if (content) {
      let csv = Papa.parse(content, {
        delimiter: "",
        newline: "",
        quoteChar: "",
        escapeChar: "",
        header: false,
        dynamicTyping: false,
        skipEmptyLines: true,
      });

      const fileData = {
        dataset: csv,
      };

      fetch(
        "http://localhost:3001/users/" +
          decryptStringWithAES(cookies.get("userId")),
        {
          method: "PUT",
          body: JSON.stringify(fileData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.ok) {
          console.log(response);
          console.log(JSON.stringify(fileData));
        } else {
          console.log(response);
        }
      });
    }
    // You can set content in state and show it in render.
  };

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  };

  const analys = {
    date: "ssda",
    dataset: "iiiiiiiiii",
    response: "kkkkkkkkkkkkkkkkk",
    status: "2",
  };

  // const handleFileSubmited = (e) => {
  //   e.preventDefault();

  //   fetch("http://localhost:3001/users/" + cookies.get("user"), {
  //     method: "PUT",
  //     body: JSON.stringify(csv),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => {
  //     if (response.ok) {
  //       console.log(response);
  //     } else {
  //       console.log(response);
  //     }
  //   });
  // };

  useEffect(() => {
    if (cookies.get("userLoggedIn") === "true") {
      document.getElementById("overlaybr-icon-info").style.display = "block";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <Box sx={{ width: "50%" }}>
          <Stack spacing={2}>
            <Item onClick={handleGetAnalys}>
              {analys.date} {analys.dataset} {analys.response} {analys.status}
            </Item>
          </Stack>
        </Box>
      </div>
      <div className="upload-button">
        <label htmlFor="upload-dataset">
          <ThemeProvider theme={theme}>
            <input
              style={{
                display: "none",
              }}
              id="upload-dataset"
              name="upload-dataset"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => {
                handleChangeFile(e.target.files[0]);
              }}
              hidden
            />
            <Fab
              color="secondary"
              size="large"
              component="span"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </ThemeProvider>
        </label>
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
