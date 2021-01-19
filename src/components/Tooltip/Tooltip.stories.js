import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean, text } from "@storybook/addon-knobs";

import Tooltip from "./Tooltip";
import Icon from "../Icon";

storiesOf("Tooltip", module).add("default", () => {
  const tooltipText = text("Tooltip text", "Hi there!");
  const ContentText = text("Text", "Hover over Here");
  const showIcon = boolean("Show Icon", false);
  const positionProp = select(
    "Position",
    [
      "top",
      "right",
      "bottom",
      "left",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right"
    ],
    "top"
  );

  const lenghtProp = select(
    "Length",
    ["small", "medium", "large", "xlarge", "fit", null],
    undefined
  );

  return (
    <Tooltip text={tooltipText} position={positionProp} length={lenghtProp}>
      {showIcon ? <Icon /> : ContentText}
    </Tooltip>
  );
});
