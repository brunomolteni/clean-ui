import React from "react";
import PropTypes from "prop-types";
if (process.env.WEBPACK) require("./Tag.scss");
import Icon from "../Icon";

const Tag = props => {
  const {
    checked,
    positive,
    negative,
    color,
    small,
    tiny,
    children,
    className,
    ...rest
  } = props;
  const classes = ["Tag"];

  if (color) classes.push(`--${color}`);
  if (checked) classes.push("--checked");
  if (positive) classes.push("--positive");
  if (negative) classes.push("--negative");
  if (tiny) classes.push("--tiny");
  if (className) classes.push(className);

  return (
    <li className={classes.join(" ")} {...rest}>
      {checked && <Icon icon="check" type="air" />}
      {children}
    </li>
  );
};
Tag.displayName = "Tag";
Tag.propTypes = {
  checked: PropTypes.bool,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  tiny: PropTypes.bool,
  small: PropTypes.bool,
  color: PropTypes.oneOf(["blue", "green", "yellow", "orange", "gray", ""]),
  className: PropTypes.string
};
Tag.defaultProps = {
  checked: false,
  positive: false,
  negative: false,
  tiny: false,
  small: false,
  color: "",
  className: ""
};

export default Tag;
