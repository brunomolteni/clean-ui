import React from "react";
import PropTypes from "prop-types";

if (process.env.WEBPACK) require("./Spinner.scss");

const Spinner = props => {
  let classes = ["Spinner"];
  if (props.className) classes.push(props.className);
  if (!props.color) classes.push("blue");
  else classes.push(props.color);

  return (
    <span className={classes.join(" ")}>
      <span className="Spinner__loader">
        <svg
          width={props.size}
          height={props.size}
          viewBox="-5 -5 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id={props.key ? props.key : "a"}
            >
              <stop stopColor="currentColor" stopOpacity="0" offset="0%" />
              <stop
                stopColor="currentColor"
                stopOpacity=".631"
                offset="63.146%"
              />
              <stop stopColor="currentColor" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" id="spin">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                stroke={`url(#${props.key ? props.key : "a"})`}
                strokeWidth={props.width}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle fill="currentColor" cx="36" cy="18" r={props.width / 2}>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      </span>
      {props.description && (
        <span className="Spinner__description-text blue-gray">
          {props.description || ""}
        </span>
      )}
    </span>
  );
};
Spinner.displayName = "Spinner";
Spinner.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  width: PropTypes.number,
  size: PropTypes.number
};
Spinner.defaultProps = {
  color: null,
  width: 3,
  size: 60
};

export default Spinner;
