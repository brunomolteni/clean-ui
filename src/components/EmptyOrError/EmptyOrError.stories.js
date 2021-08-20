import React from "react";
import { action } from "@storybook/addon-actions";

import EmptyOrError from "./EmptyOrError";
import Button from "../Button";

let button = <Button>Contact now!</Button>;
let customProps = {
  headline: "Feeling Shy?",
  message:
    "You haven't contacted anyone yet. Are there any questions about emails or other concerns you'd like to discuss with our team?",
  icon: "/images/icons/shocked.png",
  action: button
};

export default {
  title: "EmptyOrError"
};

export const Default = () => <EmptyOrError />;

Default.story = {
  name: "default"
};

export const ActionProp = () => <EmptyOrError action={button} />;

ActionProp.story = {
  name: "action prop"
};

export const Customized = () => <EmptyOrError {...customProps} />;

Customized.story = {
  name: "customized"
};
