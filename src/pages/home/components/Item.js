import React from "react";
import { Card } from "antd";

export default ({ id, title, handleItemClick }) => {
  return <Card onClick={() => handleItemClick(id)}>{title}</Card>;
};
