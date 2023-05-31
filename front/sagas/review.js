import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MY_REVIEW_REQUEST,
  MY_REVIEW_SUCCESS,
  MY_REVIEW_FAILURE,
  //
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAILURE,
  //
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAILURE,
  //
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAILURE,
  //
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAILURE,
  //
  REVIEW_IMAGE1_UPLOAD_REQUEST,
  REVIEW_IMAGE1_UPLOAD_SUCCESS,
  REVIEW_IMAGE1_UPLOAD_FAILURE,
} from "../reducers/review";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function myReviewListAPI(data) {
  return await axios.post(`/api/review/my/list`, data);
}

function* myReviewList(action) {
  try {
    const result = yield call(myReviewListAPI, action.data);

    yield put({
      type: MY_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_REVIEW_FAILURE,
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
async function productReviewListAPI(data) {
  return await axios.post(`/api/review/product/list`, data);
}

function* productReviewList(action) {
  try {
    const result = yield call(productReviewListAPI, action.data);

    yield put({
      type: PRODUCT_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_REVIEW_FAILURE,
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
async function reviewCreateAPI(data) {
  return await axios.post(`/api/review/create`, data);
}

function* reviewCreate(action) {
  try {
    const result = yield call(reviewCreateAPI, action.data);

    yield put({
      type: REVIEW_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_CREATE_FAILURE,
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
async function reviewUpdateAPI(data) {
  return await axios.post(`/api/review/update`, data);
}

function* reviewUpdate(action) {
  try {
    const result = yield call(reviewUpdateAPI, action.data);

    yield put({
      type: REVIEW_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_UPDATE_FAILURE,
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
async function reviewImage1UploadAPI(data) {
  return await axios.post(`/api/review/image`, data);
}

function* reviewImage1Upload(action) {
  try {
    const result = yield call(reviewImage1UploadAPI, action.data);

    yield put({
      type: REVIEW_IMAGE1_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_IMAGE1_UPLOAD_FAILURE,
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
async function reviewDeleteAPI(data) {
  return await axios.post(`/api/review/delete`, data);
}

function* reviewDelete(action) {
  try {
    const result = yield call(reviewDeleteAPI, action.data);

    yield put({
      type: REVIEW_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
//////////////////////////////////////////////////////////////
function* watchmyReviewList() {
  yield takeLatest(MY_REVIEW_REQUEST, myReviewList);
}
function* watchProductReviewList() {
  yield takeLatest(PRODUCT_REVIEW_REQUEST, productReviewList);
}
function* watchreviewCreate() {
  yield takeLatest(REVIEW_CREATE_REQUEST, reviewCreate);
}
function* watchreviewUpdate() {
  yield takeLatest(REVIEW_UPDATE_REQUEST, reviewUpdate);
}
function* watchreviewDelete() {
  yield takeLatest(REVIEW_DELETE_REQUEST, reviewDelete);
}
function* watchreviewImage1Upload() {
  yield takeLatest(REVIEW_IMAGE1_UPLOAD_REQUEST, reviewImage1Upload);
}

//////////////////////////////////////////////////////////////
export default function* reviewSaga() {
  yield all([
    fork(watchmyReviewList),
    fork(watchProductReviewList),
    fork(watchreviewCreate),
    fork(watchreviewUpdate),
    fork(watchreviewDelete),
    fork(watchreviewImage1Upload),

    //
  ]);
}
