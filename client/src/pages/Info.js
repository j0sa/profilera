import React, { useState, useEffect } from "react";
import "./css/Info.scss";
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
import * as CryptoJS from "crypto-js";
import machineLearningPicture from "../assets/images/machine-learning2.png";
import aiVsMlVsDl from "../assets/images/ai-vs-ml-vs-dl.png";

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

  const encryptStringWithAES = (textToEncrypt) => {
    const passphrase = "123"; // make this an environment variable
    return CryptoJS.AES.encrypt(textToEncrypt, passphrase).toString();
  };

  const decryptStringWithAES = (encryptedText) => {
    const passphrase = "123"; // make this an environment variable
    const bytes = CryptoJS.AES.decrypt(encryptedText, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
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
    fetch(
      "http://localhost:3001/users/" +
        decryptStringWithAES(cookies.get("userId")),
      {
        method: "PUT",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
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
    fetch(
      "http://localhost:3001/users/" +
        decryptStringWithAES(cookies.get("userId")),
      {
        method: "PUT",
        body: JSON.stringify(changeData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
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
            cookies.set(
              "userId",
              encryptStringWithAES(objectStr.substring(4, 28)),
              {
                path: "/",
              }
            );
            console.table(objectStr);
          });
        handleClickEventSnackbarSuccess();
        cookies.set("userLoggedIn", true, {
          path: "/",
        });
        setOpenLogin(false);
        console.assert(dataUU);
        console.warn(response);
      } else {
        handleClickEventSnackbarError();
        cookies.set("userLoggedIn", false, {
          path: "/",
        });
        console.error(response);
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
                onChange={(e) => logInEmail(e.target.value)}
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
                onChange={(e) => logInPassword(e.target.value)}
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

      <br></br>
      <header class="content-container content-purple content-center header-machine-learning">
        <h1 class="content-margin content-xjumbo">MACHINE LEARNING</h1>
        <p class="content-large">
          This introduction to machine learning provides an overview of its
          history, important definitions, applications, and concerns within
          businesses today.
        </p>
      </header>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">What is machine learning?</h1>
            <h5 class="content-padding-32 content-texts">
              Machine learning is a branch of artificial intelligence (AI) and
              computer science which focuses on the use of{" "}
              <span class="content-text-yellow">data</span> and{" "}
              <span class="content-text-yellow">algorithms</span>
              to imitate the way that humans learn, gradually{" "}
              <span class="content-text-yellow">improving</span> its accuracy.
            </h5>
            <p class="content-text-grey">
              Machine learning is an{" "}
              <span class="content-text-yellow">important</span> component of
              the growing field of data science. Through the use of statistical
              methods, algorithms are trained to make classifications or{" "}
              <span class="content-text-yellow">predictions</span>, uncovering{" "}
              <span class="content-text-yellow">key insights</span> within data
              mining projects. These insights subsequently drive decision making
              within applications and businesses, ideally impacting key{" "}
              <span class="content-text-yellow">growth metrics</span>. As big
              data continues to expand and grow, the market demand for data
              scientists will increase, requiring them to assist in the
              identification of the most relevant business questions and
              subsequently the data to answer them.
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red">
              <img
                class="machine-learning-logo"
                src={machineLearningPicture}
                alt="Machine Learning"
              ></img>
            </i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right">
              <img
                class="machine-learning-logo"
                src={aiVsMlVsDl}
                alt="Machine Learning"
              ></img>
            </i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">
              Machine Learning vs. Deep Learning vs. Neural Networks
            </h1>
            <h5 class="content-padding-32 content-texts">
              Since deep learning and machine learning tend to be used
              interchangeably, it’s worth noting the nuances between the two.
              Machine learning, deep learning, and neural networks are all
              sub-fields of artificial intelligence. However, deep learning is
              actually a sub-field of machine learning, and neural networks is a
              sub-field of deep learning.
            </h5>
            <p class="content-text-grey-whitebox">
              <p>
                The way in which deep learning and machine learning differ is in
                how each algorithm learns. Deep learning automates much of the
                feature extraction piece of the process, eliminating some of the
                manual human intervention required and enabling the use of
                larger data sets. You can think of deep learning as "scalable
                machine learning" as Lex Fridman notes in an MIT lecture.
                Classical, or "non-deep", machine learning is more dependent on
                human intervention to learn. Human experts determine the set of
                features to understand the differences between data inputs,
                usually requiring more structured data to learn.
              </p>
              <p>
                "Deep" machine learning can leverage labeled datasets, also
                known as supervised learning, to inform its algorithm, but it
                doesn’t necessarily require a labeled dataset. It can ingest
                unstructured data in its raw form (e.g. text, images), and it
                can automatically determine the set of features which
                distinguish different categories of data from one another.
                Unlike machine learning, it doesn't require human intervention
                to process data, allowing us to scale machine learning in more
                interesting ways. Deep learning and neural networks are
                primarily credited with accelerating progress in areas, such as
                computer vision, natural language processing, and speech
                recognition.
              </p>
              <p>
                Neural networks, or artificial neural networks (ANNs), are
                comprised of a node layers, containing an input layer, one or
                more hidden layers, and an output layer. Each node, or
                artificial neuron, connects to another and has an associated
                weight and threshold. If the output of any individual node is
                above the specified threshold value, that node is activated,
                sending data to the next layer of the network. Otherwise, no
                data is passed along to the next layer of the network. The
                “deep” in deep learning is just referring to the depth of layers
                in a neural network. A neural network that consists of more than
                three layers—which would be inclusive of the inputs and the
                output—can be considered a deep learning algorithm or a deep
                neural network. A neural network that only has two or three
                layers is just a basic neural network.
              </p>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">How machine learning works</h1>
            <h5 class="content-padding-32 content-texts">
              UC Berkeley breaks out the learning system of a machine learning
              algorithm into three main parts.
            </h5>
            <p class="content-text-grey">
              <ol>
                <li>
                  <strong>
                    <span class="content-text-purple">A Decision Process:</span>
                  </strong>{" "}
                  In general, machine learning algorithms are used to make a
                  prediction or classification. Based on some input data, which
                  can be labelled or unlabeled, your algorithm will produce an
                  estimate about a pattern in the data.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">An Error Function:</span>
                  </strong>{" "}
                  An error function serves to evaluate the prediction of the
                  model. If there are known examples, an error function can make
                  a comparison to assess the accuracy of the model.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">
                      An Model Optimization Process:
                    </span>
                  </strong>{" "}
                  If the model can fit better to the data points in the training
                  set, then weights are adjusted to reduce the discrepancy
                  between the known example and the model estimate. The
                  algorithm will repeat this evaluate and optimize process,
                  updating weights autonomously until a threshold of accuracy
                  has been met.{" "}
                </li>
              </ol>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">Machine learning methods</h1>
            <h5 class="content-padding-32 content-texts">
              Machine learning classifiers fall into three primary categories.
            </h5>
            <p class="content-text-grey-whitebox">
              <p>
                <strong>
                  <span class="content-text-purple">
                    Supervised machine learning
                  </span>
                </strong>
              </p>
              <p>
                Supervised learning, also known as supervised machine learning,
                is defined by its use of labeled datasets to train algorithms
                that to classify data or predict outcomes accurately. As input
                data is fed into the model, it adjusts its weights until the
                model has been fitted appropriately. This occurs as part of the
                cross validation process to ensure that the model avoids
                overfitting or underfitting. Supervised learning helps
                organizations solve for a variety of real-world problems at
                scale, such as classifying spam in a separate folder from your
                inbox. Some methods used in supervised learning include neural
                networks, naïve bayes, linear regression, logistic regression,
                random forest, support vector machine (SVM), and more.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Unsupervised machine learning
                  </span>
                </strong>
              </p>
              <p>
                Unsupervised learning, also known as unsupervised machine
                learning, uses machine learning algorithms to analyze and
                cluster unlabeled datasets. These algorithms discover hidden
                patterns or data groupings without the need for human
                intervention. Its ability to discover similarities and
                differences in information make it the ideal solution for
                exploratory data analysis, cross-selling strategies, customer
                segmentation, image and pattern recognition. It’s also used to
                reduce the number of features in a model through the process of
                dimensionality reduction; principal component analysis (PCA) and
                singular value decomposition (SVD) are two common approaches for
                this. Other algorithms used in unsupervised learning include
                neural networks, k-means clustering, probabilistic clustering
                methods, and more.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Semi-supervised learning
                  </span>
                </strong>
              </p>
              <p>
                Semi-supervised learning offers a happy medium between
                supervised and unsupervised learning. During training, it uses a
                smaller labeled data set to guide classification and feature
                extraction from a larger, unlabeled data set. Semi-supervised
                learning can solve the problem of having not enough labeled data
                (or not being able to afford to label enough data) to train a
                supervised learning algorithm.{" "}
              </p>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">How supervised learning works</h1>
            <h5 class="content-padding-32 content-texts">
              <p>
                Supervised learning uses a training set to teach models to yield
                the desired output. This training dataset includes inputs and
                correct outputs, which allow the model to learn over time. The
                algorithm measures its accuracy through the loss function,
                adjusting until the error has been sufficiently minimized.
              </p>
              <p>
                Supervised learning can be separated into two types of problems
                when data mining —{" "}
                <span class="content-text-purple">classification</span> and{" "}
                <span class="content-text-purple">regression:</span>
              </p>
            </h5>
            <p class="content-text-grey">
              <p>
                <strong>
                  <span class="content-text-purple">Classification</span>
                </strong>{" "}
                uses an algorithm to accurately assign test data into specific
                categories. It recognizes specific entities within the dataset
                and attempts to draw some conclusions on how those entities
                should be labeled or defined. Common classification algorithms
                are linear classifiers, support vector machines (SVM), decision
                trees, k-nearest neighbor, and random forest, which are
                described in more detail below.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Regression</span>
                </strong>{" "}
                is used to understand the relationship between dependent and
                independent variables. It is commonly used to make projections,
                such as for sales revenue for a given business. Linear
                regression, logistical regression, and polynomial regression are
                popular regression algorithms.
              </p>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">Supervised learning algorithms</h1>
            <h5 class="content-padding-32 content-texts">
              Various algorithms and computation techniques are used in
              supervised machine learning processes. Below are brief
              explanations of some of the most commonly used learning methods,
              typically calculated through use of programs like R or Python:
            </h5>
            <p class="content-text-grey-whitebox">
              <p>
                <strong>
                  <span class="content-text-purple">Neural networks</span>
                </strong>
              </p>
              <p>
                Primarily leveraged for deep learning algorithms, neural
                networks process training data by mimicking the
                interconnectivity of the human brain through layers of nodes.
                Each node is made up of inputs, weights, a bias (or threshold),
                and an output. If that output value exceeds a given threshold,
                it “fires” or activates the node, passing data to the next layer
                in the network. Neural networks learn this mapping function
                through supervised learning, adjusting based on the loss
                function through the process of gradient descent. When the cost
                function is at or near zero, we can be confident in the model’s
                accuracy to yield the correct answer.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Naive Bayes</span>
                </strong>
              </p>
              <p>
                Naive Bayes is classification approach that adopts the principle
                of class conditional independence from the Bayes Theorem. This
                means that the presence of one feature does not impact the
                presence of another in the probability of a given outcome, and
                each predictor has an equal effect on that result. There are
                three types of Naïve Bayes classifiers: Multinomial Naïve Bayes,
                Bernoulli Naïve Bayes, and Gaussian Naïve Bayes. This technique
                is primarily used in text classification, spam identification,
                and recommendation systems.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Linear regression</span>
                </strong>
              </p>
              <p>
                Linear regression is used to identify the relationship between a
                dependent variable and one or more independent variables and is
                typically leveraged to make predictions about future outcomes.
                When there is only one independent variable and one dependent
                variable, it is known as simple linear regression. As the number
                of independent variables increases, it is referred to as
                multiple linear regression. For each type of linear regression,
                it seeks to plot a line of best fit, which is calculated through
                the method of least squares. However, unlike other regression
                models, this line is straight when plotted on a graph.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Logistic regression</span>
                </strong>
              </p>
              <p>
                While linear regression is leveraged when dependent variables
                are continuous, logistical regression is selected when the
                dependent variable is categorical, meaning they have binary
                outputs, such as "true" and "false" or "yes" and "no." While
                both regression models seek to understand relationships between
                data inputs, logistic regression is mainly used to solve binary
                classification problems, such as spam identification.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Support vector machine (SVM)
                  </span>
                </strong>
              </p>
              <p>
                A support vector machine is a popular supervised learning model
                developed by Vladimir Vapnik, used for both data classification
                and regression. That said, it is typically leveraged for
                classification problems, constructing a hyperplane where the
                distance between two classes of data points is at its maximum.
                This hyperplane is known as the decision boundary, separating
                the classes of data points (e.g., oranges vs. apples) on either
                side of the plane.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">K-nearest neighbor</span>
                </strong>
              </p>
              <p>
                K-nearest neighbor, also known as the KNN algorithm, is a
                non-parametric algorithm that classifies data points based on
                their proximity and association to other available data. This
                algorithm assumes that similar data points can be found near
                each other. As a result, it seeks to calculate the distance
                between data points, usually through Euclidean distance, and
                then it assigns a category based on the most frequent category
                or average.
              </p>
              <p>
                Its ease of use and low calculation time make it a preferred
                algorithm by data scientists, but as the test dataset grows, the
                processing time lengthens, making it less appealing for
                classification tasks. KNN is typically used for recommendation
                engines and image recognition.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Random forest</span>
                </strong>
              </p>
              <p>
                Random forest is another flexible supervised machine learning
                algorithm used for both classification and regression purposes.
                The "forest" references a collection of uncorrelated decision
                trees, which are then merged together to reduce variance and
                create more accurate data predictions.
              </p>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">Supervised learning examples</h1>
            <h5 class="content-padding-32 content-texts">
              Supervised learning models can be used to build and advance a
              number of business applications, including the following:
            </h5>
            <p class="content-text-grey">
              <p>
                <strong>
                  <span class="content-text-purple">
                    Image- and object-recognition:
                  </span>
                </strong>{" "}
                Supervised learning algorithms can be used to locate, isolate,
                and categorize objects out of videos or images, making them
                useful when applied to various computer vision techniques and
                imagery analysis.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Predictive analytics:</span>
                </strong>{" "}
                A widespread use case for supervised learning models is in
                creating predictive analytics systems to provide deep insights
                into various business data points. This allows enterprises to
                anticipate certain results based on a given output variable,
                helping business leaders justify decisions or pivot for the
                benefit of the organization.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Customer sentiment analysis:
                  </span>
                </strong>{" "}
                Using supervised machine learning algorithms, organizations can
                extract and classify important pieces of information from large
                volumes of data—including context, emotion, and intent—with very
                little human intervention. This can be incredibly useful when
                gaining a better understanding of customer interactions and can
                be used to improve brand engagement efforts.
              </p>
              <p>
                <str>
                  <span class="content-text-purple">Spam detection:</span>
                </str>{" "}
                Spam detection is another example of a supervised learning
                model. Using supervised classification algorithms, organizations
                can train databases to recognize patterns or anomalies in new
                data to organize spam and non-spam-related correspondences
                effectively.
              </p>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">Challenges of supervised learning</h1>
            <h5 class="content-padding-32 content-texts">
              Although supervised learning can offer businesses advantages, such
              as deep data insights and improved automation, there are some
              challenges when building sustainable supervised learning models.
              The following are some of these challenges:
            </h5>
            <p class="content-text-grey-whitebox">
              <ol>
                <li>
                  Supervised learning models can require certain{" "}
                  <span class="content-text-yellow">levels of expertise</span>{" "}
                  to structure accurately.
                </li>
                <li>
                  Training supervised learning models can be very{" "}
                  <span class="content-text-yellow">time intensive</span>.
                </li>
                <li>
                  Datasets can have a higher likelihood of{" "}
                  <span class="content-text-yellow">human error</span>,
                  resulting in algorithms learning{" "}
                  <span class="content-text-yellow">incorrectly</span>.
                </li>
                <li>
                  Unlike unsupervised learning models, supervised learning{" "}
                  <span class="content-text-yellow">
                    cannot cluster or classify
                  </span>{" "}
                  data on its own.
                </li>
              </ol>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">
              Common unsupervised learning approaches
            </h1>
            <h5 class="content-padding-32 content-texts">
              Unsupervised learning models are utilized for three main
              tasks—clustering, association, and dimensionality reduction. Below
              we’ll define each learning method and highlight common algorithms
              and approaches to conduct them effectively.
            </h5>
            <p class="content-text-grey">
              <p>
                <strong>
                  <span class="content-text-purple">Clustering</span>
                </strong>
              </p>
              <p>
                Clustering is a data mining technique which groups unlabeled
                data based on their similarities or differences. Clustering
                algorithms are used to process raw, unclassified data objects
                into groups represented by structures or patterns in the
                information. Clustering algorithms can be categorized into a few
                types, specifically exclusive, overlapping, hierarchical, and
                probabilistic.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Exclusive and Overlapping Clustering
                  </span>
                </strong>
              </p>
              <p>
                Exclusive clustering is a form of grouping that stipulates a
                data point can exist only in one cluster. This can also be
                referred to as “hard” clustering. The K-means clustering
                algorithm is an example of exclusive clustering.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">K-means clustering</span>
                </strong>{" "}
                is a common example of an exclusive clustering method where data
                points are assigned into K groups, where K represents the number
                of clusters based on the distance from each group’s centroid.
                The data points closest to a given centroid will be clustered
                under the same category. A larger K value will be indicative of
                smaller groupings with more granularity whereas a smaller K
                value will have larger groupings and less granularity. K-means
                clustering is commonly used in market segmentation, document
                clustering, image segmentation, and image compression.
              </p>
              <p>
                Overlapping clusters differs from exclusive clustering in that
                it allows data points to belong to multiple clusters with
                separate degrees of membership. “Soft” or fuzzy k-means
                clustering is an example of overlapping clustering.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Hierarchical clustering
                  </span>
                </strong>
              </p>
              <p>
                Hierarchical clustering, also known as hierarchical cluster
                analysis (HCA), is an unsupervised clustering algorithm that can
                be categorized in two ways; they can be agglomerative or
                divisive. Agglomerative clustering is considered a “bottoms-up
                approach.” Its data points are isolated as separate groupings
                initially, and then they are merged together iteratively on the
                basis of similarity until one cluster has been achieved. Four
                different methods are commonly used to measure similarity:
              </p>
              <ol>
                <li>
                  <strong>
                    <span class="content-text-purple">Ward’s linkage:</span>
                  </strong>{" "}
                  This method states that the distance between two clusters is
                  defined by the increase in the sum of squared after the
                  clusters are merged.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">Average linkage:</span>
                  </strong>{" "}
                  This method is defined by the mean distance between two points
                  in each cluster.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">
                      Complete (or maximum) linkage:
                    </span>
                  </strong>{" "}
                  This method is defined by the maximum distance between two
                  points in each cluster.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">
                      Single (or minimum) linkage:
                    </span>
                  </strong>{" "}
                  This method is defined by the minimum distance between two
                  points in each cluster
                </li>
              </ol>
              <p>
                <span class="content-text-purple">Euclidean distance</span> is
                the most common metric used to calculate these distances;
                however, other metrics, such as Manhattan distance, also exist
                and are widely used.
              </p>
              <p>
                Divisive clustering can be defined as the opposite of
                agglomerative clustering; instead it takes a “top-down”
                approach. In this case, a single data cluster is divided based
                on the differences between data points. Divisive clustering is
                not commonly used, but it is still worth noting in the context
                of hierarchical clustering. These clustering processes are
                usually visualized using a dendrogram, a tree-like diagram that
                documents the merging or splitting of data points at each
                iteration.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Probabilistic clustering
                  </span>
                </strong>
              </p>
              <p>
                A probabilistic model is an unsupervised technique that helps us
                solve density estimation or “soft” clustering problems. In
                probabilistic clustering, data points are clustered based on the
                likelihood that they belong to a particular distribution. The
                Gaussian Mixture Model (GMM) is the one of the most commonly
                used probabilistic clustering methods.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Gaussian Mixture Models
                  </span>
                </strong>{" "}
                are classified as mixture models, which means that they are made
                up of an unspecified number of probability distribution
                functions. GMMs are primarily leveraged to determine which
                Gaussian, or normal, probability distribution a given data point
                belongs to. If the mean or variance are known, then we can
                determine which distribution a given data point belongs to.
                However, in GMMs, these variables are not known, so we assume
                that a latent, or hidden, variable exists to cluster data points
                appropriately. While it is not required to use the
                Expectation-Maximization (EM) algorithm, it is a commonly used
                to estimate the assignment probabilities for a given data point
                to a particular data cluster.{" "}
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Association Rules</span>
                </strong>
              </p>
              <p>
                An association rule is a rule-based method for finding
                relationships between variables in a given dataset. These
                methods are frequently used for market basket analysis, allowing
                companies to better understand relationships between different
                products. Understanding consumption habits of customers enables
                businesses to develop better cross-selling strategies and
                recommendation engines. Examples of this can be seen in Amazon’s
                “Customers Who Bought This Item Also Bought” or Spotify’s
                "Discover Weekly" playlist. While there are a few different
                algorithms used to generate association rules, such as Apriori,
                Eclat, and FP-Growth, the Apriori algorithm is most widely used.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Apriori algorithms</span>
                </strong>
              </p>
              <p>
                Apriori algorithms have been popularized through market basket
                analyses, leading to different recommendation engines for music
                platforms and online retailers. They are used within
                transactional datasets to identify frequent itemsets, or
                collections of items, to identify the likelihood of consuming a
                product given the consumption of another product. For example,
                if I play Black Sabbath’s radio on Spotify, starting with their
                song “Orchid”, one of the other songs on this channel will
                likely be a Led Zeppelin song, such as “Over the Hills and Far
                Away.” This is based on my prior listening habits as well as the
                ones of others. Apriori algorithms use a hash tree to count
                itemsets, navigating through the dataset in a breadth-first
                manner.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Dimensionality reduction
                  </span>
                </strong>
              </p>
              <p>
                While more data generally yields more accurate results, it can
                also impact the performance of machine learning algorithms (e.g.
                overfitting) and it can also make it difficult to visualize
                datasets. Dimensionality reduction is a technique used when the
                number of features, or dimensions, in a given dataset is too
                high. It reduces the number of data inputs to a manageable size
                while also preserving the integrity of the dataset as much as
                possible. It is commonly used in the preprocessing data stage,
                and there are a few different dimensionality reduction methods
                that can be used, such as:
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Principal component analysis
                  </span>
                </strong>
              </p>
              <p>
                Principal component analysis (PCA) is a type of dimensionality
                reduction algorithm which is used to reduce redundancies and to
                compress datasets through feature extraction. This method uses a
                linear transformation to create a new data representation,
                yielding a set of "principal components." The first principal
                component is the direction which maximizes the variance of the
                dataset. While the second principal component also finds the
                maximum variance in the data, it is completely uncorrelated to
                the first principal component, yielding a direction that is
                perpendicular, or orthogonal, to the first component. This
                process repeats based on the number of dimensions, where a next
                principal component is the direction orthogonal to the prior
                components with the most variance.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Singular value decomposition
                  </span>
                </strong>
              </p>
              <p>
                Singular value decomposition (SVD) is another dimensionality
                reduction approach which factorizes a matrix, A, into three,
                low-rank matrices. SVD is denoted by the formula, A = USVT,
                where U and V are orthogonal matrices. S is a diagonal matrix,
                and S values are considered singular values of matrix A. Similar
                to PCA, it is commonly used to reduce noise and compress data,
                such as image files.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Autoencoders</span>
                </strong>
              </p>
              <p>
                Autoencoders leverage neural networks to compress data and then
                recreate a new representation of the original data’s input.
                Looking at the image below, you can see that the hidden layer
                specifically acts as a bottleneck to compress the input layer
                prior to reconstructing within the output layer. The stage from
                the input layer to the hidden layer is referred to as “encoding”
                while the stage from the hidden layer to the output layer is
                known as “decoding.”
              </p>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">Applications of unsupervised learning</h1>
            <h5 class="content-padding-32 content-texts">
              Machine learning techniques have become a common method to improve
              a product user experience and to test systems for quality
              assurance. Unsupervised learning provides an exploratory path to
              view data, allowing businesses to identify patterns in large
              volumes of data more quickly when compared to manual observation.
              Some of the most common real-world applications of unsupervised
              learning are:
            </h5>
            <p class="content-text-grey-whitebox">
              <p>
                <strong>
                  <span class="content-text-purple">News Sections:</span>
                </strong>{" "}
                Google News uses unsupervised learning to categorize articles on
                the same story from various online news outlets. For example,
                the results of a presidential election could be categorized
                under their label for “US” news.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Computer vision:</span>
                </strong>{" "}
                Unsupervised learning algorithms are used for visual perception
                tasks, such as object recognition.{" "}
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Medical imaging:</span>
                </strong>{" "}
                Unsupervised machine learning provides essential features to
                medical imaging devices, such as image detection, classification
                and segmentation, used in radiology and pathology to diagnose
                patients quickly and accurately.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Anomaly detection:</span>
                </strong>{" "}
                Unsupervised learning models can comb through large amounts of
                data and discover atypical data points within a dataset. These
                anomalies can raise awareness around faulty equipment, human
                error, or breaches in security.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Customer personas:</span>
                </strong>{" "}
                Defining customer personas makes it easier to understand common
                traits and business clients' purchasing habits. Unsupervised
                learning allows businesses to build better buyer persona
                profiles, enabling organizations to align their product
                messaging more appropriately. This is something we here at
                Profilera excel at.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Recommendation Engines:
                  </span>
                </strong>{" "}
                Using past purchase behavior data, unsupervised learning can
                help to discover data trends that can be used to develop more
                effective cross-selling strategies. This is used to make
                relevant add-on recommendations to customers during the checkout
                process for online retailers.
              </p>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">Challenges of unsupervised learning</h1>
            <h5 class="content-padding-32 content-texts">
              While unsupervised learning has many benefits, some challenges can
              occur when it allows machine learning models to execute without
              any human intervention. Some of these challenges can include:
            </h5>
            <p class="content-text-grey">
              <ol>
                <li>
                  Computational{" "}
                  <span class="content-text-yellow">complexity</span> due to a
                  high <span class="content-text-yellow">volume</span> of
                  training data.
                </li>
                <li>
                  Longer <span class="content-text-yellow">training times</span>
                  .
                </li>
                <li>
                  Higher risk of{" "}
                  <span class="content-text-yellow">inaccurate</span> results.
                </li>
                <li>
                  <span class="content-text-yellow">Human intervention</span> to
                  validate output variables.
                </li>
                <li>
                  <span class="content-text-yellow">Lack of transparency</span>{" "}
                  into the basis on which data was clustered.
                </li>
              </ol>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">
              The main difference between supervised and unsupervised learning:
              Labeled data
            </h1>
            <h5 class="content-padding-32 content-texts">
              The main distinction between the two approaches is the use of
              labeled datasets. To put it simply, supervised learning uses
              labeled input and output data, while an unsupervised learning
              algorithm does not.
            </h5>
            <p class="content-text-grey-whitebox">
              <p>
                In supervised learning, the algorithm “learns” from the training
                dataset by iteratively making predictions on the data and
                adjusting for the correct answer. While supervised learning
                models tend to be more accurate than unsupervised learning
                models, they require upfront human intervention to label the
                data appropriately. For example, a supervised learning model can
                predict how long your commute will be based on the time of day,
                weather conditions and so on. But first, you’ll have to train it
                to know that rainy weather extends the driving time.
              </p>
              <p>
                Unsupervised learning models, in contrast, work on their own to
                discover the inherent structure of unlabeled data. Note that
                they still require some human intervention for validating output
                variables. For example, an unsupervised learning model can
                identify that online shoppers often purchase groups of products
                at the same time. However, a data analyst would need to validate
                that it makes sense for a recommendation engine to group baby
                clothes with an order of diapers, applesauce and sippy cups.
              </p>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">
              Other key differences between supervised and unsupervised learning
            </h1>
            <h5 class="content-padding-32 content-texts">Lorem Ipsum</h5>
            <p class="content-text-grey">
              <ol>
                <li>
                  <strong>
                    <span class="content-text-purple">Goals:</span>
                  </strong>{" "}
                  In supervised learning, the goal is to predict outcomes for
                  new data. You know up front the type of results to expect.
                  With an unsupervised learning algorithm, the goal is to get
                  insights from large volumes of new data. The machine learning
                  itself determines what is different or interesting from the
                  dataset.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">Applications:</span>
                  </strong>{" "}
                  Supervised learning models are ideal for spam detection,
                  sentiment analysis, weather forecasting and pricing
                  predictions, among other things. In contrast, unsupervised
                  learning is a great fit for anomaly detection, recommendation
                  engines, customer personas and medical imaging.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">Complexity:</span>
                  </strong>{" "}
                  Supervised learning is a simple method for machine learning,
                  typically calculated through the use of programs like R or
                  Python. In unsupervised learning, you need powerful tools for
                  working with large amounts of unclassified data. Unsupervised
                  learning models are computationally complex because they need
                  a large training set to produce intended outcomes.
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">Drawbacks:</span>
                  </strong>{" "}
                  Supervised learning models can be time-consuming to train, and
                  the labels for input and output variables require expertise.
                  Meanwhile, unsupervised learning methods can have wildly
                  inaccurate results unless you have human intervention to
                  validate the output variables.
                </li>
              </ol>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">
              Supervised vs. unsupervised learning: Which is best for you?
            </h1>
            <h5 class="content-padding-32 content-texts">
              Choosing the right approach for your situation depends on how your
              data scientists assess the structure and volume of your data, as
              well as the use case. To make your decision, be sure to do the
              following:
            </h5>
            <p class="content-text-grey-whitebox">
              <ol>
                <li>
                  <strong>
                    <span class="content-text-purple">
                      Evaluate your input data:
                    </span>
                  </strong>{" "}
                  Is it labeled or unlabeled data? Do you have experts that can
                  support additional labeling?
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">Define your goals:</span>
                  </strong>{" "}
                  Do you have a recurring, well-defined problem to solve? Or
                  will the algorithm need to predict new problems?
                </li>
                <li>
                  <strong>
                    <span class="content-text-purple">
                      Review your options for algorithms:
                    </span>
                  </strong>{" "}
                  Are there algorithms with the same dimensionality you need
                  (number of features, attributes or characteristics)? Can they
                  support your data volume and structure?
                </li>
                <p>
                  Classifying big data can be a real challenge in supervised
                  learning, but the results are highly accurate and trustworthy.
                  In contrast, unsupervised learning can handle large volumes of
                  data in real time. But, there’s a lack of transparency into
                  how data is clustered and a higher risk of inaccurate results.
                  This is where semi-supervised learning comes in.
                </p>
              </ol>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">
              Semi-supervised learning: The best of both worlds
            </h1>
            <h5 class="content-padding-32 content-texts">
              Can’t decide on whether to use supervised or unsupervised
              learning? Semi-supervised learning is a happy medium, where you
              use a training dataset with both labeled and unlabeled data. It’s
              particularly useful when it’s difficult to extract relevant
              features from data — and when you have a high volume of data.
            </h5>
            <p class="content-text-grey">
              Semi-supervised learning is ideal for medical images, where a
              small amount of training data can lead to a significant
              improvement in accuracy. For example, a radiologist can label a
              small subset of CT scans for tumors or diseases so the machine can
              more accurately predict which patients might require more medical
              attention.
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">Manage your data for AI</h1>
            <h5 class="content-padding-32 content-texts">
              While all these areas of AI can help streamline areas of your
              business and improve your customer experience, achieving AI goals
              can be challenging because you’ll first need to ensure that you
              have the right systems in place to manage your data for the
              construction of learning algorithms.
            </h5>
            <p class="content-text-grey-whitebox">
              Data management is arguably harder than building the actual models
              that you’ll use for your business. You’ll need a place to store
              your data and mechanisms for cleaning it and controlling for bias
              before you can start building anything.{" "}
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">Reinforcement machine learning</h1>
            <h5 class="content-padding-32 content-texts">
              Reinforcement learning is an interesting learning model, with the
              ability not just to learn how to map an input to an output but to
              map a series of inputs to outputs with dependencies (Markov
              decision processes, for example). Reinforcement learning exists in
              the context of states in an environment and the actions possible
              at a given state. During the learning process, the algorithm
              randomly explores the state–action pairs within some environment
              (to build a state–action pair table), then in practice of the
              learned information exploits the state–action pair rewards to
              choose the best action for a given state that lead to some goal
              state. You can learn more about reinforcement learning in "Train a
              software agent to behave rationally with reinforcement learning."
            </h5>
            <p class="content-text-grey">
              <p>
                Consider a simple agent that plays blackjack. The states
                represent the sum of the cards for the player. The actions
                represent what a blackjack-playing agent may do — in this case,
                hit or stand. Training an agent to play blackjack would involve
                many hands of poker, where reward for a given state–action nexus
                is given for winning or losing. For example, the value for a
                state of 10 would be 1.0 for hit and 0.0 for stand (indicating
                that hit is the optimal choice). For state 20, the learned
                reward would likely be 0.0 for hit and 1.0 for stand. For a
                less-straightforward hand, a state of 17 may have action values
                of 0.95 stand and 0.05 hit. This agent would then
                probabilistically stand 95 percent of the time and hit 5 percent
                of the time. These rewards would be leaned over many hands of
                poker, indicating the best choice for a given state (or hand).
              </p>
              <p>
                Unlike supervised learning, where a critic grades each example,
                in reinforcement learning, that critic may only provide a grade
                when the goal state is met (having a hand with the state of 21).
              </p>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-light-grey content-padding-64 content-container">
        <div class="content-content">
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red content-margin-right"></i>
          </div>
          <div class="content-twothird">
            <h1 class="content-title">Real-world machine learning use cases</h1>
            <h5 class="content-padding-32 content-texts">
              Here are just a few examples of machine learning you might
              encounter every day:
            </h5>
            <p class="content-text-grey-whitebox">
              <p>
                <strong>
                  <span class="content-text-purple">Speech recognition:</span>
                </strong>{" "}
                It is also known as automatic speech recognition (ASR), computer
                speech recognition, or speech-to-text, and it is a capability
                which uses natural language processing (NLP) to process human
                speech into a written format. Many mobile devices incorporate
                speech recognition into their systems to conduct voice
                search—e.g. Siri—or provide more accessibility around texting.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Customer service:</span>
                </strong>{" "}
                Online chatbots are replacing human agents along the customer
                journey. They answer frequently asked questions (FAQs) around
                topics, like shipping, or provide personalized advice,
                cross-selling products or suggesting sizes for users, changing
                the way we think about customer engagement across websites and
                social media platforms. Examples include messaging bots on
                e-commerce sites with virtual agents, messaging apps, such as
                Slack and Facebook Messenger, and tasks usually done by virtual
                assistants and voice assistants.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Computer vision:</span>
                </strong>{" "}
                This AI technology enables computers and systems to derive
                meaningful information from digital images, videos and other
                visual inputs, and based on those inputs, it can take action.
                This ability to provide recommendations distinguishes it from
                image recognition tasks. Powered by convolutional neural
                networks, computer vision has applications within photo tagging
                in social media, radiology imaging in healthcare, and
                self-driving cars within the automotive industry.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Recommendation engines:
                  </span>
                </strong>{" "}
                Using past consumption behavior data, AI algorithms can help to
                discover data trends that can be used to develop more effective
                cross-selling strategies. This is used to make relevant add-on
                recommendations to customers during the checkout process for
                online retailers.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Automated stock trading:
                  </span>
                </strong>{" "}
                Designed to optimize stock portfolios, AI-driven high-frequency
                trading platforms make thousands or even millions of trades per
                day without human intervention.
              </p>
            </p>
          </div>
        </div>
      </div>

      <div class="content-row-padding content-padding-64 content-container">
        <div class="content-content">
          <div class="content-twothird">
            <h1 class="content-title">Challenges of machine learning</h1>
            <h5 class="content-padding-32 content-texts">
              As machine learning technology advances, it has certainly made our
              lives easier. However, implementing machine learning within
              businesses has also raised a number of ethical concerns
              surrounding AI technologies. Some of these include:
            </h5>
            <p class="content-text-grey">
              <p>
                <strong>
                  <span class="content-text-purple">
                    Technological singularity
                  </span>
                </strong>
              </p>
              <p>
                While this topic garners a lot of public attention, many
                researchers are not concerned with the idea of AI surpassing
                human intelligence in the near or immediate future. This is also
                referred to as superintelligence, which Nick Bostrum defines as
                “any intellect that vastly outperforms the best human brains in
                practically every field, including scientific creativity,
                general wisdom, and social skills.” Despite the fact that Strong
                AI and superintelligence is not imminent in society, the idea of
                it raises some interesting questions as we consider the use of
                autonomous systems, like self-driving cars. It’s unrealistic to
                think that a driverless car would never get into a car accident,
                but who is responsible and liable under those circumstances?
                Should we still pursue autonomous vehicles, or do we limit the
                integration of this technology to create only semi-autonomous
                vehicles which promote safety among drivers? The jury is still
                out on this, but these are the types of ethical debates that are
                occurring as new, innovative AI technology develops.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">AI impact on jobs</span>
                </strong>
              </p>
              <p>
                While a lot of public perception around artificial intelligence
                centers around job loss, this concern should be probably
                reframed. With every disruptive, new technology, we see that the
                market demand for specific job roles shift. For example, when we
                look at the automotive industry, many manufacturers, like GM,
                are shifting to focus on electric vehicle production to align
                with green initiatives. The energy industry isn’t going away,
                but the source of energy is shifting from a fuel economy to an
                electric one. Artificial intelligence should be viewed in a
                similar manner, where artificial intelligence will shift the
                demand of jobs to other areas. There will need to be individuals
                to help manage these systems as data grows and changes every
                day. There will still need to be resources to address more
                complex problems within the industries that are most likely to
                be affected by job demand shifts, like customer service. The
                important aspect of artificial intelligence and its effect on
                the job market will be helping individuals transition to these
                new areas of market demand.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Privacy</span>
                </strong>
              </p>
              <p>
                Privacy tends to be discussed in the context of data privacy,
                data protection and data security, and these concerns have
                allowed policymakers to make more strides here in recent years.
                For example, in 2016, GDPR legislation was created to protect
                the personal data of people in the European Union and European
                Economic Area, giving individuals more control of their data. In
                the United States, individual states are developing policies,
                such as the California Consumer Privacy Act (CCPA), which
                require businesses to inform consumers about the collection of
                their data. This recent legislation has forced companies to
                rethink how they store and use personally identifiable data
                (PII). As a result, investments within security have become an
                increasing priority for businesses as they seek to eliminate any
                vulnerabilities and opportunities for surveillance, hacking, and
                cyberattacks.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">
                    Bias and discrimination
                  </span>
                </strong>
              </p>
              <p>
                Instances of bias and discrimination across a number of
                intelligent systems have raised many ethical questions regarding
                the use of artificial intelligence. How can we safeguard against
                bias and discrimination when the training data itself can lend
                itself to bias? While companies typically have well-meaning
                intentions around their automation efforts, Reuters highlights
                some of the unforeseen consequences of incorporating AI into
                hiring practices. In their effort to automate and simplify a
                process, Amazon unintentionally biased potential job candidates
                by gender for open technical roles, and they ultimately had to
                scrap the project. As events like these surface, Harvard
                Business Review has raised other pointed questions around the
                use of AI within hiring practices, such as what data should you
                be able to use when evaluating a candidate for a role.
              </p>
              <p>
                Bias and discrimination aren’t limited to the human resources
                function either; it can be found in a number of applications
                from facial recognition software to social media algorithms.
              </p>
              <p>
                As businesses become more aware of the risks with AI, they’ve
                also become more active this discussion around AI ethics and
                values. For example, last year IBM’s CEO Arvind Krishna shared
                that IBM has sunset its general purpose IBM facial recognition
                and analysis products, emphasizing that “IBM firmly opposes and
                will not condone uses of any technology, including facial
                recognition technology offered by other vendors, for mass
                surveillance, racial profiling, violations of basic human rights
                and freedoms, or any purpose which is not consistent with our
                values and Principles of Trust and Transparency.” We at
                Profilera will strive to do the same.
              </p>
              <p>
                <strong>
                  <span class="content-text-purple">Accountability</span>
                </strong>
              </p>
              <p>
                Since there isn’t significant legislation to regulate AI
                practices, there is no real enforcement mechanism to ensure that
                ethical AI is practiced. The current incentives for companies to
                adhere to these guidelines are the negative repercussions of an
                unethical AI system to the bottom line. To fill the gap, ethical
                frameworks have emerged as part of a collaboration between
                ethicists and researchers to govern the construction and
                distribution of AI models within society. However, at the
                moment, these only serve to guide, and research shows that the
                combination of distributed responsibility and lack of foresight
                into potential consequences isn’t necessarily conducive to
                preventing harm to society.
              </p>
            </p>
          </div>
          <div class="content-third content-center">
            <i class="content-padding-64 content-text-red"></i>
          </div>
        </div>
      </div>

      <div class="content-container content-center content-opacity content-padding-64">
        <h1 class="content-margin content-xlarge content-text-black">
          <figure>
            <blockquote cite="Dave Waters">
              <p>
                Machine learning will increase productivity throughout the
                supply chain.
              </p>
            </blockquote>
            <figcaption class="content-text-grey">~Dave waters</figcaption>
          </figure>
        </h1>
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
