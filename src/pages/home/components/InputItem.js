// src/pages/home/components/InputItem.js
import React from "react";
import { Input, Button } from "antd";

export default class InputItem extends React.Component {
  constructor(props) {
    super(props);
    console.log("InputItem constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("InputItem UNSAFE_componentWillMount");
  }
  componentDidMount() {
    console.log("InputItem componentDidMount");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("InputItem UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("InputItem shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("InputItem UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("InputItem componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("InputItem componentWillUnmount");
  }
  render() {
    console.log("InputItem render");
    const { inputValue, handleSubmit, handleChange } = this.props;
    return (
      <div>
        <Input
          style={{
            width: 300
          }}
          value={inputValue}
          onChange={handleChange}
          placeholder="请输入新增list"
        />
        <Button onClick={handleSubmit} type="primary">
          提交
        </Button>
      </div>
    );
  }
}

// export default ({ inputValue, handleSubmit, handleChange }) => {
//   return (
//     <div>
//       <Input
//         style={{
//           width: 300
//         }}
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="请输入新增list"
//       />
//       <Button onClick={handleSubmit} type="primary">
//         提交
//       </Button>
//     </div>
//   );
// };
