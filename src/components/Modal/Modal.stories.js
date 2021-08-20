import React from "react";

import Modal from "./Modal";

export default {
  title: "Modal"
};

export const Default = () => <Modal>Hi!</Modal>;

Default.story = {
  name: "default"
};

export const Small = () => <Modal size="small">Hi!</Modal>;

Small.story = {
  name: "small"
};

export const Tiny = () => <Modal size="tiny">Hi!</Modal>;

Tiny.story = {
  name: "tiny"
};

export const Loading = () => <Modal loading>Hi!</Modal>;

Loading.story = {
  name: "loading"
};

export const LoadingWithDescription = () => (
  <Modal loading description="Fetching stuff...">
    Hi!
  </Modal>
);

LoadingWithDescription.story = {
  name: "loading with description"
};
