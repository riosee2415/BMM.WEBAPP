import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAILURE,
  //
  EVENT_ADMIN_LIST_REQUEST,
  EVENT_ADMIN_LIST_SUCCESS,
  EVENT_ADMIN_LIST_FAILURE,
  //
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAILURE,
  //
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAILURE,
  //
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAILURE,
  //
  EVENT_UPLOAD1_REQUEST,
  EVENT_UPLOAD1_SUCCESS,
  EVENT_UPLOAD1_FAILURE,
  //
  EVENT_UPLOAD2_REQUEST,
  EVENT_UPLOAD2_SUCCESS,
  EVENT_UPLOAD2_FAILURE,
  //
  EVENT_DETAIL_REQUEST,
  EVENT_DETAIL_SUCCESS,
  EVENT_DETAIL_FAILURE,
  //
  EVENT_HISTORY_LIST_REQUEST,
  EVENT_HISTORY_LIST_SUCCESS,
  EVENT_HISTORY_LIST_FAILURE,
} from "../reducers/event";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function eventListAPI(data) {
  return await axios.post(`/api/event/list`, data);
}

function* eventList(action) {
  try {
    const result = yield call(eventListAPI, action.data);

    yield put({
      type: EVENT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_LIST_FAILURE,
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
async function eventAdminListAPI(data) {
  return await axios.post(`/api/event/admin/list`, data);
}

function* eventAdminList(action) {
  try {
    const result = yield call(eventAdminListAPI, action.data);

    yield put({
      type: EVENT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_ADMIN_LIST_FAILURE,
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
async function eventCreateAPI(data) {
  return await axios.post(`/api/event/create`, data);
}

function* eventCreate(action) {
  try {
    const result = yield call(eventCreateAPI, action.data);

    yield put({
      type: EVENT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_CREATE_FAILURE,
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
async function eventUpdateAPI(data) {
  return await axios.post(`/api/event/update`, data);
}

function* eventUpdate(action) {
  try {
    const result = yield call(eventUpdateAPI, action.data);

    yield put({
      type: EVENT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_UPDATE_FAILURE,
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
async function eventDeleteAPI(data) {
  return await axios.post(`/api/event/delete`, data);
}

function* eventDelete(action) {
  try {
    const result = yield call(eventDeleteAPI, action.data);

    yield put({
      type: EVENT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_DELETE_FAILURE,
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
async function eventImg1API(data) {
  return await axios.post(`/api/event/image`, data);
}

function* eventImg1(action) {
  try {
    const result = yield call(eventImg1API, action.data);

    yield put({
      type: EVENT_UPLOAD1_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_UPLOAD1_FAILURE,
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
async function eventImg2API(data) {
  return await axios.post(`/api/event/image`, data);
}

function* eventImg2(action) {
  try {
    const result = yield call(eventImg2API, action.data);

    yield put({
      type: EVENT_UPLOAD2_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_UPLOAD2_FAILURE,
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
async function eventDetailAPI(data) {
  return await axios.post(`/api/event/detail`, data);
}

function* eventDetail(action) {
  try {
    const result = yield call(eventDetailAPI, action.data);

    yield put({
      type: EVENT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_DETAIL_FAILURE,
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
async function eventHistoryListAPI(data) {
  return await axios.post(`/api/event/history/list`, data);
}

function* eventHistoryList(action) {
  try {
    const result = yield call(eventHistoryListAPI, action.data);

    yield put({
      type: EVENT_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchEventList() {
  yield takeLatest(EVENT_LIST_REQUEST, eventList);
}
function* watchEventAdminList() {
  yield takeLatest(EVENT_ADMIN_LIST_REQUEST, eventAdminList);
}
function* watchEventCreate() {
  yield takeLatest(EVENT_CREATE_REQUEST, eventCreate);
}
function* watchEventUpdate() {
  yield takeLatest(EVENT_UPDATE_REQUEST, eventUpdate);
}
function* watchEventDelete() {
  yield takeLatest(EVENT_DELETE_REQUEST, eventDelete);
}
function* watchEventUpload1() {
  yield takeLatest(EVENT_UPLOAD1_REQUEST, eventImg1);
}
function* watchEventUpload2() {
  yield takeLatest(EVENT_UPLOAD2_REQUEST, eventImg2);
}
function* watchEventDetail() {
  yield takeLatest(EVENT_DETAIL_REQUEST, eventDetail);
}
function* watchEventHistoryList() {
  yield takeLatest(EVENT_HISTORY_LIST_REQUEST, eventHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* eventSaga() {
  yield all([
    fork(watchEventList),
    fork(watchEventAdminList),
    fork(watchEventCreate),
    fork(watchEventUpdate),
    fork(watchEventDelete),
    fork(watchEventUpload1),
    fork(watchEventUpload2),
    fork(watchEventDetail),
    fork(watchEventHistoryList),

    //
  ]);
}
