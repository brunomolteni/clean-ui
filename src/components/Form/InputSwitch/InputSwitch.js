import React from "react";
import PropTypes from "prop-types";

import Switch from "antd/es/switch";
import "antd/es/switch/style/index.css";

import { InputBase, FormInputBase } from "../InputBase";

if (process.env.WEBPACK) require("./InputSwitch.scss");

const InputSwitch = props => (
  <InputBase Component={Switch} className="InputSwitch" {...props} />
);
InputSwitch.displayName = "InputSwitch";
export default InputSwitch;

export const FormInputSwitch = ({ field, ...props }) => (
  <FormInputBase
    Component={Switch}
    className="InputSwitch"
    field={{ name: field, type: "checkbox" }}
    {...props}
  />
);
FormInputSwitch.displayName = "Form/InputSwitch";
