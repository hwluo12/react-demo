import React from "react";
import { Input, Button } from "antd";

export default ({ inputValue, handleSubmit, handleChange }) => {
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
};
