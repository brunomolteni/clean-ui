import React from "react";
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

export default {
  title: "BreadCrumb"
};

export const Default = () => <BreadCrumb options={options} />;

Default.story = {
  name: "default"
};
