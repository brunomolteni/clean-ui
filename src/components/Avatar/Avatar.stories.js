import React from "react";
import { select, text, boolean } from "@storybook/addon-knobs";

import Avatar from "./Avatar";

export default {
  title: "Avatar"
};

export const Default = () => {
  const altProp = text("Name", "Bruno Molteni");
  const sizeProp = select("Size", [null, "big", "medium", "small"], null);
  const classProp = select("Custom Class", [null, "green-bg"], null);
  const srcProp = text(
    "Image Source",
    "https://avatars3.githubusercontent.com/u/1505325?s=160&v=4"
  );
  const hasImage = boolean("Has Image", true);

  return (
    <Avatar
      src={hasImage ? srcProp : ""}
      alt={altProp}
      size={sizeProp}
      className={classProp}
    />
  );
};

Default.story = {
  name: "default"
};
