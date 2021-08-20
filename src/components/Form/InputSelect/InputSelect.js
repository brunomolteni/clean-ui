import React, { useRef, useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import PropTypes from "prop-types";
import { Select, Divider, Icon } from "antd/es";
import "antd/es/select/style/index.css";
import "antd/es/icon/style/index.css";
import "antd/es/divider/style/index.css";
import { InputBase, validationProps } from "../InputBase";
import Button from "../../Button";
import { useModal } from "../../Modal";

import "./InputSelect.scss";

const { Option } = Select;

const InputSelect = ({ options, getValueFrom, getLabelFrom, ...props }) => {
  return (
    <InputBase Component={Select} className="InputSelect" {...props}>
      {options.map(option => (
        <Option key={option[getValueFrom]}>{option[getLabelFrom]}</Option>
      ))}
    </InputBase>
  );
};
InputSelect.displayName = "InputSelect";

InputSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  getValueFrom: PropTypes.string,
  getLabelFrom: PropTypes.string,
  mode: PropTypes.string
};
InputSelect.defaultProps = {
  getValueFrom: "id",
  getLabelFrom: "long_display_name",
  mode: "default",
  options: []
};

export default InputSelect;

export const FormInputSelect = ({
  options,
  getValueFrom,
  getLabelFrom,
  ...props
}) => {
  const { mode, field } = props;
  const fieldValue =
    mode === "multiple" || mode === "tags"
      ? { name: field, mode: "multiple" }
      : field;
  const [fieldProps, meta] = useField(fieldValue);
  const { setFieldValue } = useFormikContext();

  const isDefined = value => typeof value !== "undefined";

  // If the initialValue passed is not an object with the value inside
  // check the options for matching item and set it as value in formik state
  if (
    isDefined(fieldProps.value) &&
    !isDefined(fieldProps.value[getValueFrom])
  ) {
    const matchedOption = options.find(
      option => option[getValueFrom] === fieldProps.value
    );
    if (matchedOption) {
      setFieldValue(fieldProps.name, matchedOption);
      return <div />;
    }
  }

  const mapValueFromAntFormat = ({ key, label }) => ({
    [getValueFrom]: key,
    [getLabelFrom]: label
  });

  const mapValueToAntFormat = value =>
    isDefined(value[getValueFrom])
      ? {
          key: `${value[getValueFrom]}`,
          label: value[getLabelFrom]
        }
      : undefined;

  const fakeEvent = value => ({
    target: {
      value: Array.isArray(value)
        ? value.map(mapValueFromAntFormat)
        : mapValueFromAntFormat(value),
      name: field
    }
  });

  const optionsToRender =
    (options.length > 0 && options) ||
    (!isDefined(fieldProps.value) && []) ||
    (Array.isArray(fieldProps.value) ? fieldProps.value : [fieldProps.value]);

  const formattedValue =
    !isDefined(fieldProps.value) || Number.isNaN(fieldProps.value)
      ? undefined
      : Array.isArray(fieldProps.value)
      ? fieldProps.value.map(mapValueToAntFormat)
      : mapValueToAntFormat(fieldProps.value);

  return (
    <InputBase
      Component={Select}
      className="InputSelect"
      labelInValue
      value={formattedValue}
      onChange={value => fieldProps.onChange(fakeEvent(value))}
      notFoundContent="No option matches what you typed."
      {...validationProps(props, meta)}
      {...props}
    >
      {optionsToRender.map(option => (
        <Option key={option[getValueFrom]}>{option[getLabelFrom]}</Option>
      ))}
    </InputBase>
  );
};
FormInputSelect.displayName = "Form/InputSelect";

FormInputSelect.propTypes = {
  field: PropTypes.string.isRequired,
  ...InputSelect.propTypes
};

FormInputSelect.defaultProps = {
  ...InputSelect.defaultProps
};
FormInputSelect.withCustom = ({
  onCustomItemSelect,
  customItemCreationLoading,
  ...props
}) => {
  const { getLabelFrom, getValueFrom, field, options } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [CreateCustomTagModal, toggleCreateCustomTagModal] = useModal();
  const { setFieldValue } = useFormikContext();

  const addCustomItem = searchTerm => {
    setSearchTerm(searchTerm);
    if (onCustomItemSelect) {
      return toggleCreateCustomTagModal();
    }
  };

  const createCustomTag = () => {
    return onCustomItemSelect(searchTerm).then(({ payload }) => {
      const newItem = {
        [getValueFrom]: payload.data.result,
        [getLabelFrom]: searchTerm
      };
      setFieldValue(field, newItem);
      options.push(newItem);
      setSearchTerm("");
      toggleCreateCustomTagModal();
    });
  };

  return (
    <div>
      <FormInputSelect
        {...props}
        options={options}
        showSearch
        dropdownRender={menu => (
          <div>
            {menu}
            {menu.props.inputValue && (
              <React.Fragment>
                <Divider style={{ margin: "4px 0" }} />
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  style={{ padding: "4px 8px", cursor: "pointer" }}
                  onMouseDown={() => addCustomItem(menu.props.inputValue)}
                >
                  <Icon type="plus" /> Add &quot;{menu.props.inputValue}&quot;
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      />
      <CreateCustomTagModal
        closeModal={() => {
          toggleCreateCustomTagModal();
        }}
        className="CreateCustomTagModal"
      >
        <div className="CreateCustomTagModal__title">
          <p>Are you sure you want to create the custom tag?</p>
        </div>
        <div className="CreateCustomTagModal__buttons">
          <Button
            onClick={() => {
              createCustomTag();
            }}
            loading={customItemCreationLoading}
          >
            Create
          </Button>
          <Button
            onClick={() => {
              toggleCreateCustomTagModal();
            }}
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      </CreateCustomTagModal>
    </div>
  );
};
FormInputSelect.withCustom.displayName = "Form/InputSelect/Custom";
FormInputSelect.withCustom.propTypes = {
  field: PropTypes.string.isRequired,
  ...InputSelect.propTypes
};

FormInputSelect.withCustom.defaultProps = {
  ...InputSelect.defaultProps
};
