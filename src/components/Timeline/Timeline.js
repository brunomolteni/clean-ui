import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

if (process.env.WEBPACK) require("./Timeline.scss");

const Timeline = ({ items, color = "light-gray" }) => {
  return (
    <ul className="Timeline light-gray-border">
      {items.map(item => (
        <TimelineItem key={item.id} item={item} color={color} />
      ))}
    </ul>
  );
};

Timeline.displayName = "Timeline";
Timeline.propTypes = {
  color: PropTypes.string,
  items: PropTypes.array.isRequired
};
Timeline.defaultProps = {
  color: "light-gray"
};

export default Timeline;

const TimelineItem = ({ item, color }) => {
  item.start = parseDate(item.start_date);
  item.end = parseDate(item.end_date);

  return (
    <li className="Timeline__item">
      <span className={`Timeline__dot ${color}`}>●</span>
      {item.start && (
        <span className="Timeline__year blue-gray">
          {item.start &&
            `${item.start} - ${item.current == true ? "Present" : item.end}`}
        </span>
      )}
      <p className="h5">
        {item.highlight && <Icon icon="check" />}
        {item.position && `${item.position} at `}
        <b className="h5">{item.long_display_name}</b>
      </p>
      <div className="Timeline__detail">
        {item.detail &&
          item.detail.split("\n").map((text, i) => (
            <p className="d10" key={`${item.id}-${i}`}>
              {text}
            </p>
          ))}
      </div>
    </li>
  );
};

function parseDate(dateString) {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
  ];

  const date = new Date(dateString.replace(/\s/, "T"));
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}
