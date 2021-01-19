import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input";

import { InputBase, FormInputBase } from "../InputBase";

const InputTextArea = props => (
  <InputBase
    Component={Input.TextArea}
    className="InputTextArea InputText"
    {...props}
  />
);
InputTextArea.displayName = "InputTextArea InputText";
export default InputTextArea;

export const FormInputTextArea = props => (
  <FormInputBase
    Component={Input.TextArea}
    className="InputTextArea InputText"
    {...props}
  />
);
FormInputTextArea.displayName = "Form/InputTextArea";
