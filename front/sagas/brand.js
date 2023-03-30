import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAILURE,
  //
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_CREATE_FAILURE,
  //
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAILURE,
  //
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAILURE,
  //
  BRAND_UPLOAD_REQUEST,
  BRAND_UPLOAD_SUCCESS,
  BRAND_UPLOAD_FAILURE,
  //
  BRAND_HISTORY_LIST_REQUEST,
  BRAND_HISTORY_LIST_SUCCESS,
  BRAND_HISTORY_LIST_FAILURE,
} from "../reducers/brand";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function brandListAPI(data) {
  return await axios.post(`/api/brand/list`, data);
}

function* brandList(action) {
  try {
    const result = yield call(brandListAPI, action.data);

    yield put({
      type: BRAND_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BRAND_LIST_FAILURE,
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
async function brandCreateAPI(data) {
  return await axios.post(`/api/brand/create`, data);
}

function* brandCreate(action) {
  try {
    const result = yield call(brandCreateAPI, action.data);

    yield put({
      type: BRAND_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BRAND_CREATE_FAILURE,
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
async function brandUpdateAPI(data) {
  return await axios.post(`/api/brand/update`, data);
}

function* brandUpdate(action) {
  try {
    const result = yield call(brandUpdateAPI, action.data);

    yield put({
      type: BRAND_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BRAND_UPDATE_FAILURE,
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
async function brandDeleteAPI(data) {
  return await axios.post(`/api/brand/delete`, data);
}

function* brandDelete(action) {
  try {
    const result = yield call(brandDeleteAPI, action.data);

    yield put({
      type: BRAND_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BRAND_DELETE_FAILURE,
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
async function brandImgAPI(data) {
  return await axios.post(`/api/brand/image`, data);
}

function* brandImg(action) {
  try {
    const result = yield call(brandImgAPI, action.data);

    yield put({
      type: BRAND_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BRAND_UPLOAD_FAILURE,
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
async function brandHistoryListAPI(data) {
  return await axios.post(`/api/brand/history/list`, data);
}

function* brandHistoryList(action) {
  try {
    const result = yield call(brandHistoryListAPI, action.data);

    yield put({
      type: BRAND_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BRAND_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchBrandList() {
  yield takeLatest(BRAND_LIST_REQUEST, brandList);
}
function* watchBrandCreate() {
  yield takeLatest(BRAND_CREATE_REQUEST, brandCreate);
}
function* watchBrandUpdate() {
  yield takeLatest(BRAND_UPDATE_REQUEST, brandUpdate);
}
function* watchBrandDelete() {
  yield takeLatest(BRAND_DELETE_REQUEST, brandDelete);
}
function* watchBrandUpload() {
  yield takeLatest(BRAND_UPLOAD_REQUEST, brandImg);
}
function* watchBrandHistoryList() {
  yield takeLatest(BRAND_HISTORY_LIST_REQUEST, brandHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* brandSaga() {
  yield all([
    fork(watchBrandList),
    fork(watchBrandCreate),
    fork(watchBrandUpdate),
    fork(watchBrandDelete),
    fork(watchBrandUpload),
    fork(watchBrandHistoryList),

    //
  ]);
}
