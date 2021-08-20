import React from "react";
import { action } from "@storybook/addon-actions";

import ButtonGroup from "./ButtonGroup";

import Button from "../Button";

export default {
  title: "ButtonGroup"
};

export const Default = () => (
  <ButtonGroup>
    <Button>Hi!</Button>
    <Button>Bye!</Button>
  </ButtonGroup>
);

Default.story = {
  name: "default"
};
