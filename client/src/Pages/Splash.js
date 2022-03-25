import React from "react";
import "./css/Splash.scss";
import VideoBg from "reactjs-videobg";
import mp4 from "../assets/videos/backgroundAnimation.mp4";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";

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
      main: "#4717F6",
      darker: "#053e85",
    },
  },
});

const slideImages = [
  {
    url: "https://media.foretagsforumet.se/2020/09/Skillnaden-mellan-fysisk-och-juridisk-person.jpg",
    caption: "Kristijan Majkic",
  },
  {
    url: "https://avatars.githubusercontent.com/u/47446346?v=4",
    caption: "Jonas Samuelsson",
  },
];

const Splash = () => {
  return (
    <div className="splash-page">
      <VideoBg>
        <VideoBg.Source src={mp4} type="video/mp4" />
      </VideoBg>

      <div class="attention-grabbing-title-div">
        <Fade left>
          <h1>
            <b>
              Patterns that elevate your business{" "}
              <span className="atnGrab-lastWord">success.</span>
            </b>
          </h1>
        </Fade>
      </div>

      <div className="first-CTAbtn">
        <Fade left>
          <Button variant="contained" color="secondary" size="large">
            Create an Account
          </Button>
        </Fade>
      </div>

      <div class="use-profilera-text-div">
        <Fade left>
          <h2>
            Make use of Profilera's sophisticated{" "}
            <span className="ai-assisted">AI-assisted</span> pattern-revealing
            service and gain new knowledge and insights about your customer
            base.
          </h2>
        </Fade>
      </div>

      <div class="use-case-text-div">
        <Fade right>
          <h2>
            Consider how many sales and business opportunities you are missing
            out on by not optimizing your marketing methods. We here at
            profilera strive towards highlighting and presenting you with the
            most valuable information about your customer base so that you
            aren’t exposed to the risk of missing out on that big sale ever
            again.The way we accomplish this is by offering a service that
            assists you in finding useful patterns within your customer base.
          </h2>
        </Fade>
      </div>

      <div className="meet-the-team-div">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div className="each-slide" key={index}>
              <div style={{ backgroundImage: `url(${slideImage.url})` }}>
                <span>{slideImage.caption}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>

      <div class="CTA-div">
        <Fade up>
          <h2>
            Register now and give yourself a higher understanding of how you can
            modify your marketing methods in the most optimal way.
          </h2>
          <Button variant="contained" color="secondary" size="large">
            Register Now
          </Button>
        </Fade>
      </div>
    </div>
  );
};

export default Splash;
