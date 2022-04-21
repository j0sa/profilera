import React from "react";
import "./css/Splash.scss";
import VideoBg from "reactjs-videobg";
import mp4 from "../assets/videos/backgroundAnimation.mp4";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { useNavigate, useLocation } from "react-router-dom";
import kristijanPic from "../assets/images/kristijanpic.jpg";
import jonasPic from "../assets/images/jonaspic.jpg";

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
    url: kristijanPic,
    caption: "Kristijan Majkic",
    infotxt: "Developer, Freethinker and Modern-Day Renaissance Man",
  },
  {
    url: jonasPic,
    caption: "Jonas Samuelsson",
    infotxt: "Developer",
  },
];

const Splash = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("../", { replace: true });
    localStorage.setItem("CTA", "true");
  };

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
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
          >
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
            again.
          </h2>
        </Fade>
      </div>

      <div class="use-case-text-how-div">
        <Fade left>
          <h2>
            How do we accomplish this? By offering a service that assists you in
            finding useful patterns within your customer base.
          </h2>
        </Fade>
      </div>

      <div id="meet-the-team-div" class="meet-the-team-div">
        <div class="meet-the-team-text-div">
          <Fade left>
            <h2>Meet our team!</h2>
            <h3>
              We are a small but dedicated and commited team of developers.
            </h3>
          </Fade>
        </div>

        <div className="meet-the-team-slide-div">
          <Fade up>
            <Slide>
              {slideImages.map((slideImage, index) => (
                <div className="each-slide" key={index}>
                  <h2>{slideImage.caption}</h2>
                  <div
                    style={{ backgroundImage: `url(${slideImage.url})` }}
                  ></div>
                  <p class="info-text-p">{slideImage.infotxt} </p>
                </div>
              ))}
            </Slide>
          </Fade>
        </div>
      </div>

      <div class="CTA-div">
        <Fade up>
          <h2>
            Register now and give yourself a higher understanding of how you can
            modify your marketing methods in the most optimal way.
          </h2>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleClick}
          >
            Register Now
          </Button>
        </Fade>
      </div>

      <CookieConsent
        debug={true}
        location="bottom"
        buttonText="Accept"
        enableDeclineButton
        declineButtonText="Reject"
        buttonId="accept-button"
        declineButtonId="decline-button"
        buttonClasses="cookie-consent-buttons"
        style={{ background: "#0E0B16" }}
        buttonStyle={{
          color: "#E7DFDD",
          borderRadius: "4px",
          background: "#A239CA",
          fontWeight: 500,
          fontSize: "0.9375rem",
          letterSpacing: "0.02857em",
          padding: "8px 44px",
          textTransform: "uppercase",
        }}
        declineButtonStyle={{
          color: "#0E0B16",
          borderRadius: "4px",
          background: "#ffffff",
          fontWeight: 500,
          fontSize: "0.9375rem",
          letterSpacing: "0.02857em",
          padding: "8px 22px",
          opacity: "60%",
          textTransform: "uppercase",
        }}
        expires={150}
      >
        <span className="cookie-consent-text">
          This website uses cookies to enhance the user experience.{" "}
        </span>
        <button
          className="cookie-consent-privacy"
          onClick={() => {
            navigate("/privacy");
          }}
        >
          Learn more about cookies.
        </button>
      </CookieConsent>
    </div>
  );
};

export default Splash;
