import React from "react";

export default ({ id, title, handleItemClick }) => {
  return <li onClick={() => handleItemClick(id)}>{title}</li>;
};
