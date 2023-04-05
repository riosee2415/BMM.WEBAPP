import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ALL_LIST_REQUEST,
  ALL_LIST_SUCCESS,
  ALL_LIST_FAILURE,
  //
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
  //
  DOWN_LIST_REQUEST,
  DOWN_LIST_SUCCESS,
  DOWN_LIST_FAILURE,
  //
  DOWN_NEW_REQUEST,
  DOWN_NEW_SUCCESS,
  DOWN_NEW_FAILURE,
  //
  DOWN_UPDATE_REQUEST,
  DOWN_UPDATE_SUCCESS,
  DOWN_UPDATE_FAILURE,
  //
  DOWN_DEL_REQUEST,
  DOWN_DEL_SUCCESS,
  DOWN_DEL_FAILURE,
} from "../reducers/category";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function allListAPI(data) {
  return await axios.post(`/api/cate/all`, data);
}

function* allList(action) {
  try {
    const result = yield call(allListAPI, action.data);

    yield put({
      type: ALL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ALL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function downListAPI(data) {
  return await axios.post(`/api/cate/down/list`, data);
}

function* downList(action) {
  try {
    const result = yield call(downListAPI, action.data);

    yield put({
      type: DOWN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DOWN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function downNewAPI(data) {
  return await axios.post(`/api/cate/down/new`, data);
}

function* downNew(action) {
  try {
    const result = yield call(downNewAPI, action.data);

    yield put({
      type: DOWN_NEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DOWN_NEW_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function downUpdateAPI(data) {
  return await axios.post(`/api/cate/down/update`, data);
}

function* downUpdate(action) {
  try {
    const result = yield call(downUpdateAPI, action.data);

    yield put({
      type: DOWN_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DOWN_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function downDelAPI(data) {
  return await axios.post(`/api/cate/down/delete`, data);
}

function* downDel(action) {
  try {
    const result = yield call(downDelAPI, action.data);

    yield put({
      type: DOWN_DEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DOWN_DEL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchAllList() {
  yield takeLatest(ALL_LIST_REQUEST, allList);
}
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
function* watchDownList() {
  yield takeLatest(DOWN_LIST_REQUEST, downList);
}
function* watchDownNew() {
  yield takeLatest(DOWN_NEW_REQUEST, downNew);
}
function* watchDownUpdate() {
  yield takeLatest(DOWN_UPDATE_REQUEST, downUpdate);
}
function* watchDownDel() {
  yield takeLatest(DOWN_DEL_REQUEST, downDel);
}

//////////////////////////////////////////////////////////////
export default function* categorySaga() {
  yield all([
    fork(watchAllList),
    fork(watchUpList),
    fork(watchUpNew),
    fork(watchUpUpdate),
    fork(watchUpDel),
    fork(watchDownList),
    fork(watchDownNew),
    fork(watchDownUpdate),
    fork(watchDownDel),
    //
    //
  ]);
}
