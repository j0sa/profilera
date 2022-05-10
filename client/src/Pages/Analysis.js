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

import ReactDOM from "react-dom";

const Analysis = () => {
  // let [data, setData] = React.useState("");

  const navigate = useNavigate();
  const cookies = new Cookies();
  var unprocessedList = [];
  var processedList = [];

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
        unprocessedList = [];
        processedList = [];
        console.log(response);
        response.json().then((dataJson) => {
          // console.log(JSON.stringify(dataJson));
          for (var key in dataJson) {
            unprocessedList.push(dataJson[key]);
          }
          for (var item in unprocessedList) {
            let data = [
              { date: unprocessedList[item].date },
              { status: unprocessedList[item].status },
              { dataset: unprocessedList[item].dataset },
              { response: unprocessedList[item].response },
            ];

            processedList.push(data);
          }

          for (var item in processedList) {
            for (var item2 in processedList[item]) {
              if (
                processedList[item][item2].date != undefined ||
                processedList[item][item2].status != undefined ||
                processedList[item][item2].response != undefined
              ) {
                console.log(processedList[item][item2].date);

                console.log(processedList[item][item2].status);

                var ul = document.getElementById("list");
                var li = document.createElement("li");
                li.appendChild(
                  document.createTextNode(
                    "Date: " +
                      processedList[item][item2].date +
                      " Status:  " +
                      processedList[item][item2].status +
                      " Response: " +
                      processedList[item][item2].response +
                      " "
                  )
                );
                ul.appendChild(li);
              }
            }
          }
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
        status: 1,
        response: "nothing yet",
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

  useEffect(() => {
    if (cookies.get("userLoggedIn") === "true") {
      document.getElementById("overlaybr-icon-info").style.display = "block";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="itsComplicatedBTNdiv">
        <button
          className="itsComplicatedBTN"
          type="button"
          onClick={handleGetAnalys}
        ></button>
      </div>

      <div>
        <ul id="list">
          <li class="listItems"></li>
        </ul>
      </div>

      <section id="scroll-analys"></section>

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
