// src/pages/home/components/Item.js
import React from "react";
import { Card } from "antd";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    console.log("Item constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("Item UNSAFE_componentWillMount");
  }
  componentDidMount() {
    console.log("Item componentDidMount");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("Item UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("Item shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("Item UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("Item componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("Item componentWillUnmount");
  }
  render() {
    console.log("Item render");
    const { id, title, handleItemClick } = this.props;
    return <Card onClick={() => handleItemClick(id)}>{title}</Card>;
  }
}

// export default ({ id, title, handleItemClick }) => {
//   return <Card onClick={() => handleItemClick(id)}>{title}</Card>;
// };
