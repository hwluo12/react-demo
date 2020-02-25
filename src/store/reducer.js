import * as CONSTANTS from "./constants";

const defaultState = {
  inputValue: "",
  todoLists: [],
  count: 100
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONSTANTS.CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload
      };
    case CONSTANTS.ADD_TODOLIST:
      const newTodoList = {
        id: state.count,
        title: state.inputValue
      };
      return {
        inputValue: "",
        todoLists: state.todoLists.concat(newTodoList),
        count: ++state.count
      };
    case CONSTANTS.DELETE_TODOLIST:
      const newTodoLists = state.todoLists.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        todoLists: newTodoLists
      };
    case CONSTANTS.INIT_TODOLISTS:
      return {
        ...state,
        todoLists: action.payload
      };
    default:
      return state;
  }
};
