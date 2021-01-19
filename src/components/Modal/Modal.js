import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

if (process.env.WEBPACK) require("./Modal.scss");

const Modal = ({
  children,
  closeModal,
  size,
  scroll,
  className,
  loading,
  description
}) =>
  ReactDOM.createPortal(
    <div
      className={`ModalContainer ${className} ${size ? `--${size}-size` : ""} ${
        scroll ? "--scrollable" : ""
      } ${loading ? "--loading --tiny-size" : ""}`}
    >
      <div className="Modal">
        {loading ? <Spinner description={description} /> : children}
      </div>
      <i className="ModalOverlay" onClick={closeModal} />
    </div>,
    document.body
  );

Modal.displayName = "Modal";
Modal.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  size: PropTypes.string,
  scroll: PropTypes.bool,
  loading: PropTypes.bool
};
Modal.defaultProps = {
  className: "",
  size: undefined,
  scroll: false,
  loading: false
};

export default Modal;
