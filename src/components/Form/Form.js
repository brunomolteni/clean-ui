import React, { useCallback } from "react";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import { Formik } from "formik"; // https://jaredpalmer.com/formik/docs/next/api/formik
import { FormInputText } from "./InputText";
import { FormInputPassword } from "./InputPassword";
import { FormInputSearch } from "./InputSearch";
import { FormInputTextArea } from "./InputTextArea";
import InputGroup from "./InputGroup";
import InputEditor from "./InputEditor";
import { FormInputCheckbox } from "./InputCheckbox";
import { FormInputRadio } from "./InputRadio";
import { FormInputSelect } from "./InputSelect";
import { FormInputSwitch } from "./InputSwitch";

if (process.env.WEBPACK) require("./Form.scss");

const Form = ({
  children,
  dontValidateSubmitButton,
  submitButton,
  cancelButton,
  className,
  getFormikProps,
  initialValues,
  onSubmit,
  onChange,
  doNotDebounce,
  ...rest
}) => {
  const classes = ["Form"];
  if (className) classes.push(className);

  const debouncedOnSubmit = useCallback(
    debounce(
      (onSubmitFn, event) => {
        onSubmitFn(event);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  const handleSubmit = event => {
    if (typeof onSubmit !== "function") return;
    if (doNotDebounce) {
      onSubmit(event);
    } else {
      debouncedOnSubmit(onSubmit, event);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={e => handleSubmit(e)}
      {...rest}
    >
      {formikProps => {
        getFormikProps && getFormikProps(formikProps);
        onChange(formikProps.values);

        const submitButtonExtraProps = {
          type: "submit",
          disabled:
            !dontValidateSubmitButton &&
            (!formikProps.dirty || !formikProps.isValid)
        };

        return (
          <form
            className={classes.join(" ")}
            onSubmit={formikProps.handleSubmit}
          >
            {children}
            {submitButton &&
              React.cloneElement(submitButton, submitButtonExtraProps)}
            {cancelButton}
          </form>
        );
      }}
    </Formik>
  );
};
Form.displayName = "Form";
Form.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  dontValidateSubmitButton: PropTypes.bool,
  submitButton: PropTypes.node,
  cancelButton: PropTypes.node,
  className: PropTypes.string,
  getFormikProps: PropTypes.func,
  doNotDebounce: PropTypes.bool
};
Form.defaultProps = {
  initialValues: {},
  onSubmit: () => false,
  onChange: () => false,
  children: null,
  dontValidateSubmitButton: false,
  submitButton: null,
  cancelButton: null,
  className: null,
  getFormikProps: null,
  doNotDebounce: false
};
Form.InputText = FormInputText;
Form.InputPassword = FormInputPassword;
Form.InputSearch = FormInputSearch;
Form.InputTextArea = FormInputTextArea;
Form.InputGroup = InputGroup;
Form.InputEditor = InputEditor;
Form.InputCheckbox = FormInputCheckbox;
Form.InputRadio = FormInputRadio;
Form.InputSelect = FormInputSelect;
Form.InputSwitch = FormInputSwitch;

export default Form;
