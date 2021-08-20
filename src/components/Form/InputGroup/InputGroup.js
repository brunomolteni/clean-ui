import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input";

import "./InputGroup.scss";

const InputGroup = ({ className, label, labelSize, ...props }) => (
  <React.Fragment>
    {label && (
      <label className={`Input__label ${labelSize}-text`}>{label}</label>
    )}
    <Input.Group
      compact
      className={`InputGroup ${className || ""}`}
      {...props}
    />
  </React.Fragment>
);
InputGroup.displayName = "InputGroup";
InputGroup.propTypes = {
  label: PropTypes.node,
  labelSize: PropTypes.string,
  className: PropTypes.string
};
InputGroup.defaultProps = {
  label: null,
  labelSize: "tiny",
  className: null
};

export default InputGroup;
