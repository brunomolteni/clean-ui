import React, { useState } from "react";

import Modal from "./Modal";

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const StatefulModal = props =>
    isModalOpen ? (
      <Modal closeModal={() => setModalOpen(false)} {...props}>
        {props.children}
      </Modal>
    ) : null;
  const toggleModal = isOpen => {
    if (isOpen === true || isOpen === false) {
      setModalOpen(isOpen);
    } else {
      setModalOpen(!isModalOpen);
    }
  };

  return [StatefulModal, toggleModal];
};
