import React from "react";
import { storiesOf } from "@storybook/react";
import { text, number, boolean, select } from "@storybook/addon-knobs";

import Stack from "./Stack";
import Button from "../Button";

storiesOf("Stack", module).add("default", () => {
  const hasRow = boolean("Row", false);

  return (
    <Stack row={hasRow}>
      <div>
        <p>Hi</p>
        <Button size="small">Hi</Button>
      </div>
      <div>
        <p>Hello</p>
        <Button size="small">Hello</Button>
      </div>
      <div>
        <p>Howdy</p>
        <Button size="small">Howdy</Button>
      </div>
    </Stack>
  );
});
