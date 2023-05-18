import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LIKE_LIST_REQUEST,
  LIKE_LIST_SUCCESS,
  LIKE_LIST_FAILURE,

  //
  LIKE_CREATE_REQUEST,
  LIKE_CREATE_SUCCESS,
  LIKE_CREATE_FAILURE,

  //
  LIKE_DELETE_REQUEST,
  LIKE_DELETE_SUCCESS,
  LIKE_DELETE_FAILURE,
} from "../reducers/like";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function likeListAPI(data) {
  return await axios.post(`/api/like/list`, data);
}

function* likeList(action) {
  try {
    const result = yield call(likeListAPI, action.data);

    yield put({
      type: LIKE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_LIST_FAILURE,
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
async function likeCreateAPI(data) {
  return await axios.post(`/api/like/create`, data);
}

function* likeCreate(action) {
  try {
    const result = yield call(likeCreateAPI, action.data);

    yield put({
      type: LIKE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_CREATE_FAILURE,
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
async function likeDeleteAPI(data) {
  return await axios.post(`/api/like/delete`, data);
}

function* likeDelete(action) {
  try {
    const result = yield call(likeDeleteAPI, action.data);

    yield put({
      type: LIKE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchEventList() {
  yield takeLatest(LIKE_LIST_REQUEST, likeList);
}

function* watchEventCreate() {
  yield takeLatest(LIKE_CREATE_REQUEST, likeCreate);
}

function* watchEventDelete() {
  yield takeLatest(LIKE_DELETE_REQUEST, likeDelete);
}

//////////////////////////////////////////////////////////////
export default function* likeSaga() {
  yield all([
    fork(watchEventList),
    fork(watchEventCreate),
    fork(watchEventDelete),

    //
  ]);
}
