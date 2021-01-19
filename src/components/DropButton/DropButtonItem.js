import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const DropButtonItem = ({
  action,
  label,
  hoverAction,
  hoverLabel,
  newTab,
  target,
  checked
}) => {
  const [isHovered, toggleHovered] = useState(false);

  const isAFunction = fn => typeof fn === "function";

  const itemProps = {
    className: isHovered && hoverLabel ? "hideDropButtonItem" : ""
  };
  if (isAFunction(action)) itemProps.onClick = action;
  if (!isAFunction(action)) itemProps.href = action;
  if (newTab) itemProps.target = target || "_self";

  const hoverItemProps = {
    className: !isHovered && hoverLabel ? "hideDropButtonItem" : ""
  };
  if (isAFunction(hoverAction)) hoverItemProps.onClick = hoverAction;
  if (!isAFunction(hoverAction)) hoverItemProps.href = hoverAction;
  if (newTab) hoverItemProps.target = target || "_self";

  if (isAFunction(action) || newTab) {
    return (
      <span
        className="DropButton__item tiny-text"
        key={label}
        onMouseEnter={() => toggleHovered(true)}
        onMouseLeave={() => toggleHovered(false)}
      >
        <a {...itemProps}>
          {label}
          {checked && <Icon icon="check" shape="circle" circleColor="green" />}
        </a>
        {hoverLabel && <a {...hoverItemProps}>{hoverLabel}</a>}
      </span>
    );
  }

  return (
    <span className="DropButton__item tiny-text">
      <Link to={action} {...itemProps} key={label}>
        {label}
      </Link>
    </span>
  );
};
DropButtonItem.displayName = "DropButtonItem";
DropButtonItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  hoverLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  hoverAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  newTab: PropTypes.bool,
  checked: PropTypes.bool,
  target: PropTypes.string
};
DropButtonItem.defaultProps = {
  label: null,
  action: null,
  hoverLabel: null,
  hoverAction: null,
  target: null,
  checked: null,
  newTab: null
};

export default DropButtonItem;
