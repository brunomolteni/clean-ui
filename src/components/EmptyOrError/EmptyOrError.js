import React from "react";
import PropTypes from "prop-types";
if (process.env.WEBPACK) require("./EmptyOrError.scss");

const EmptyOrError = ({ icon, headline, message, action }) => {
  let classes = ["EmptyOrError"];
  return (
    <div className={classes.join(" ")}>
      <img src={icon} />
      <h4 className="blue-gray thin">{headline}</h4>
      <p className="blue-gray thin">{message}</p>
      {action}
    </div>
  );
};
EmptyOrError.displayName = "EmptyOrError";
EmptyOrError.propTypes = {
  icon: PropTypes.string,
  headline: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.node
};
EmptyOrError.defaultProps = {
  icon: "/images/icons/confused.png",
  headline: "Oops!",
  message: "Looks like there's nothing to show here.",
  action: false
};

export default EmptyOrError;
