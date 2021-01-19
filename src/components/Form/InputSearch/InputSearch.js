import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input";

import { InputBase, FormInputBase } from "../InputBase";

const InputSearch = props => (
  <InputBase
    Component={Input.Search}
    className="InputSearch InputText"
    {...props}
  />
);
InputSearch.displayName = "InputSearch";
export default InputSearch;

export const FormInputSearch = props => (
  <FormInputBase
    Component={Input.Search}
    className="InputSearch InputText"
    {...props}
  />
);
FormInputSearch.displayName = "Form/InputSearch";
