import React from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";

import "./SplitSection.scss";

const SplitSection = ({ className, logo, avatar, action, link, children }) => {
  const classes = ["SplitSection"];
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")}>
      {logo && <img className="SplitSection__logo" src={logo} alt="" />}
      {avatar && <Avatar {...avatar} />}
      <div className="SplitSection__text">{children}</div>
      <div className="SplitSection__links">{link}</div>
      <div className="SplitSection__action">{action}</div>
    </div>
  );
};
SplitSection.displayName = "SplitSection";
SplitSection.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.string,
  action: PropTypes.node,
  link: PropTypes.node,
  avatar: PropTypes.object,
  children: PropTypes.node
};
SplitSection.defaultProps = {
  className: "",
  logo: null,
  action: null,
  link: null,
  avatar: null,
  children: null
};

export default SplitSection;
