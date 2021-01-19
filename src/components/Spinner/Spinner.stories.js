import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, number, boolean, select } from "@storybook/addon-knobs";

import Spinner from "./Spinner";

storiesOf("Spinner", module).add("default", () => {
  const sizeProp = number("Size", 60);
  const widthProp = number("Width", 3);
  const descriptionProp = text("Description", "Loading...");
  const withDescription = boolean("With Description", true);
  const colorProp = select(
    "Color",
    ["blue", "orange", "yellow", "pink", "green"],
    "blue"
  );

  return (
    <Spinner
      size={sizeProp}
      width={widthProp}
      color={colorProp}
      description={withDescription ? descriptionProp : undefined}
    />
  );
});
