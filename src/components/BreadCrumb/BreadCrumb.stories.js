import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import BreadCrumb from "./BreadCrumb";

const options = [
  {
    label: "Home",
    url: "/home",
    key: 0
  },
  {
    label: "Section",
    url: "http://google.com",
    key: 1,
    newTab: true
  },
  {
    label: "Current",
    url: "http://google.com",
    key: 2
  },
  { label: "Software Developer", key: 3 }
];

storiesOf("BreadCrumb", module).add("default", () => (
  <BreadCrumb options={options} />
));
