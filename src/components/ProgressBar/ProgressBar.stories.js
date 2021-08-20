import React from "react";
import { number } from "@storybook/addon-knobs";

import ProgressBar from "./ProgressBar";

export default {
  title: "ProgressBar"
};

export const Default = () => {
  const options = {
    range: true,
    min: 0,
    max: 100,
    step: 5
  };

  const atProp = number("Progress %", 60, options);

  return <ProgressBar at={atProp} />;
};

Default.story = {
  name: "default"
};
