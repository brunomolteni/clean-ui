import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import * as Yup from "yup";

import Form from ".";
import { useForm } from "./useForm";
import Button from "../Button";

const values = {
  text: "some text",
  textarea: "another text",
  editor: "yet another text",
  checkbox: true,
  radio: true,
  radiogroup: 2,
  select: { id: 0, long_display_name: "sarasa" },
  multiselect: [
    { id: 1, long_display_name: "sarasa" },
    { id: 2, long_display_name: "soroso" }
  ],
  autocomplete: 1
};

const selectOptions = [
  { long_display_name: "Option 1", id: 0 },
  { long_display_name: "Option 2", id: 2 },
  { long_display_name: "Option 3", id: 3 }
];

const customItemHandler = () =>
  Promise.resolve({ payload: { data: { result: 1337 } } });

const radioOptions = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 }
];

const schema = Yup.object().shape({
  text: Yup.string().required(),
  password: Yup.string().required("The Password is required"),
  search: Yup.string().required("The email address is required")
});

const allInputTypes = (
  <>
    <Form.InputText field="text" label="Text" />
    <Form.InputPassword field="password" label="Password" />
    <Form.InputSearch field="search" label="Search" />
    <Form.InputTextArea field="textarea" label="TextArea" />
    <Form.InputCheckbox field="checkbox" label="Checkbox" />
    <Form.InputRadio.Group
      field="radiogroup"
      label="Radio Group"
      options={radioOptions}
    />
    <Form.InputRadio field="radio" label="Radio" />
    <Form.InputGroup label="Input Group">
      <Form.InputText field="input1" placeholder="Input 1" />
      <Form.InputText field="input2" placeholder="Input 2" />
    </Form.InputGroup>
    <Form.InputEditor field="editor" label="Editor" />
    <Form.InputSelect field="select" label="Select" options={selectOptions} />
    <Form.InputSelect
      field="multiselect"
      label="Select mode=multiple"
      options={selectOptions}
      mode="multiple"
    />
    <Form.InputSelect.withCustom
      field="customselect"
      label="Select with Custom Items"
      options={selectOptions}
      onCustomItemSelect={customItemHandler}
    />
  </>
);

storiesOf("Form", module)
  .addDecorator(withKnobs)
  .add("Inputs", () => {
    const [values, setValues] = useState();
    const showButtons = boolean("Show Buttons?", true);
    const logValues = boolean("Log values on submit?", false);

    return (
      <>
        <Form
          onSubmit={
            logValues
              ? values => {
                  console.log(values);
                  setValues(values);
                }
              : values => setValues(values)
          }
          submitButton={
            showButtons ? <Button className="r10 d20">Save</Button> : null
          }
          cancelButton={
            showButtons ? <Button variant="ghost">Cancel</Button> : null
          }
          initialValues={values}
        >
          {allInputTypes}
          <h4>Values:</h4>
          <pre>{JSON.stringify(values || {}, undefined, 2)}</pre>
          <hr />
          <p className="d20">
            You can find more information on Ant Design inputs{" "}
            <a href="https://ant.design/components/input/">on here</a> ( check
            the sidebar for other input types)
          </p>
        </Form>
      </>
    );
  })
  .add("Initial Values", () => {
    return (
      <>
        <Form initialValues={values}>{allInputTypes}</Form>
      </>
    );
  })
  .add("Form Validation Schema", () => {
    return (
      <Form validationSchema={schema} initialValues={{}}>
        <Form.InputText
          field="text"
          label="Text"
          placeholder="Try clicking this..."
        />
        <Form.InputPassword
          field="password"
          label="Password"
          placeholder="...then this"
        />
        <Form.InputSearch field="search" label="Search" />
        <p>
          You can find more information on validating with Formik{" "}
          <a href="https://jaredpalmer.com/formik/docs/next/api/formik">
            on here
          </a>
        </p>
      </Form>
    );
  })
  .add("Form Manual Feedback", () => {
    return (
      <Form>
        <Form.InputText
          field="text"
          label="Text"
          help="This is some helping text"
        />
        <Form.InputPassword
          field="password"
          label="Password"
          error="There was an error here"
        />
        <Form.InputSearch
          field="search"
          label="Search"
          warning="This is some warning text"
        />
        <Form.InputTextArea
          field="textarea"
          label="TextArea"
          success="This was a success"
        />
        <Form.InputText
          field="text2"
          label="Other Text"
          help="This is loading"
          loading
        />
        <p>
          You can find more information on manual validation with Ant Design
          here{" "}
          <a href="https://ant.design/components/form/#components-form-demo-validate-static">
            on here
          </a>
        </p>
      </Form>
    );
  })
  .add("Form Hook", () => {
    const [HookedForm, formik] = useForm();

    return (
      <>
        <HookedForm>
          <Form.InputText field="text" label="Text" />
        </HookedForm>
        <Button
          className="d20"
          onClick={() =>
            formik.current.setFieldValue("text", Math.floor(Math.random() * 10))
          }
        >
          {" "}
          Set Value to Random Number
        </Button>
        <p style={{ maxWidth: "500px" }}>
          The hook gives access to all formik render methods and props such as
          submitForm, setFieldValue, values, etc. You can check the complete
          list with documentation{" "}
          <a href="https://jaredpalmer.com/formik/docs/next/api/formik#formik-render-methods-and-props">
            on here
          </a>
        </p>
      </>
    );
  });
