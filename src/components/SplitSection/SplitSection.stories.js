import React from "react";
import { action } from "@storybook/addon-actions";

import Button from "../Button";

import SplitSection from "./SplitSection";

const button = (
  <Button variant="ghost" size="small">
    Action
  </Button>
);
const link = <a href="#">Link</a>;

export default {
  title: "SplitSection"
};

export const Default = () => (
  <SplitSection action={button}>Here's some text</SplitSection>
);

Default.story = {
  name: "default"
};

export const WithLogo = () => (
  <SplitSection
    logo="https://cdn.iconscout.com/icon/free/png-256/ghostbusters-282377.png"
    action={button}
  >
    Here's some text
  </SplitSection>
);

WithLogo.story = {
  name: "with Logo"
};

export const WithLink = () => (
  <SplitSection
    logo="https://cdn.iconscout.com/icon/free/png-256/ghostbusters-282377.png"
    action={button}
    link={link}
  >
    Here's some text
  </SplitSection>
);

WithLink.story = {
  name: "with Link"
};
