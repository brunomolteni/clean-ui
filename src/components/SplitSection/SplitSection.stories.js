import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "../Button";

import SplitSection from "./SplitSection";

const button = (
  <Button variant="ghost" size="small">
    Action
  </Button>
);
const link = <a href="#">Link</a>;

storiesOf("SplitSection", module)
  .add("default", () => (
    <SplitSection action={button}>Here's some text</SplitSection>
  ))
  .add("with Logo", () => (
    <SplitSection
      logo="https://cdn.iconscout.com/icon/free/png-256/ghostbusters-282377.png"
      action={button}
    >
      Here's some text
    </SplitSection>
  ))
  .add("with Link", () => (
    <SplitSection
      logo="https://cdn.iconscout.com/icon/free/png-256/ghostbusters-282377.png"
      action={button}
      link={link}
    >
      Here's some text
    </SplitSection>
  ));
