import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_LIST_FAILURE,
  //
  REQUEST_MY_LIST_REQUEST,
  REQUEST_MY_LIST_SUCCESS,
  REQUEST_MY_LIST_FAILURE,
  //
  REQUEST_ADMIN_LIST_REQUEST,
  REQUEST_ADMIN_LIST_SUCCESS,
  REQUEST_ADMIN_LIST_FAILURE,
  //
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAILURE,
  //
  REQUEST_ANSWER_UPDATE_REQUEST,
  REQUEST_ANSWER_UPDATE_SUCCESS,
  REQUEST_ANSWER_UPDATE_FAILURE,
  //
  REQUEST_LIST_DETAIL_REQUEST,
  REQUEST_LIST_DETAIL_SUCCESS,
  REQUEST_LIST_DETAIL_FAILURE,
} from "../reducers/request";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function requestListAPI(data) {
  return await axios.post(`/api/productQuestion/list`, data);
}

function* requestList(action) {
  try {
    const result = yield call(requestListAPI, action.data);

    yield put({
      type: REQUEST_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REQUEST_LIST_FAILURE,
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
async function requestMyListAPI(data) {
  return await axios.post(`/api/productQuestion/my/list`, data);
}

function* requestMyList(action) {
  try {
    const result = yield call(requestMyListAPI, action.data);

    yield put({
      type: REQUEST_MY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REQUEST_MY_LIST_FAILURE,
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
async function requestListDetailAPI(data) {
  return await axios.post(`/api/productQuestion/detail`, data);
}

function* requestListDetail(action) {
  try {
    const result = yield call(requestListDetailAPI, action.data);

    yield put({
      type: REQUEST_LIST_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REQUEST_LIST_DETAIL_FAILURE,
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
async function requestAdminListAPI(data) {
  return await axios.post(`/api/productQuestion/admin/list`, data);
}

function* requestAdminList(action) {
  try {
    const result = yield call(requestAdminListAPI, action.data);

    yield put({
      type: REQUEST_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REQUEST_ADMIN_LIST_FAILURE,
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
async function requestCreateAPI(data) {
  return await axios.post(`/api/productQuestion/create`, data);
}

function* requestCreate(action) {
  try {
    const result = yield call(requestCreateAPI, action.data);

    yield put({
      type: REQUEST_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REQUEST_CREATE_FAILURE,
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
async function answerUpdateAPI(data) {
  return await axios.post(`/api/productQuestion/answer/update`, data);
}

function* answerUpdate(action) {
  try {
    const result = yield call(answerUpdateAPI, action.data);

    yield put({
      type: REQUEST_ANSWER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REQUEST_ANSWER_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchrequestList() {
  yield takeLatest(REQUEST_LIST_REQUEST, requestList);
}
function* watchrequestMyList() {
  yield takeLatest(REQUEST_MY_LIST_REQUEST, requestMyList);
}
function* watchrequestListDetail() {
  yield takeLatest(REQUEST_LIST_DETAIL_REQUEST, requestListDetail);
}
function* watchrequestAdminList() {
  yield takeLatest(REQUEST_ADMIN_LIST_REQUEST, requestAdminList);
}
function* watchrequestCreate() {
  yield takeLatest(REQUEST_CREATE_REQUEST, requestCreate);
}
function* watchrequestAnswerUpdate() {
  yield takeLatest(REQUEST_ANSWER_UPDATE_REQUEST, answerUpdate);
}

//////////////////////////////////////////////////////////////
export default function* requestSaga() {
  yield all([
    fork(watchrequestList),
    fork(watchrequestMyList),
    fork(watchrequestListDetail),
    fork(watchrequestAdminList),
    fork(watchrequestCreate),
    fork(watchrequestAnswerUpdate),

    //
  ]);
}
