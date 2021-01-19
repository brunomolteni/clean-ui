import React from "react";
import { storiesOf } from "@storybook/react";

import Modal from "./Modal";

storiesOf("Modal", module)
  .add("default", () => <Modal>Hi!</Modal>)
  .add("small", () => <Modal size="small">Hi!</Modal>)
  .add("tiny", () => <Modal size="tiny">Hi!</Modal>)
  .add("loading", () => <Modal loading>Hi!</Modal>)
  .add("loading with description", () => (
    <Modal loading description="Fetching stuff...">
      Hi!
    </Modal>
  ));
