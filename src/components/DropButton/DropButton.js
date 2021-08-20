import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import DropButtonItem from "./DropButtonItem";

import "./DropButton.scss";

const DropButton = props => {
  const [isOpen, toggleOpen] = useState(false);

  const {
    clickToShow,
    position,
    align,
    options,
    className,
    children,
    loading,
    ...rest
  } = props;
  let buttonClass = `DropButton ${`--${position}`} ${className || ""} `;
  if (clickToShow) buttonClass += "--clickable ";
  if (isOpen) buttonClass += "--open ";
  if (align === "right") buttonClass += "--right-aligned";
  if (align === "left") buttonClass += "--left-aligned";

  return (
    <div className={buttonClass}>
      <Button
        {...rest}
        loading={loading}
        doNotDebounce
        onClick={
          clickToShow
            ? () => {
                toggleOpen(open => !open);
              }
            : null
        }
        onBlur={
          clickToShow
            ? () => setTimeout(toggleOpen.bind(this), 200, false)
            : null
        }
      >
        {children}
      </Button>
      <nav className={`DropButton__list ${loading ? "loading-cursor" : ""}`}>
        {options.map(
          ({
            action,
            label,
            hoverAction,
            hoverLabel,
            newTab,
            checked,
            target
          }) => {
            const preventActionTriggerWhileLoading = () => {};
            return (
              <DropButtonItem
                action={loading ? preventActionTriggerWhileLoading : action}
                label={label}
                hoverAction={hoverAction}
                hoverLabel={hoverLabel}
                newTab={newTab}
                target={target}
                key={label.props ? label.props.children : label}
                checked={checked}
              />
            );
          }
        )}
      </nav>
    </div>
  );
};
DropButton.displayName = "DropButton";
DropButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      action: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      hoverLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      hoverAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    })
  ).isRequired,
  clickToShow: PropTypes.bool,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  align: PropTypes.oneOf(["center", "left", "right"]),
  ...Button.propTypes
};
DropButton.defaultProps = {
  clickToShow: false,
  position: "bottom",
  align: "center",
  ...Button.defaultProps
};

export default DropButton;
