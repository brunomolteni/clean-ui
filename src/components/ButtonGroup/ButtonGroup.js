import React from "react";
import PropTypes from "prop-types";

import Button from "../Button";

import "./ButtonGroup.scss";

const acceptedTypes = ["Button", "DropButton", "LinkedButton"];

const ButtonGroup = ({ children, className, ...rest }) => (
  <div className={`ButtonGroup flex ${className || ""}`} {...rest}>
    {children}
  </div>
);
ButtonGroup.displayName = "ButtonGroup";
ButtonGroup.propTypes = {
  children(props, propName, componentName) {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, child => {
      if (acceptedTypes.indexOf(child.type.displayName) < 0) {
        error = new Error(
          "`ButtonGroup` only accepts children of type `Button`."
        );
      }
    });

    return error;
  }
};
ButtonGroup.defaultProps = {
  children: false
};

export default ButtonGroup;
