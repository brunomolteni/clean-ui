import React from "react";
import ReactQuill, { Quill } from "react-quill";
import { FormInput } from "react-form";
import PropTypes from "prop-types";
import { FastField, connect } from "formik";
import Form from "antd/es/form";
import ScoutQuill from "./ScoutQuill";
import ScoutVariables from "./ScoutVariables";
import ScoutLink from "./blots/ScoutLink";

if (process.env.WEBPACK) {
  require("./InputEditor.scss");
  require("react-quill/dist/quill.snow.css");
}

class InputEditor extends React.Component {
  state = {
    isClosingVariable: false
  };

  constructor(props) {
    super(props);

    // toolbar config
    this.toolbar = { ...InputEditor.toolbar, ...props.toolbar };

    // Quill instance
    this.quillRef = null;
    // ReactQuill component
    this.reactQuillRef = null;

    const QuillInstance = ReactQuill.Quill;

    // register custom blots and modules for variables.
    ScoutVariables.register(QuillInstance);

    // Blot validator to prevent relative links
    ScoutLink.register(QuillInstance);

    // Helper for custom scout features built on top of quill
    this.scoutQuill = new ScoutQuill(QuillInstance);

    // Quill custom modules included toolbar
    this.quillModules = this.scoutQuill.getModules(this.toolbar);

    this.reactQuillRef = QuillInstance;
  }

  componentDidMount() {
    this.attachQuillRefs();

    // Setup stuff for emailEditor
    if (this.toolbar.emailEditor) {
      // set the Scout variables dropdown
      ScoutVariables.initDropdown(this.props.field);
    }

    this.quillRef && this.quillRef.history.clear();
    this.mounted = true;
  }

  // Handles editor content changes
  handleChange = (content, delta, source, editor) => {
    if (ScoutVariables.isClosingVariable(delta)) {
      if (this.state.isClosingVariable) {
        this.setState({ isClosingVariable: false });
        ScoutVariables.checkHandwrittenVariable(this.quillRef);
      } else {
        this.setState({ isClosingVariable: true });
      }
    }
    const cleanContent = content
      .replace(/<(\/?mark)([^>]+)?>/g, "")
      .replace(/<(\/?span)([^>]+)?>/g, "")
      .replace(/\uFEFF/g, "");
    // set form value
    const currentContent = this.props.formik.values[this.props.field];
    if (currentContent !== cleanContent && this.mounted)
      // this is to avoid a bug... have to look more into it
      this.props.formik.setFieldValue(this.props.field, cleanContent);
    // Finally call the user defined onChange action
    this.props.onChange && this.props.onChange(cleanContent);
  };

  // Sets the references for the Quill object and the ReactQuill component
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
    this.props.autofocus && this.quillRef.focus();
  };

  static checkInvalidVariables(content) {
    return content.match(ScoutVariables.config.regex.isInvalid);
  }

  render() {
    const {
      children,
      onChange,
      value,
      field,
      label,
      labelSize,
      validateStatus,
      help,
      hasFeedback,
      extra,
      loading,
      ...rest
    } = this.props;
    const formItemProps = { validateStatus, help, hasFeedback, extra };
    const safeId = `Input__${String(field).replace(/\s/g, "")}`;

    return (
      <div id={field} className="InputEditor FormInputEditor">
        {label && (
          <label htmlFor={safeId} className={`Input__label ${labelSize}-text`}>
            {label}
          </label>
        )}
        <FastField name={field}>
          {({
            field, // { name, value, onChange, onBlur }
            form, // touched, errors, values, setXXXX, handleXXXX, dirty, isValid, status
            meta
          }) => {
            return (
              <Form.Item
                validateStatus={
                  validateStatus ||
                  (!!meta.error && "error") ||
                  (loading && "validating")
                }
                help={help || meta.error}
                extra={extra}
              >
                <ReactQuill
                  ref={el => {
                    this.reactQuillRef = el; // Set the reactQuill component reference
                  }}
                  defaultValue={field.value}
                  onChange={this.handleChange}
                  className="InputEditor__content"
                  modules={this.quillModules} // Modules config including toolbar
                  formats={InputEditor.formats}
                  placeholder={this.props.placeholder}
                  id={safeId}
                />
              </Form.Item>
            );
          }}
        </FastField>
      </div>
    );
  }
}
InputEditor.displayName = "InputEditor";

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
InputEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "variable",
  "break"
];

/*
 * Quill toolbar config
 */

InputEditor.toolbar = {
  fontOptions: false,
  textOptions: true,
  indentOptions: false,
  listOptions: false,
  link: true,
  image: false,
  blockquote: false,
  emailEditor: true,
  clean: false
};

InputEditor.propTypes = {
  field: PropTypes.string.isRequired,
  toolbar: PropTypes.shape({
    fontOptions: PropTypes.bool,
    textOptions: PropTypes.bool,
    indentOptions: PropTypes.bool,
    listOptions: PropTypes.bool,
    link: PropTypes.bool,
    image: PropTypes.bool,
    clean: PropTypes.bool,
    blockquote: PropTypes.bool,
    emailEditor: PropTypes.bool
  }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  autofocus: PropTypes.bool,
  label: PropTypes.string,
  labelSize: PropTypes.string
};

InputEditor.defaultProps = {
  toolbar: {},
  placeholder: "You can edit this...",
  labelSize: "tiny"
};

export default connect(InputEditor);
