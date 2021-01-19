import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ButtonGroup from "./ButtonGroup";

import Button from "../Button";

storiesOf("ButtonGroup", module).add("default", () => (
  <ButtonGroup>
    <Button>Hi!</Button>
    <Button>Bye!</Button>
  </ButtonGroup>
));
