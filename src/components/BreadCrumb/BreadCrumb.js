import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../Icon";

if (process.env.WEBPACK) require("./BreadCrumb.scss");

const BreadCrumb = ({ options }) => {
  const lastIndex = options.length - 1;
  return (
    <div className="BreadCrumb">
      {options.map((option, i) => {
        const isLastIndex = i === lastIndex;
        return (
          <div key={option.key}>
            {isLastIndex ? (
              <span>{option.label}</span>
            ) : (
              <div>
                {option.newTab ? (
                  <a href={option.url}>
                    <b>{option.label}</b>
                  </a>
                ) : (
                  <Link to={option.url}>
                    <b>{option.label}</b>
                  </Link>
                )}
                <Icon icon="navigateright" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
BreadCrumb.displayName = "BreadCrumb";
BreadCrumb.propTypes = {
  options: PropTypes.array
};
BreadCrumb.defaultProps = {
  options: []
};

export default BreadCrumb;
