import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";

import Checkbox from "antd/es/checkbox";
import "antd/es/checkbox/style/index.css";

import { InputBase, FormInputBase } from "../InputBase";

const InputCheckbox = props => (
  <InputBase Component={Checkbox} className="InputCheckbox" {...props} />
);
InputCheckbox.displayName = "InputCheckbox";
export default InputCheckbox;

export const FormInputCheckbox = ({ field, ...props }) => (
  <FormInputBase
    Component={Checkbox}
    className="InputCheckbox"
    field={{ name: field, type: "checkbox" }}
    {...props}
  />
);
FormInputCheckbox.displayName = "Form/InputCheckbox";
