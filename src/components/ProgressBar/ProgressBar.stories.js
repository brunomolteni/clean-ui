import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";

import ProgressBar from "./ProgressBar";

storiesOf("ProgressBar", module).add("default", () => {
  const options = {
    range: true,
    min: 0,
    max: 100,
    step: 5
  };

  const atProp = number("Progress %", 60, options);

  return <ProgressBar at={atProp} />;
});
