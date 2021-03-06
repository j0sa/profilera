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
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const Analysis = () => {
  // Global Variables
  const navigate = useNavigate();
  const cookies = new Cookies();
  let analysisNR = 0;
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
      /*eslint no-loop-func: "error"*/
      /*eslint-env es6*/
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
            // data.forEach((element) => {
            //   if (element !== undefined) {
            //     processedList.push(element);
            //   }
            // });
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (element !== undefined) {
                processedList.push(element);
              }
            }
          }
          processedList.forEach((element) => {
            console.log(element.date);
            var ul = document.getElementById("list");
            var li = document.createElement("li");

            if (element.date !== undefined) {
              li.appendChild(document.createTextNode("Date: " + element.date));
              ul.appendChild(li);
            }
            if (element.status !== undefined) {
              let statusMessage;
              switch (element.status) {
                case 1:
                  statusMessage = "Not Started";
                  break;
                case 2:
                  statusMessage = "In Progress";
                  break;
                case 3:
                  statusMessage = "Completed";
                  break;
                case 4:
                  statusMessage = "Suspended";
                  break;
                case 5:
                  statusMessage = "Aborted";
                  break;
                default:
                  statusMessage = "N/A";
              }
              li.appendChild(
                document.createTextNode("Status: " + statusMessage)
              );
              if (JSON.stringify(element.status) === "1") {
                analysisNR++;
              }
              ul.appendChild(li);
            }
          });
          var h1 = document.createElement("h1");
          var someDiv = document.getElementById("someDiv");
          h1.appendChild(
            document.createTextNode(
              "You have " + analysisNR + " completed analyses."
            )
          );
          someDiv.appendChild(h1);
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
        window.location.reload(false);
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
      handleGetAnalys();
      document.getElementById("overlaybr-icon-info").style.display = "block";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="someDiv"> </div>
      <div>
        <ul id="list">
          <li class="listItems"></li>
        </ul>
      </div>

      <section id="scroll-analys"></section>

      <div class="upload-button">
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
