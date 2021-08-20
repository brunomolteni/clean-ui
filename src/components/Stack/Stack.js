import React from "react";
import PropTypes from "prop-types";
import "./Stack.scss";

const Stack = props => {
  let classes = ["Stack"];
  if (props.row) classes.push("--row");
  if (props.className) classes.push(props.className);
  return <div className={classes.join(" ")}>{props.children}</div>;
};
Stack.displayName = "Stack";
Stack.propTypes = {
  row: PropTypes.bool
};
Stack.defaultProps = {
  row: false
};

export default Stack;
