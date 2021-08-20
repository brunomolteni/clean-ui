import React from "react";
import { boolean, radios } from "@storybook/addon-knobs";

import Tag from "./Tag";

export default {
  title: "Tag"
};

export const Default = () => {
  const style = radios(
    "Style",
    {
      Positive: "positive",
      Negative: "negative",
      none: ""
    },
    ""
  );
  const color = radios(
    "Color",
    {
      blue: "blue",
      green: "green",
      yellow: "yellow",
      orange: "orange",
      gray: "gray",
      none: ""
    },
    ""
  );
  const isChecked = boolean("Checked", false);
  const isTiny = boolean("Tiny", false);

  return (
    <Tag
      positive={style === "positive"}
      negative={style === "negative"}
      tiny={isTiny}
      checked={isChecked}
      color={color}
    >
      Programming
    </Tag>
  );
};

Default.story = {
  name: "default"
};
