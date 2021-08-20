import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

import "./Icon.scss";

const Icon = props => {
  const { type, icon, className, align, loading, ...rest } = props;
  const classNames = `Icon ss-${type} ss-${icon} ${className}`;

  if (loading) {
    return <Spinner color size={20} width={5} className="--icon" />;
  }

  return <i {...rest} className={classNames} />;
};

Icon.displayName = "Icon";
Icon.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.oneOf(["air", "standard", "social"]),
  loading: PropTypes.bool,
  align: PropTypes.string,
  className: PropTypes.string
};

Icon.defaultProps = {
  icon: "link",
  type: "air",
  loading: false,
  align: "",
  className: ""
};

export default Icon;
