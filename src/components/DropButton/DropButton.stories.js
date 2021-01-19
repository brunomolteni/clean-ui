import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select, boolean } from "@storybook/addon-knobs";

import DropButton from "./DropButton";
import Icon from "../Icon";

const list = [
  {
    label: "Option 1",
    action: action("clicked Option 1"),
    key: 1
  },
  {
    label: "Option 2",
    action: action("clicked Option 2"),
    key: 2
  },
  {
    label: "Option 3",
    action: action("clicked Option 3"),
    key: 3
  },
  {
    label: "New tab",
    action: "https://fetcher.ai",
    newTab: true,
    target: "_blank",
    key: 4
  },
  { label: "same tab", action: "https://fetcher.ai", newTab: true, key: 5 },
  {
    label: "Interested",
    checked: true,
    action: action("Interested"),
    hoverLabel: (
      <Fragment>
        Undo
        <Icon icon="replay" shape="circle" circleColor="blue-gray" />
      </Fragment>
    ),
    hoverAction: action("clicked Undo"),
    key: 5
  }
];

storiesOf("DropButton", module).add("default", () => {
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
});
