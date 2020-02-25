import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";

export default ({ id, title, handleItemClick }) => {
  return (
    <Card>
      <span
        style={{ float: "left", width: "80%" }}
        onClick={() => handleItemClick(id)}
      >
        {title}
      </span>
      <span>
        <Link to={`/detail/${id}`}>More</Link>
      </span>
    </Card>
  );
};
