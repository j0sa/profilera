import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Team.scss";

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

const Team = () => {
  return (
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
  );
};

export default Team;
