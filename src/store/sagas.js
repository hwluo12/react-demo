import { getInitDataAction } from "./actionCreators";
import { put, takeEvery } from "redux-saga/effects";

function* fetchUser(action) {
  try {
    const res = yield fetch("/api/lists.json").then(response =>
      response.json()
    );
    yield put(getInitDataAction(res.data));
  } catch (e) {
    console.log("请求失败", e);
  }
}

function* mySaga() {
  yield takeEvery("FETCH_REQUESTED", fetchUser);
}

export default mySaga;
