import React from "react";
import PropTypes from "prop-types";

const ThreadActionItem = ({
  icon,
  count,
  onClick,
  isClickable = true,
  isActive = false,
  activeColor = "#1e88e5",
}) => {
  const Icon = icon;

  const itemStyle = {
    display: "inline-flex",
    alignItems: "center",
    marginRight: "12px",
    cursor: isClickable ? "pointer" : "default",
    transition: "color 0.2s ease",
    color: isActive ? activeColor : "inherit",
  };

  return (
    <span
      className={`thread-action-item ${isClickable ? "clickable" : ""} ${
        isActive ? "active" : ""
      }`}
      onClick={isClickable ? onClick : undefined}
      style={itemStyle}
    >
      <Icon
        size={16}
        style={{
          marginRight: "4px",
          color: isActive ? activeColor : "inherit",
        }}
      />
      {count}
    </span>
  );
};

ThreadActionItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
  isClickable: PropTypes.bool,
  isActive: PropTypes.bool,
  activeColor: PropTypes.string,
};

export default ThreadActionItem;
