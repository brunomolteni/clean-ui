import React from "react";
import PropTypes from "prop-types";

import "./ProgressBar.scss";

const ProgressBar = props => {
  return (
    <div className="ProgressBar">
      <div
        className={`ProgressBar__bar ${props.color}`}
        style={{ width: `${props.at}%` }}
      />
    </div>
  );
};
ProgressBar.displayName = "ProgressBar";
ProgressBar.propTypes = {
  at: PropTypes.number
};
ProgressBar.defaultProps = {
  at: 0
};

export default ProgressBar;
