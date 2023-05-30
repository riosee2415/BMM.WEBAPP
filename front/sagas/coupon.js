import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAILURE,
  //
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAILURE,
  //
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_FAILURE,
  //
  COUPON_GRANT_REQUEST,
  COUPON_GRANT_SUCCESS,
  COUPON_GRANT_FAILURE,
  //
  COUPON_SEARCH_REQUEST,
  COUPON_SEARCH_SUCCESS,
  COUPON_SEARCH_FAILURE,
  //
  COUPON_USE_REQUEST,
  COUPON_USE_SUCCESS,
  COUPON_USE_FAILURE,
  //
  COUPON_CHECK_REGIST_REQUEST,
  COUPON_CHECK_REGIST_SUCCESS,
  COUPON_CHECK_REGIST_FAILURE,
  //
  COUPON_REGIST_REQUEST,
  COUPON_REGIST_SUCCESS,
  COUPON_REGIST_FAILURE,
} from "../reducers/coupon";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function couponListAPI(data) {
  return await axios.post(`/api/cp/list`, data);
}

function* couponList(action) {
  try {
    const result = yield call(couponListAPI, action.data);

    yield put({
      type: COUPON_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_LIST_FAILURE,
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
async function couponCreateAPI(data) {
  return await axios.post(`/api/cp/new`, data);
}

function* couponCreate(action) {
  try {
    const result = yield call(couponCreateAPI, action.data);

    yield put({
      type: COUPON_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_CREATE_FAILURE,
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
async function couponDeleteAPI(data) {
  return await axios.post(`/api/cp/delete`, data);
}

function* couponDelete(action) {
  try {
    const result = yield call(couponDeleteAPI, action.data);

    yield put({
      type: COUPON_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_DELETE_FAILURE,
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
async function couponGrantAPI(data) {
  return await axios.post(`/api/cp/grant`, data);
}

function* couponGrant(action) {
  try {
    const result = yield call(couponGrantAPI, action.data);

    yield put({
      type: COUPON_GRANT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_GRANT_FAILURE,
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
async function couponSearchAPI(data) {
  return await axios.post(`/api/cp/search`, data);
}

function* couponSearch(action) {
  try {
    const result = yield call(couponSearchAPI, action.data);

    yield put({
      type: COUPON_SEARCH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_SEARCH_FAILURE,
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
async function couponUseAPI(data) {
  return await axios.post(`/api/cp/use`, data);
}

function* couponUse(action) {
  try {
    const result = yield call(couponUseAPI, action.data);

    yield put({
      type: COUPON_USE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_USE_FAILURE,
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
async function couponCheckRegistAPI(data) {
  return await axios.post(`/api/cp/check/number`, data);
}

function* couponCheckRegist(action) {
  try {
    const result = yield call(couponCheckRegistAPI, action.data);

    yield put({
      type: COUPON_CHECK_REGIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_CHECK_REGIST_FAILURE,
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
async function couponRegistAPI(data) {
  return await axios.post(`/api/cp/regist`, data);
}

function* couponRegist(action) {
  try {
    const result = yield call(couponRegistAPI, action.data);

    yield put({
      type: COUPON_REGIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUPON_REGIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchCouponList() {
  yield takeLatest(COUPON_LIST_REQUEST, couponList);
}
function* watchCouponCreate() {
  yield takeLatest(COUPON_CREATE_REQUEST, couponCreate);
}
function* watchCouponDelete() {
  yield takeLatest(COUPON_DELETE_REQUEST, couponDelete);
}
function* watchCouponGrant() {
  yield takeLatest(COUPON_GRANT_REQUEST, couponGrant);
}
function* watchCouponSearch() {
  yield takeLatest(COUPON_SEARCH_REQUEST, couponSearch);
}
function* watchCouponUse() {
  yield takeLatest(COUPON_USE_REQUEST, couponUse);
}
function* watchCouponCheckRegist() {
  yield takeLatest(COUPON_CHECK_REGIST_REQUEST, couponCheckRegist);
}
function* watchCouponRegist() {
  yield takeLatest(COUPON_REGIST_REQUEST, couponRegist);
}

//////////////////////////////////////////////////////////////
export default function* couponSaga() {
  yield all([
    fork(watchCouponList),
    fork(watchCouponCreate),
    fork(watchCouponDelete),
    fork(watchCouponGrant),
    fork(watchCouponSearch),
    fork(watchCouponUse),
    fork(watchCouponCheckRegist),
    fork(watchCouponRegist),

    //
  ]);
}
