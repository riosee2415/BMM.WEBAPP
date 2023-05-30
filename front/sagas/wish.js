import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAILURE,
  //
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAILURE,
  //
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAILURE,
  //
  ITEM_DELETE_ALL_REQUEST,
  ITEM_DELETE_ALL_SUCCESS,
  ITEM_DELETE_ALL_FAILURE,
  //
  BOUGHT_ADMIN_LIST_REQUEST,
  BOUGHT_ADMIN_LIST_SUCCESS,
  BOUGHT_ADMIN_LIST_FAILURE,
} from "../reducers/wish";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function itemCreateAPI(data) {
  return await axios.post(`/api/wish/item/create`, data);
}

function* itemCreate(action) {
  try {
    const result = yield call(itemCreateAPI, action.data);

    yield put({
      type: ITEM_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
async function itemUpdateAPI(data) {
  return await axios.post(`/api/wish/item/update`, data);
}

function* itemUpdate(action) {
  try {
    const result = yield call(itemUpdateAPI, action.data);

    yield put({
      type: ITEM_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
async function itemDeleteAPI(data) {
  return await axios.post(`/api/wish/wish/item/delete`, data);
}

function* itemDelete(action) {
  try {
    const result = yield call(itemDeleteAPI, action.data);

    yield put({
      type: ITEM_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
async function itemDeleteAllAPI(data) {
  return await axios.post(`/api/wish/wish/item/deleteAll`, data);
}

function* itemDeleteAll(action) {
  try {
    const result = yield call(itemDeleteAllAPI, action.data);

    yield put({
      type: ITEM_DELETE_ALL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ITEM_DELETE_ALL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
async function boughtAdminListAPI(data) {
  return await axios.post(`/api/wish/wish/bought/admin/list`, data);
}

function* boughtAdminList(action) {
  try {
    const result = yield call(boughtAdminListAPI, action.data);

    yield put({
      type: BOUGHT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOUGHT_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchItemCreate() {
  yield takeLatest(ITEM_CREATE_REQUEST, itemCreate);
}
function* watchItemUpdate() {
  yield takeLatest(ITEM_UPDATE_REQUEST, itemUpdate);
}
function* watchItemDelete() {
  yield takeLatest(ITEM_DELETE_REQUEST, itemDelete);
}
function* watchItemDeleteAll() {
  yield takeLatest(ITEM_DELETE_ALL_REQUEST, itemDeleteAll);
}

function* watchBoughtAdminList() {
  yield takeLatest(BOUGHT_ADMIN_LIST_REQUEST, boughtAdminList);
}

//////////////////////////////////////////////////////////////
export default function* wishSaga() {
  yield all([
    fork(watchItemCreate),
    fork(watchItemUpdate),
    fork(watchItemDelete),
    fork(watchItemDeleteAll),
    fork(watchBoughtAdminList),

    //
  ]);
}
