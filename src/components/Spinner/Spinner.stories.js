import React from "react";
import { action } from "@storybook/addon-actions";
import { text, number, boolean, select } from "@storybook/addon-knobs";

import Spinner from "./Spinner";

export default {
  title: "Spinner"
};

export const Default = () => {
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
};

Default.story = {
  name: "default"
};
