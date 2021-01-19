import React, { Fragment } from "react";
import PropTypes from "prop-types";

if (process.env.WEBPACK) require("./Tooltip.scss");

const Tooltip = ({ text, position, length, children, stayOpen, className }) => (
  <Fragment>
    <div
      className={`Tooltip ${
        stayOpen ? "--stay-open" : ""
      } --${position} --${length} ${className}`}
    >
      {children}
      <div className="Tooltip__Text">{text}</div>
    </div>
  </Fragment>
);

Tooltip.displayName = "Tooltip";
Tooltip.propTypes = {
  text: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  stayOpen: PropTypes.bool,
  position: PropTypes.oneOf([
    "top",
    "right",
    "bottom",
    "left",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right"
  ]),
  length: PropTypes.oneOf([
    "small",
    "medium",
    "large",
    "xlarge",
    "fit",
    "noWrap"
  ]),
  className: PropTypes.string
};
Tooltip.defaultProps = {
  stayOpen: false,
  position: "top",
  length: null,
  className: ""
};

export default Tooltip;
