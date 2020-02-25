import React from "react";
import { useParams } from "react-router-dom";
export default props => {
  const params = useParams();
  console.log(params);
  return <div>detail - {params.id}</div>;
};
