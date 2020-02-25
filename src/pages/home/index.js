// src/pages/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoLists: []
    };
    this.counter = 100;
    console.log("Father constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("Father UNSAFE_componentWillMount");
  }

  UNSAFE_componentWillReceiveProps() {
    console.log("Father UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("Father shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("Father UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("Father componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("Father componentWillUnmount");
  }

  componentDidMount() {
    console.log("Father componentDidMount");
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => {
        console.log("Father fetch");
        this.setState(() => ({
          todoLists: res.data
        }));
      })
      .catch(e => console.log("获取数据失败"));
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
    console.log("Father render");
    const { inputValue, todoLists } = this.state;
    const styles = {
      paddingLeft: 0,
      width: 300,
      marginTop: 10
    };
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul style={styles}>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
