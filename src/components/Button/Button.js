import React, { useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import Spinner from "../Spinner";

import "./Button.scss";

const Button = props => {
  let {
    size,
    variant,
    className,
    children,
    loading,
    onClick,
    doNotDebounce,
    ...rest
  } = props;
  let classes = "Button ";
  if (!variant || variant === "active") classes += "--active ";
  if (variant === "dark") classes += "--dark ";
  if (variant === "ghost") classes += "--ghost ";
  if (variant === "archived") classes += "--archived ";
  if (variant === "scheduled") classes += "--scheduled ";
  if (size === "small") classes += "--small ";
  if (size === "tiny") classes += "--tiny ";
  if (size === "big") classes += "--big ";
  if (loading) classes += "--loading ";
  if (className) classes += className;

  const debouncedOnClick = useCallback(
    debounce(
      (onClickFn, event) => {
        onClickFn(event);
      },
      500,
      { leading: true, trailing: false }
    ),
    []
  );

  const handleClick = event => {
    if (typeof onClick !== "function") return;
    if (doNotDebounce) {
      onClick(event);
    } else {
      debouncedOnClick(onClick, event);
    }
  };

  return (
    <button
      className={classes}
      type="button"
      onClick={e => handleClick(e)}
      {...rest}
    >
      {children}
      {loading && (
        <Spinner color size={size === "small" || size === "tiny" ? 16 : 30} />
      )}
    </button>
  );
};

Button.displayName = "Button";
Button.propTypes = {
  size: PropTypes.oneOf(["tiny", "small", "big"]),
  variant: PropTypes.oneOf([
    "ghost",
    "archived",
    "scheduled",
    "active",
    "dark"
  ]),
  loading: PropTypes.bool
};
Button.defaultProps = {
  size: null,
  variant: "active",
  loading: false
};

export default Button;
