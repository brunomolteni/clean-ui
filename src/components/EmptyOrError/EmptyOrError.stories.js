import React from "react";
import { storiesOf } from "@storybook/react";
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

storiesOf("EmptyOrError", module)
  .add("default", () => <EmptyOrError />)
  .add("action prop", () => <EmptyOrError action={button} />)
  .add("customized", () => <EmptyOrError {...customProps} />);
