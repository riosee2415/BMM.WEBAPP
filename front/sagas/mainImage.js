import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MAINIMAGE_LIST_REQUEST,
  MAINIMAGE_LIST_SUCCESS,
  MAINIMAGE_LIST_FAILURE,
  //
  MAINIMAGE_CREATE_REQUEST,
  MAINIMAGE_CREATE_SUCCESS,
  MAINIMAGE_CREATE_FAILURE,
  //
  MAINIMAGE_UPDATE_REQUEST,
  MAINIMAGE_UPDATE_SUCCESS,
  MAINIMAGE_UPDATE_FAILURE,
  //
  MAINIMAGE_DELETE_REQUEST,
  MAINIMAGE_DELETE_SUCCESS,
  MAINIMAGE_DELETE_FAILURE,
  //
  MAINIMAGE_UPLOAD_REQUEST,
  MAINIMAGE_UPLOAD_SUCCESS,
  MAINIMAGE_UPLOAD_FAILURE,
  //
  MAINIMAGE_HISTORY_LIST_REQUEST,
  MAINIMAGE_HISTORY_LIST_SUCCESS,
  MAINIMAGE_HISTORY_LIST_FAILURE,
} from "../reducers/mainImage";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainImageListAPI(data) {
  return await axios.post(`/api/mainImage/list`, data);
}

function* mainImageList(action) {
  try {
    const result = yield call(mainImageListAPI, action.data);

    yield put({
      type: MAINIMAGE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAINIMAGE_LIST_FAILURE,
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
async function mainImageCreateAPI(data) {
  return await axios.post(`/api/mainImage/create`, data);
}

function* mainImageCreate(action) {
  try {
    const result = yield call(mainImageCreateAPI, action.data);

    yield put({
      type: MAINIMAGE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAINIMAGE_CREATE_FAILURE,
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
async function mainImageUpdateAPI(data) {
  return await axios.post(`/api/mainImage/update`, data);
}

function* mainImageUpdate(action) {
  try {
    const result = yield call(mainImageUpdateAPI, action.data);

    yield put({
      type: MAINIMAGE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAINIMAGE_UPDATE_FAILURE,
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
async function mainImageDeleteAPI(data) {
  return await axios.post(`/api/mainImage/delete`, data);
}

function* mainImageDelete(action) {
  try {
    const result = yield call(mainImageDeleteAPI, action.data);

    yield put({
      type: MAINIMAGE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAINIMAGE_DELETE_FAILURE,
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
async function mainImageImgAPI(data) {
  return await axios.post(`/api/mainImage/image`, data);
}

function* mainImageImg(action) {
  try {
    const result = yield call(mainImageImgAPI, action.data);

    yield put({
      type: MAINIMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAINIMAGE_UPLOAD_FAILURE,
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
async function mainImageHistoryListAPI(data) {
  return await axios.post(`/api/mainImage/history/list`, data);
}

function* mainImageHistoryList(action) {
  try {
    const result = yield call(mainImageHistoryListAPI, action.data);

    yield put({
      type: MAINIMAGE_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAINIMAGE_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMainImageList() {
  yield takeLatest(MAINIMAGE_LIST_REQUEST, mainImageList);
}
function* watchMainImageCreate() {
  yield takeLatest(MAINIMAGE_CREATE_REQUEST, mainImageCreate);
}
function* watchMainImageUpdate() {
  yield takeLatest(MAINIMAGE_UPDATE_REQUEST, mainImageUpdate);
}
function* watchMainImageDelete() {
  yield takeLatest(MAINIMAGE_DELETE_REQUEST, mainImageDelete);
}
function* watchMainImageUpload() {
  yield takeLatest(MAINIMAGE_UPLOAD_REQUEST, mainImageImg);
}
function* watchMainImageHistoryList() {
  yield takeLatest(MAINIMAGE_HISTORY_LIST_REQUEST, mainImageHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* mainImageSaga() {
  yield all([
    fork(watchMainImageList),
    fork(watchMainImageCreate),
    fork(watchMainImageUpdate),
    fork(watchMainImageDelete),
    fork(watchMainImageUpload),
    fork(watchMainImageHistoryList),

    //
  ]);
}
