import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";

import Radio from "antd/es/radio";
import "antd/es/radio/style/index.css";

import { InputBase, FormInputBase } from "../InputBase";

const InputRadio = props => <Radio {...props} />;
InputRadio.displayName = "InputRadio";
InputRadio.Group = props => (
  <InputBase Component={Radio.Group} className="InputRadio" {...props} />
);
InputRadio.Group.displayName = "InputRadioGroup";
export default InputRadio;

export const FormInputRadio = ({ field, ...props }) => (
  <FormInputBase
    Component={Radio}
    className="InputRadio"
    {...props}
    field={{ name: field, type: "checkbox" }}
  />
);
FormInputRadio.displayName = "Form/InputRadio";

FormInputRadio.Group = props => (
  <FormInputBase
    Component={Radio.Group}
    className="InputRadioGroup"
    {...props}
  />
);
FormInputRadio.Group.displayName = "Form/InputRadioGroup";
