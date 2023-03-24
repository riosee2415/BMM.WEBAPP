import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADVERTISE_LIST_REQUEST,
  ADVERTISE_LIST_SUCCESS,
  ADVERTISE_LIST_FAILURE,
  //
  ADVERTISE_CREATE_REQUEST,
  ADVERTISE_CREATE_SUCCESS,
  ADVERTISE_CREATE_FAILURE,
  //
  ADVERTISE_UPDATE_REQUEST,
  ADVERTISE_UPDATE_SUCCESS,
  ADVERTISE_UPDATE_FAILURE,
  //
  ADVERTISE_DELETE_REQUEST,
  ADVERTISE_DELETE_SUCCESS,
  ADVERTISE_DELETE_FAILURE,
  //
  ADVERTISE_UPLOAD_REQUEST,
  ADVERTISE_UPLOAD_SUCCESS,
  ADVERTISE_UPLOAD_FAILURE,
  //
  ADVERTISE_HISTORY_LIST_REQUEST,
  ADVERTISE_HISTORY_LIST_SUCCESS,
  ADVERTISE_HISTORY_LIST_FAILURE,
} from "../reducers/advertise";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function advertiseListAPI(data) {
  return await axios.post(`/api/advertise/list`, data);
}

function* advertiseList(action) {
  try {
    const result = yield call(advertiseListAPI, action.data);

    yield put({
      type: ADVERTISE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADVERTISE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function advertiseCreateAPI(data) {
  return await axios.post(`/api/advertise/create`, data);
}

function* advertiseCreate(action) {
  try {
    const result = yield call(advertiseCreateAPI, action.data);

    yield put({
      type: ADVERTISE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADVERTISE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function advertiseUpdateAPI(data) {
  return await axios.post(`/api/advertise/update`, data);
}

function* advertiseUpdate(action) {
  try {
    const result = yield call(advertiseUpdateAPI, action.data);

    yield put({
      type: ADVERTISE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADVERTISE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function advertiseDeleteAPI(data) {
  return await axios.post(`/api/advertise/delete`, data);
}

function* advertiseDelete(action) {
  try {
    const result = yield call(advertiseDeleteAPI, action.data);

    yield put({
      type: ADVERTISE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADVERTISE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function advertiseImgAPI(data) {
  return await axios.post(`/api/advertise/image`, data);
}

function* advertiseImg(action) {
  try {
    const result = yield call(advertiseImgAPI, action.data);

    yield put({
      type: ADVERTISE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADVERTISE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function advertiseHistoryListAPI(data) {
  return await axios.post(`/api/advertise/history/list`, data);
}

function* advertiseHistoryList(action) {
  try {
    const result = yield call(advertiseHistoryListAPI, action.data);

    yield put({
      type: ADVERTISE_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADVERTISE_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchAdvertiseList() {
  yield takeLatest(ADVERTISE_LIST_REQUEST, advertiseList);
}
function* watchAdvertiseCreate() {
  yield takeLatest(ADVERTISE_CREATE_REQUEST, advertiseCreate);
}
function* watchAdvertiseUpdate() {
  yield takeLatest(ADVERTISE_UPDATE_REQUEST, advertiseUpdate);
}
function* watchAdvertiseDelete() {
  yield takeLatest(ADVERTISE_DELETE_REQUEST, advertiseDelete);
}
function* watchAdvertiseUpload() {
  yield takeLatest(ADVERTISE_UPLOAD_REQUEST, advertiseImg);
}
function* watchAdvertiseHistoryList() {
  yield takeLatest(ADVERTISE_HISTORY_LIST_REQUEST, advertiseHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* advertiseSaga() {
  yield all([
    fork(watchAdvertiseList),
    fork(watchAdvertiseCreate),
    fork(watchAdvertiseUpdate),
    fork(watchAdvertiseDelete),
    fork(watchAdvertiseUpload),
    fork(watchAdvertiseHistoryList),

    //
  ]);
}
