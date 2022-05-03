import React, { useState, useEffect } from "react";
import "./css/Info.scss";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { createTheme } from "@mui/material/styles";
import Cookies from "universal-cookie";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const Info = () => {
  // Use States
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = React.useState(false);
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false);
  const [openSnackbarPassChange, setOpenSnackbarPassChange] =
    React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPassword, setOpenPasswordDialog] = React.useState(false);
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [nameLogIn, logInEmail] = useState("");
  let [passwordLogIn, logInPassword] = useState("");
  let [emailChange, changeEmail] = React.useState("");
  let [nameChange, changeName] = React.useState("");
  let [passwordChange, changePassword] = React.useState("");

  // Global Variables
  const cookies = new Cookies();
  const navigate = useNavigate();
  const chngPassword = passwordChange;
  const chngEmail = emailChange;
  const chngName = nameChange;
  const logEmail = nameLogIn;
  const logPassword = passwordLogIn;
  const newName = name;
  const newEmail = email;
  const newPassword = password;

  const passwordData = {
    password: chngPassword,
  };

  const changeData = {
    name: chngName,
    email: chngEmail,
  };

  const registerData = {
    name: newName,
    password: newPassword,
    email: newEmail,
    admin: false,
  };

  const loginData = {
    email: logEmail,
    password: logPassword,
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

  const handleToCloseSnackbarSuccess = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenSnackbarSuccess(false);
  };

  const handleClickEventSnackbarSuccess = () => {
    setOpenSnackbarSuccess(true);
  };

  const handleToCloseSnackbarerror = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenSnackbarError(false);
  };

  const handleClickEventSnackbarError = () => {
    setOpenSnackbarError(true);
  };

  const handleToCloseSnackbarPassChange = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpenSnackbarPassChange(false);
  };

  const handleClickEventSnackbarPassChange = () => {
    setOpenSnackbarPassChange(true);
  };

  const closeLoginOpenRegister = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  const closeRegisterOpenLogin = () => {
    setOpenRegister(false);
    setOpenLogin(true);
  };

  const openPasswordDialogCloseProfile = () => {
    setOpenPasswordDialog(true);
    setOpenProfile(false);
  };

  const openProfileDialog = () => {
    setOpenProfile(true);
  };

  function getUserInfoByEmail(userEmail) {
    const emailToSearch = {
      email: userEmail,
    };
    return fetch("http://localhost:3001/users/userid", {
      method: "POST",
      body: JSON.stringify(emailToSearch),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // .then((response) => response.json())
    // .then((data) => {
    //   try {
    //     // let objectArray = Object.entries(data)
    //     //   .map((x) => x.join(":"))
    //     //   .join("\n");
    //     // alert(`x: \n{\n${objectArray}\n}`);
    //     // console.log(objectArray.toString());
    //     // return objectArray.toString();

    //     // let objectStr = "";
    //     // for (const [x, value] of Object.entries(data)) {
    //     //   objectStr += `${x}:${value}\n`;
    //     // }
    //     // alert("x: " + "{" + objectStr + "}");
    //     // return objectStr;

    //     let objectStr = "";
    //     for (let key of Object.keys(data)) {
    //       objectStr += `${key}:${data[key]}\n`;
    //     }
    //     alert(objectStr);
    //   } catch (error) {
    //     console.log("error", error.message);
    //   }
    // });
  }

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users/" + cookies.get("user"), {
      method: "PUT",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        handleClickEventSnackbarPassChange();
        setOpenLogin(false);
        console.log(response);
      } else {
        handleClickEventSnackbarError();
        console.log(response);
      }
    });
  };

  const handleUserInfoChangeSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users/" + cookies.get("user"), {
      method: "PUT",
      body: JSON.stringify(changeData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        handleClickEventSnackbarSuccess();
        setOpenLogin(false);
        console.log(response);
      } else {
        handleClickEventSnackbarError();
        console.log(response);
      }
    });
  };

  async function handleSubmit() {
    await fetch("http://localhost:3001/users/register", {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        const dataUU = getUserInfoByEmail(loginData.email)
          .then((response) => response.json())
          .then((data) => {
            let objectStr = "";
            for (let key of Object.keys(data)) {
              objectStr += `${key}:${data[key]}\n`;
            }
            cookies.set("user", objectStr.substring(4, 28), {
              path: "/",
            });
            alert(objectStr.substring(4, 28));
          });
        handleClickEventSnackbarSuccess();
        cookies.set("userLoggedIn", true, {
          path: "/",
        });
        console.log(cookies.get("user"));
        setOpenLogin(false);
        console.log(response);
      } else {
        handleClickEventSnackbarError();
        cookies.set("userLoggedIn", false, {
          path: "/",
        });
        console.log(response);
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("CTA") === "true") {
      setOpenRegister(true);
      localStorage.setItem("CTA", "false");
    }
    if (cookies.get("userLoggedIn") === "true") {
      document.getElementById("overlaybr-icon").style.display = "block";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="profile-btn-div">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          // TODO add conditional statement to open profile info if logged in
          onClick={() => {
            if (cookies.get("userLoggedIn") === "true") {
              openProfileDialog(true);
            } else {
              setOpenLogin(true);
            }
          }}
        >
          Profile
        </Button>

        <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
          <DialogTitle>Login</DialogTitle>
          <form onSubmit={handleLogInSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                onChange={(event) => logInEmail(event.target.value)}
                type="email"
                required={true}
                name="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                onChange={(event) => logInPassword(event.target.value)}
                type="password"
                required={true}
                name="password"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogContentText>
              <button
                type="button"
                className="dialogFormButtons"
                onClick={closeLoginOpenRegister}
              >
                &nbsp; &nbsp;&nbsp; I Don't Have an Account
              </button>
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setOpenLogin(false)}>Cancel</Button>
              <Button type="submit">Login</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
          <DialogTitle>Register</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                required={true}
                label="Name"
                onChange={(event) => setName(event.target.value)}
                name="name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="email"
                required={true}
                label="Email"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                name="email"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="password"
                required={true}
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                name="password"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogContentText>
              <button
                type="button"
                className="dialogFormButtons"
                onClick={closeRegisterOpenLogin}
              >
                &nbsp; &nbsp;&nbsp; I Already Have an Account
              </button>
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setOpenRegister(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setOpenRegister(false)}>
                Register
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Snackbar
          open={openSnackbarSuccess}
          autoHideDuration={7000}
          onClose={handleToCloseSnackbarSuccess}
        >
          <Alert
            onClose={handleToCloseSnackbarSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Congratulations! You are now logged in.
          </Alert>
        </Snackbar>

        <Snackbar
          open={openSnackbarError}
          autoHideDuration={7000}
          onClose={handleToCloseSnackbarPassChange}
        >
          <Alert
            onClose={handleToCloseSnackbarPassChange}
            severity="error"
            sx={{ width: "100%" }}
          >
            Uh oh! Seems there was an error. Try again!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openSnackbarPassChange}
          autoHideDuration={7000}
          onClose={handleToCloseSnackbarerror}
        >
          <Alert
            onClose={handleToCloseSnackbarerror}
            severity="success"
            sx={{ width: "100%" }}
          >
            Congratulations! Your password is now changed.
          </Alert>
        </Snackbar>
      </div>

      <Dialog open={openProfile} onClose={() => setOpenProfile(false)}>
        <DialogTitle>Change Info</DialogTitle>
        <form onSubmit={handleUserInfoChangeSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              required={true}
              label="Name"
              onChange={(event) => changeName(event.target.value)}
              type="name"
              name="name"
              fullWidth
              variant="standard"
            />

            <TextField
              margin="dense"
              id="email"
              label="Email"
              required={true}
              onChange={(event) => changeEmail(event.target.value)}
              type="email"
              name="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogContentText>
            <button
              type="button"
              className="dialogFormButtons"
              onClick={openPasswordDialogCloseProfile}
            >
              &nbsp; &nbsp;&nbsp; Change pasword
            </button>
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpenProfile(false)}>Cancel</Button>
            <Button type="submit">Uppdate</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openPassword} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handlePasswordChangeSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="newPassword"
              label="New Password"
              onChange={(event) => changePassword(event.target.value)}
              type="password"
              name="newPassword"
              required={true}
              fullWidth
              variant="standard"
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
            <Button type="submit">Change</Button>
          </DialogActions>
        </form>
      </Dialog>

      <div className="info-txt-customer-segmentation-div">
        <Fade left>
          <h1> What is customer segmentation and what are personas?</h1>

          <p>
            {" "}
            Customer segmentation is the process by which you divide your
            customer base based on common characteristics – such as behaviors,
            income, age, location and interests. This is done in order to market
            to those customers more effectively.
          </p>

          <p>
            The groups that form as a result of customer segmentation can also
            be used to create a marketing persona. A marketing persona is a
            fictive person that is made up of the traits that in this case is in
            common for a group of customers. This is because customer
            segmentation is typically used to improve how a business sells and
            so marketing personas need to be closely aligned with these customer
            segments in order to provide a better understanding of which
            marketing methods are best suited for the persona. For each group
            created as a result of customer segmentation a specifikt persona is
            created to represent each one of these groups.
          </p>
        </Fade>
      </div>
      <div class="overlaybr-icon" id="overlaybr-icon">
        <ThemeProvider theme={theme}>
          <Fab
            color="secondary"
            aria-label="navigate"
            onClick={() => navigate("/analysis")}
          >
            <ArrowForwardIosIcon />
          </Fab>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Info;
