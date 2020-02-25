import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";
import { connect } from "react-redux";

class Home extends React.PureComponent {
  componentDidMount() {
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => this.props.getInitData(res.data))
      .catch(e => console.log("获取数据失败"));
  }

  handleChange = e => {
    this.props.handleChange(e.target.value);
  };

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  handleItemClick = id => {
    this.props.handleItemClick(id);
  };

  render() {
    const { inputValue, todoLists } = this.props;
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

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    todoLists: state.todoLists
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange(inputValue) {
    dispatch({
      type: "CHANGE_INPUT_VALUE",
      payload: inputValue
    });
  },
  handleSubmit() {
    dispatch({
      type: "ADD_TODOLIST"
    });
  },
  handleItemClick(id) {
    dispatch({
      type: "DELETE_TODOLIST",
      payload: id
    });
  },
  getInitData(data) {
    dispatch({
      type: "INIT_TODOLISTS",
      payload: data
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
