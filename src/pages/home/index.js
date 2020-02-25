// src/pages/home/index.js
import React from "react";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoLists: [
        {
          id: 0,
          title: "react"
        },
        {
          id: 1,
          title: "vue"
        },
        {
          id: 2,
          title: "angular"
        }
      ]
    };
    this.counter = 100;
  }

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      inputValue
    }));
  };

  handleSubmit = () => {
    const inputValue = this.state.inputValue;
    if (!inputValue.trim()) {
      return;
    }
    const item = {
      title: inputValue,
      id: ++this.counter
    };
    this.setState(prevState => {
      let newTodoLists = [...prevState.todoLists, item];
      return {
        todoLists: newTodoLists,
        inputValue: ""
      };
    });
  };

  handleItemClick = id => {
    this.setState(prevState => {
      return {
        todoLists: prevState.todoLists.filter(item => item.id !== id)
      };
    });
  };

  render() {
    const { inputValue, todoLists } = this.state;
    return (
      <div>
        <div>
          <input value={inputValue} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>提交</button>
        </div>
        <ul>
          {todoLists.map(item => (
            <li key={item.id} onClick={() => this.handleItemClick(item.id)}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
