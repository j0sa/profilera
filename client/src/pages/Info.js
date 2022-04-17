import React from "react";
import "./css/Info.scss";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Info = () => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);

  const closeLoginOpenRegister = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  const closeRegisterOpenLogin = () => {
    setOpenRegister(false);
    setOpenLogin(true);
  };

  return (
    <div>
      <div className="profile-btn-div">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => setOpenLogin(true)}
        >
          Profile
        </Button>

        <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogContentText>
            <button
              className="dialogFormButtons"
              onClick={closeLoginOpenRegister}
            >
              I Don't Have and Account
            </button>
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpenLogin(false)}>Cancel</Button>
            <Button onClick={() => setOpenLogin(false)}>Login</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogContentText>
            <button
              className="dialogFormButtons"
              onClick={closeRegisterOpenLogin}
            >
              I Already Have an Account
            </button>
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpenRegister(false)}>Cancel</Button>
            <Button onClick={() => setOpenRegister(false)}>Register</Button>
          </DialogActions>
        </Dialog>
      </div>

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
    </div>
  );
};

export default Info;
