import React from "react";
import "./css/Splash.scss";
import VideoBg from "reactjs-videobg";
import mp4 from "../assets/videos/backgroundAnimation.mp4";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const Fade = require("react-reveal/Fade")

const slideImages = [
  {
    url: 'https://media.foretagsforumet.se/2020/09/Skillnaden-mellan-fysisk-och-juridisk-person.jpg',
    caption: 'Kristijan Majkic'
  },
  {
    url: 'https://avatars.githubusercontent.com/u/47446346?v=4',
    caption: 'Jonas Samuelsson'
  },
];

const Splash = () => {


  return( <div>
  <VideoBg>
    <VideoBg.Source src={mp4} type="video/mp4" />
  </VideoBg>
  <div class="attention-grabbing-title-div">
  <Fade left>
    <h1>
      Patterns that elevate your business success.
      <hr></hr>
    </h1>
    </Fade>
  </div>

  <div class="use-profilera-text-div">
    <Fade left>
      <h2> 
      Make use of profilera’s sophisticated AI-assisted pattern revealing service and gain new knowledge and insights about your customer base. 
      </h2>
   </Fade>
  </div>

  <div className="meet-the-team-div">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`}}>
                <span>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>

  <div class="use-case-text-div">
    <Fade right>
      <h2>
       Consider how many sales and business opportunities you are missing out on by not optimizing your marketing methods. We here at profilera strive towards highlighting and presenting you with the most valuable information about your customer base so that you aren’t exposed to the risk of missing out on that big sale ever again.The way we accomplish this is by offering a service that assists you in finding useful patterns within your customer base. 
      </h2>
    </Fade>
  </div>
  
  
  <div class="CTA-div">
      <Fade up>
      <h2>
      Register now and give yourself a higher understanding of how you can modify your marketing methods in the most optimal way.
      </h2>
      <button>Register Now</button>
      </ Fade >
  </div>

</div>);
};

export default Splash;
