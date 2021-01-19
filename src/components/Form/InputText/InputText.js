import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input";

import { InputBase, FormInputBase } from "../InputBase";

if (process.env.WEBPACK) require("./InputText.scss");

const InputText = props => (
  <InputBase Component={Input} className="InputText" {...props} />
);
InputText.displayName = "InputText";
export default InputText;

export const FormInputText = props => (
  <FormInputBase Component={Input} className="InputText" {...props} />
);
FormInputText.displayName = "Form/InputText";
