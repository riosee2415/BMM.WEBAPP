import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  UP_LIST_REQUEST,
  UP_LIST_SUCCESS,
  UP_LIST_FAILURE,
  //
  UP_NEW_REQUEST,
  UP_NEW_SUCCESS,
  UP_NEW_FAILURE,
  //
  UP_UPDATE_REQUEST,
  UP_UPDATE_SUCCESS,
  UP_UPDATE_FAILURE,
  //
  UP_DEL_REQUEST,
  UP_DEL_SUCCESS,
  UP_DEL_FAILURE,
} from "../reducers/category";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function upListAPI(data) {
  return await axios.post(`/api/cate/up/list`, data);
}

function* upList(action) {
  try {
    const result = yield call(upListAPI, action.data);

    yield put({
      type: UP_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UP_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function upNewAPI(data) {
  return await axios.post(`/api/cate/up/new`, data);
}

function* upNew(action) {
  try {
    const result = yield call(upNewAPI, action.data);

    yield put({
      type: UP_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UP_NEW_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function upUpdateAPI(data) {
  return await axios.post(`/api/cate/up/update`, data);
}

function* upUpdate(action) {
  try {
    const result = yield call(upUpdateAPI, action.data);

    yield put({
      type: UP_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UP_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function upDelAPI(data) {
  return await axios.post(`/api/cate/up/delete`, data);
}

function* upDel(action) {
  try {
    const result = yield call(upDelAPI, action.data);

    yield put({
      type: UP_DEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UP_DEL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchUpList() {
  yield takeLatest(UP_LIST_REQUEST, upList);
}
function* watchUpNew() {
  yield takeLatest(UP_NEW_REQUEST, upNew);
}
function* watchUpUpdate() {
  yield takeLatest(UP_UPDATE_REQUEST, upUpdate);
}
function* watchUpDel() {
  yield takeLatest(UP_DEL_REQUEST, upDel);
}

//////////////////////////////////////////////////////////////
export default function* categorySaga() {
  yield all([
    fork(watchUpList),
    fork(watchUpNew),
    fork(watchUpUpdate),
    fork(watchUpDel),
    //
    //
  ]);
}
