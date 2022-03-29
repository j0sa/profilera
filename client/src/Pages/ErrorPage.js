import React from "react";
import "./css/ErrorPage.scss";

const ErrorPage = () => {
  return(
     <div className="errormsg-div">
            <h1>Oops, something went wrong :(</h1>
            <h3>Looks like we couldn't find what you were looking for.</h3>
            <h3>Try navigating back to the main page.</h3>
            
    </div>

  );
};

export default ErrorPage;
