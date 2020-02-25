import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";
import { connect } from "react-redux";
import * as ActionCreators from "../../store/actionCreators";

class Home extends React.PureComponent {
  componentDidMount() {
    this.props.fetchData();
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
    dispatch(ActionCreators.handleChangeAction(inputValue));
  },
  handleSubmit() {
    dispatch(ActionCreators.handleSubmitAction());
  },
  handleItemClick(id) {
    dispatch(ActionCreators.handleItemClickAction(id));
  },
  getInitData(data) {
    dispatch(ActionCreators.getInitDataAction(data));
  },
  fetchData() {
    dispatch(ActionCreators.fetchData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
