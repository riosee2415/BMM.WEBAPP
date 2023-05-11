import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SEARCHTAG_LIST_REQUEST,
  SEARCHTAG_LIST_SUCCESS,
  SEARCHTAG_LIST_FAILURE,
  //
  SEARCHTAG_CREATE_REQUEST,
  SEARCHTAG_CREATE_SUCCESS,
  SEARCHTAG_CREATE_FAILURE,
  //
  SEARCHTAG_UPDATE_REQUEST,
  SEARCHTAG_UPDATE_SUCCESS,
  SEARCHTAG_UPDATE_FAILURE,
  //
  SEARCHTAG_DELETE_REQUEST,
  SEARCHTAG_DELETE_SUCCESS,
  SEARCHTAG_DELETE_FAILURE,
  //
  SEARCHTAG_HISTORY_LIST_REQUEST,
  SEARCHTAG_HISTORY_LIST_SUCCESS,
  SEARCHTAG_HISTORY_LIST_FAILURE,
} from "../reducers/searchTag";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function searchTagListAPI(data) {
  return await axios.post(`/api/searchTag/list`, data);
}

function* searchTagList(action) {
  try {
    const result = yield call(searchTagListAPI, action.data);

    yield put({
      type: SEARCHTAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCHTAG_LIST_FAILURE,
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
async function searchTagCreateAPI(data) {
  return await axios.post(`/api/searchTag/create`, data);
}

function* searchTagCreate(action) {
  try {
    const result = yield call(searchTagCreateAPI, action.data);

    yield put({
      type: SEARCHTAG_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCHTAG_CREATE_FAILURE,
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
async function searchTagUpdateAPI(data) {
  return await axios.post(`/api/searchTag/update`, data);
}

function* searchTagUpdate(action) {
  try {
    const result = yield call(searchTagUpdateAPI, action.data);

    yield put({
      type: SEARCHTAG_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCHTAG_UPDATE_FAILURE,
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
async function searchTagDeleteAPI(data) {
  return await axios.post(`/api/searchTag/delete`, data);
}

function* searchTagDelete(action) {
  try {
    const result = yield call(searchTagDeleteAPI, action.data);

    yield put({
      type: SEARCHTAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCHTAG_DELETE_FAILURE,
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
async function searchTagHistoryListAPI(data) {
  return await axios.post(`/api/searchTag/history/list`, data);
}

function* searchTagHistoryList(action) {
  try {
    const result = yield call(searchTagHistoryListAPI, action.data);

    yield put({
      type: SEARCHTAG_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCHTAG_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchSearchList() {
  yield takeLatest(SEARCHTAG_LIST_REQUEST, searchTagList);
}
function* watchSearchCreate() {
  yield takeLatest(SEARCHTAG_CREATE_REQUEST, searchTagCreate);
}
function* watchSearchUpdate() {
  yield takeLatest(SEARCHTAG_UPDATE_REQUEST, searchTagUpdate);
}
function* watchSearchDelete() {
  yield takeLatest(SEARCHTAG_DELETE_REQUEST, searchTagDelete);
}
function* watchSearchHistoryList() {
  yield takeLatest(SEARCHTAG_HISTORY_LIST_REQUEST, searchTagHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* searchTagSaga() {
  yield all([
    fork(watchSearchList),
    fork(watchSearchCreate),
    fork(watchSearchUpdate),
    fork(watchSearchDelete),
    fork(watchSearchHistoryList),

    //
  ]);
}
