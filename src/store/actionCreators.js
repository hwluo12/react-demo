import * as CONSTANTS from "./constants";

export const handleChangeAction = inputValue => ({
  type: CONSTANTS.CHANGE_INPUT_VALUE,
  payload: inputValue
});

export const handleSubmitAction = () => ({
  type: CONSTANTS.ADD_TODOLIST
});

export const handleItemClickAction = id => ({
  type: CONSTANTS.DELETE_TODOLIST,
  payload: id
});

export const getInitDataAction = data => ({
  type: CONSTANTS.INIT_TODOLISTS,
  payload: data
});

export const fetchData = () => {
  return dispatch => {
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => {
        console.log(res);
        dispatch(getInitDataAction(res.data));
      })
      .catch(e => console.log("获取数据失败"));
  };
};
