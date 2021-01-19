import React, { useRef, useEffect } from "react";

import Form from "./Form";

export const useForm = () => {
  const formikPropsRef = useRef();
  const FormWithRef = useRef();

  if (!FormWithRef.current)
    FormWithRef.current = props => (
      <Form
        {...props}
        getFormikProps={formikProps => {
          formikPropsRef.current = formikProps;
        }}
      />
    );
  FormWithRef.current.displayName = "useForm";

  return [FormWithRef.current, formikPropsRef];
};
