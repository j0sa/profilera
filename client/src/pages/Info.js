import React from "react";
import "./css/Info.scss";
import Fade from "react-reveal/Fade";

const Info = () => {
  return (
    <div className="info-txt-customer-segmentation-div">
      <Fade left>
        <h1> What is customer segmentation and what are personas?</h1>

        <p>
          {" "}
          Customer segmentation is the process by which you divide your customer
          base based on common characteristics – such as behaviors, income, age,
          location and interests. This is done in order to market to those
          customers more effectively.
        </p>

        <p>
          The groups that form as a result of customer segmentation can also be
          used to create a marketing persona. A marketing persona is a fictive
          person that is made up of the traits that in this case is in common
          for a group of customers. This is because customer segmentation is
          typically used to improve how a business sells and so marketing
          personas need to be closely aligned with these customer segments in
          order to provide a better understanding of which marketing methods are
          best suited for the persona. For each group created as a result of
          customer segmentation a specifikt persona is created to represent each
          one of these groups.
        </p>
      </Fade>
    </div>
  );
};

export default Info;
