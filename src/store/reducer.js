const defaultState = {
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
  ],
  count: 100
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload
      };
    case "ADD_TODOLIST":
      const newTodoList = {
        id: state.count,
        title: state.inputValue
      };
      return {
        inputValue: "",
        todoLists: state.todoLists.concat(newTodoList),
        count: ++state.count
      };
    case "DELETE_TODOLIST":
      const newTodoLists = state.todoLists.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        todoLists: newTodoLists
      };
    case "INIT_TODOLISTS":
      return {
        ...state,
        todoLists: action.payload
      };
    default:
      return state;
  }
};
