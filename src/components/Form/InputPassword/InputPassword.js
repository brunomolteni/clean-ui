import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input";

import { InputBase, FormInputBase } from "../InputBase";

const InputPassword = props => (
  <InputBase
    Component={Input.Password}
    className="InputPassword InputText"
    {...props}
  />
);
InputPassword.displayName = "InputPassword";
export default InputPassword;

export const FormInputPassword = props => (
  <FormInputBase
    Component={Input.Password}
    className="InputPassword InputText"
    {...props}
  />
);
FormInputPassword.displayName = "Form/InputPassword";
