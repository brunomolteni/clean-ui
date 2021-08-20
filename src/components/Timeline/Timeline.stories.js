import React from "react";
import { action } from "@storybook/addon-actions";

import Timeline from "./Timeline";

const companies = [
  {
    id: 242,
    long_display_name: "Freelance",
    current: true,
    position: "React consultant",
    start_date: "2016-07-01 00:00:00",
    end_date: "",
    detail: "Consultant on ReactJs",
    highlight: true
  },
  {
    id: 10,
    long_display_name: "Pixable",
    current: false,
    position: "Head of PropTypes",
    start_date: "2016-08-01 00:00:00",
    end_date: "2017-02-01 00:00:00",
    detail: "Architect of Props in React components",
    highlight: false
  }
];

const schools = [
  {
    degree: "Mba",
    end_date: "2012",
    field_of_study: "",
    id: 23,
    long_display_name:
      "Massachusetts Institute of Technology - Sloan School of Management",
    score: 1,
    start_date: "2011"
  },
  {
    degree: "Bachelor's Degree",
    end_date: "2009",
    field_of_study: "Telecommunications Engineering",
    id: 1068,
    long_display_name: "Universidad Catolica Andres Bello",
    score: 1,
    start_date: "2005"
  }
];

export default {
  title: "Timeline"
};

export const Experience = () => <Timeline items={companies} />;

Experience.story = {
  name: "experience"
};

export const Education = () => (
  <Timeline items={schools} colorClass="light-gray" />
);

Education.story = {
  name: "education"
};
