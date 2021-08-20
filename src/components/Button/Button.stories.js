import React from "react";
import { action } from "@storybook/addon-actions";
import { text, select, boolean } from "@storybook/addon-knobs";

import Button from "./Button";
import Icon from "../Icon";

export default {
  title: "Button"
};

export const Default = () => {
  const onClickProp = action("clicked");
  const sizeProp = select("Size", [null, "big", "small", "tiny"], null);
  const variantProp = select(
    "Variant",
    [null, "ghost", "archived", "scheduled"],
    null
  );
  const loadingProp = boolean("Loading", false);
  const disabledProp = boolean("Disabled", false);
  const withIcon = boolean("With Icon", false);
  const buttonText = text("Text", "Click me");

  return (
    <Button
      onClick={onClickProp}
      size={sizeProp}
      variant={variantProp}
      loading={loadingProp}
      disabled={disabledProp}
    >
      <span>
        {buttonText} {withIcon && <Icon />}
      </span>
    </Button>
  );
};

Default.story = {
  name: "default"
};
