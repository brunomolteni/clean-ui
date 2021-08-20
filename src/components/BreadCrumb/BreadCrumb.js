import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

import "./BreadCrumb.scss";

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
                <a href={option.url}>
                  <b>{option.label}</b>
                </a>
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
