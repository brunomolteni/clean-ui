import React, { Component, useEffect, memo } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input"; // https://ant.design/components/input/
import "antd/es/input/style/index.css";
import Form from "antd/es/form";
import "antd/es/form/style/index.css";
import { useField } from "formik";

export const InputBase = ({
  Component,
  field,
  label,
  labelSize,
  noBorder,
  className,
  validateStatus,
  help,
  hasFeedback,
  extra,
  required,
  error,
  success,
  warning,
  loading,
  ...rest
}) => {
  const fieldName = typeof field === "object" ? field.name : field;
  const safeId = `Input__${String(fieldName).replace(/\s/g, "")}`;

  const classes = ["Input__input"];
  if (className) classes.push(className);
  if (noBorder) classes.push("--noBorder");

  const formItemProps = { validateStatus, help, hasFeedback, extra };
  return (
    <React.Fragment>
      {label && (
        <label htmlFor={safeId} className={`Input__label ${labelSize}-text`}>
          {label} {required ? <span className="orange">*</span> : ""}
        </label>
      )}
      <Form.Item {...formItemProps}>
        <Component
          id={safeId}
          className={classes.join(" ")}
          loading={loading}
          {...rest}
        />
      </Form.Item>
    </React.Fragment>
  );
};
InputBase.displayName = "Input";
InputBase.propTypes = {
  field: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  label: PropTypes.node,
  labelSize: PropTypes.string,
  noBorder: PropTypes.bool,
  className: PropTypes.string
};
InputBase.defaultProps = {
  label: null,
  labelSize: "tiny",
  noBorder: false,
  className: null
};

export const validationProps = (props, meta) => ({
  validateStatus:
    ((!!meta.error || !!props.error) && "error") ||
    (!!props.warning && "warning") ||
    (!!props.success && "success") ||
    (props.loading && "validating") ||
    null,
  help: meta.error || props.error || props.warning || props.success || null,
  hasFeedback:
    !!meta.error ||
    !!props.error ||
    !!props.warning ||
    !!props.success ||
    props.loading ||
    null
});

export const FormInputBase = props => {
  const [fieldProps, meta] = useField(props.field);
  return (
    <InputBase {...validationProps(props, meta)} {...fieldProps} {...props} />
  );
};

FormInputBase.displayName = "Form/InputBase";
FormInputBase.propTypes = {
  ...InputBase.propTypes
};
FormInputBase.defaultProps = {
  ...InputBase.defaultProps
};
