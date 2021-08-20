import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";
import { text, select, boolean } from "@storybook/addon-knobs";

import DropButton from "./DropButton";
import Icon from "../Icon";

const list = [
  {
    label: "Option 1",
    action: action("clicked Option 1")
  },
  {
    label: "Option 2",
    action: action("clicked Option 2")
  },
  {
    label: "New tab",
    action: "https://google.com",
    newTab: true
  },
  { label: "same tab", action: "https://google.com", newTab: true },
  {
    label: "Interested",
    checked: true,
    action: action("Interested"),
    hoverLabel: (
      <Fragment>
        Undo
        <Icon icon="replay" shape="circle" />
      </Fragment>
    ),
    hoverAction: action("clicked Undo")
  }
];

export default {
  title: "DropButton"
};

export const Default = () => {
  const positionProp =
    select("Position", [null, "top", "right", "left", "bottom"], null) ||
    undefined;
  const alignProp =
    select("Alignment", [null, "center", "right", "left"], null) || undefined;
  const variantProp =
    select("Variant", [null, "ghost", "archived", "scheduled"], null) ||
    undefined;
  const clickToShow = boolean("Click to Show", false);

  return (
    <DropButton
      options={list}
      position={positionProp}
      align={alignProp}
      variant={variantProp}
      clickToShow={clickToShow}
    >
      {clickToShow ? "Click to show" : "Hover to show"}
    </DropButton>
  );
};

Default.story = {
  name: "default"
};
