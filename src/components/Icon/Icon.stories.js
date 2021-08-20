import React from "react";
import { select, boolean } from "@storybook/addon-knobs";
import Icon from "./Icon";

export default {
  title: "Icon"
};

export const Default = () => {
  const typeProp = select("Type", ["air", "standard", "social"], "air");
  const iconProp = select(
    "Icon",
    [
      "facebook",
      "check",
      "trash",
      "twitter",
      "link",
      "smile",
      "check",
      "like",
      "mail"
    ],
    "check"
  );
  const loadingProp = boolean("Loading", false);

  return <Icon icon={iconProp} type={typeProp} loading={loadingProp} />;
};

Default.story = {
  name: "default"
};
