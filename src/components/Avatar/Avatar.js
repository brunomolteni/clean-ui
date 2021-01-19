import React, { Component } from "react";
import PropTypes from "prop-types";
if (process.env.WEBPACK) require("./Avatar.scss");

class Avatar extends Component {
  state = {
    brokenImage: false
  };

  render() {
    const { size, src, className, alt, initials, ...rest } = this.props;

    let classes = "Avatar";
    if (size === "big") {
      classes += " --big";
    } else if (size === "medium") {
      classes += " --medium";
    } else if (size === "small") {
      classes += " --small";
    }
    if (!src || this.state.brokenImage) classes += " --initials";
    if (className) classes += " " + className;

    let computedInitials = alt
      ? alt
          .split(" ")
          .map(word => word[0])
          .join("")
          .toUpperCase()
      : "";

    return src && !this.state.brokenImage ? (
      <img
        onError={this.setBrokenImage}
        className={classes}
        src={src}
        alt={alt}
        title={alt}
        {...rest}
      />
    ) : (
      <div className={classes} title={alt} {...rest}>
        <span>{initials ? initials : computedInitials}</span>
      </div>
    );
  }

  setBrokenImage = () => {
    this.setState({ brokenImage: true });
  };
}

Avatar.displayName = "Avatar";
Avatar.propTypes = {
  size: PropTypes.oneOf(["big", "medium", "small"]),
  src: PropTypes.string,
  alt: PropTypes.string,
  initials: PropTypes.string
};
Avatar.defaultProps = {};

export default Avatar;
