import React from "react";

export default ({ inputValue, handleSubmit, handleChange }) => {
  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
};
