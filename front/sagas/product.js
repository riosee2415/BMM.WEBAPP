import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  //
  PRODUCT_LECO_LIST_REQUEST,
  PRODUCT_LECO_LIST_SUCCESS,
  PRODUCT_LECO_LIST_FAILURE,
  //
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_FAILURE,
  //
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE,
  //
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  //
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  //
  PRODUCT_LECO_UPDATE_REQUEST,
  PRODUCT_LECO_UPDATE_SUCCESS,
  PRODUCT_LECO_UPDATE_FAILURE,
  //
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  //
  PRODUCT_UPLOAD1_REQUEST,
  PRODUCT_UPLOAD1_SUCCESS,
  PRODUCT_UPLOAD1_FAILURE,
  //
  PRODUCT_UPLOAD2_REQUEST,
  PRODUCT_UPLOAD2_SUCCESS,
  PRODUCT_UPLOAD2_FAILURE,
  //
  PRODUCT_UPLOAD3_REQUEST,
  PRODUCT_UPLOAD3_SUCCESS,
  PRODUCT_UPLOAD3_FAILURE,
  //
  PRODUCT_UPLOAD4_REQUEST,
  PRODUCT_UPLOAD4_SUCCESS,
  PRODUCT_UPLOAD4_FAILURE,
  //
  PRODUCT_UPLOAD5_REQUEST,
  PRODUCT_UPLOAD5_SUCCESS,
  PRODUCT_UPLOAD5_FAILURE,
  //
  PRODUCT_HISTORY_LIST_REQUEST,
  PRODUCT_HISTORY_LIST_SUCCESS,
  PRODUCT_HISTORY_LIST_FAILURE,
  //
  PRODUCT_OPTION_LIST_REQUEST,
  PRODUCT_OPTION_LIST_SUCCESS,
  PRODUCT_OPTION_LIST_FAILURE,
  //
  PRODUCT_OPTION_CREATE_REQUEST,
  PRODUCT_OPTION_CREATE_SUCCESS,
  PRODUCT_OPTION_CREATE_FAILURE,
  //
  PRODUCT_OPTION_UPDATE_REQUEST,
  PRODUCT_OPTION_UPDATE_SUCCESS,
  PRODUCT_OPTION_UPDATE_FAILURE,
  //
  PRODUCT_OPTION_DELETE_REQUEST,
  PRODUCT_OPTION_DELETE_SUCCESS,
  PRODUCT_OPTION_DELETE_FAILURE,
  //
  PRODUCT_TAG_LIST_REQUEST,
  PRODUCT_TAG_LIST_SUCCESS,
  PRODUCT_TAG_LIST_FAILURE,
  //
  PRODUCT_TAG_CREATE_REQUEST,
  PRODUCT_TAG_CREATE_SUCCESS,
  PRODUCT_TAG_CREATE_FAILURE,
  //
  PRODUCT_TAG_UPDATE_REQUEST,
  PRODUCT_TAG_UPDATE_SUCCESS,
  PRODUCT_TAG_UPDATE_FAILURE,
  //
  PRODUCT_TAG_DELETE_REQUEST,
  PRODUCT_TAG_DELETE_SUCCESS,
  PRODUCT_TAG_DELETE_FAILURE,
  //
  PRODUCT_NEW_UPDATE_REQUEST,
  PRODUCT_NEW_UPDATE_SUCCESS,
  PRODUCT_NEW_UPDATE_FAILURE,
  //
  PRODUCT_BEST_UPDATE_REQUEST,
  PRODUCT_BEST_UPDATE_SUCCESS,
  PRODUCT_BEST_UPDATE_FAILURE,
  //
  PRODUCT_NEW_LIST_REQUEST,
  PRODUCT_NEW_LIST_SUCCESS,
  PRODUCT_NEW_LIST_FAILURE,
  //
  PRODUCT_BEST_LIST_REQUEST,
  PRODUCT_BEST_LIST_SUCCESS,
  PRODUCT_BEST_LIST_FAILURE,
} from "../reducers/product";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function productListAPI(data) {
  return await axios.post(`/api/product/list`, data);
}

function* productList(action) {
  try {
    const result = yield call(productListAPI, action.data);

    yield put({
      type: PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LIST_FAILURE,
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
async function productLecoListAPI(data) {
  return await axios.post(`/api/product/recommend/list`, data);
}

function* productLecoList(action) {
  try {
    const result = yield call(productLecoListAPI, action.data);

    yield put({
      type: PRODUCT_LECO_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LECO_LIST_FAILURE,
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
async function productAdminListAPI(data) {
  return await axios.post(`/api/product/admin/list`, data);
}

function* productAdminList(action) {
  try {
    const result = yield call(productAdminListAPI, action.data);

    yield put({
      type: PRODUCT_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_ADMIN_LIST_FAILURE,
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
async function productDetailAPI(data) {
  return await axios.post(`/api/product/detail`, data);
}

function* productDetail(action) {
  try {
    const result = yield call(productDetailAPI, action.data);

    yield put({
      type: PRODUCT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DETAIL_FAILURE,
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
async function productCreateAPI(data) {
  return await axios.post(`/api/product/create`, data);
}

function* productCreate(action) {
  try {
    const result = yield call(productCreateAPI, action.data);

    yield put({
      type: PRODUCT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_CREATE_FAILURE,
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
async function productUpdateAPI(data) {
  return await axios.post(`/api/product/update`, data);
}

function* productUpdate(action) {
  try {
    const result = yield call(productUpdateAPI, action.data);

    yield put({
      type: PRODUCT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_UPDATE_FAILURE,
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
async function productLecoUpdateAPI(data) {
  return await axios.post(`/api/product/recommend/update`, data);
}

function* productLecoUpdate(action) {
  try {
    const result = yield call(productLecoUpdateAPI, action.data);

    yield put({
      type: PRODUCT_LECO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_LECO_UPDATE_FAILURE,
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
async function productDeleteAPI(data) {
  return await axios.post(`/api/product/delete`, data);
}

function* productDelete(action) {
  try {
    const result = yield call(productDeleteAPI, action.data);

    yield put({
      type: PRODUCT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_DELETE_FAILURE,
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
async function productImg1API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productImg1(action) {
  try {
    const result = yield call(productImg1API, action.data);

    yield put({
      type: PRODUCT_UPLOAD1_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_UPLOAD1_FAILURE,
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
async function productImg2API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productImg2(action) {
  try {
    const result = yield call(productImg2API, action.data);

    yield put({
      type: PRODUCT_UPLOAD2_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_UPLOAD2_FAILURE,
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
async function productImg3API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productImg3(action) {
  try {
    const result = yield call(productImg3API, action.data);

    yield put({
      type: PRODUCT_UPLOAD3_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_UPLOAD3_FAILURE,
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
async function productImg4API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productImg4(action) {
  try {
    const result = yield call(productImg4API, action.data);

    yield put({
      type: PRODUCT_UPLOAD4_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_UPLOAD4_FAILURE,
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
async function productImg5API(data) {
  return await axios.post(`/api/product/image`, data);
}

function* productImg5(action) {
  try {
    const result = yield call(productImg5API, action.data);

    yield put({
      type: PRODUCT_UPLOAD5_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_UPLOAD5_FAILURE,
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
async function productHistoryListAPI(data) {
  return await axios.post(`/api/product/history/list`, data);
}

function* productHistoryList(action) {
  try {
    const result = yield call(productHistoryListAPI, action.data);

    yield put({
      type: PRODUCT_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_HISTORY_LIST_FAILURE,
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
async function productOptionListAPI(data) {
  return await axios.post(`/api/product/option/list`, data);
}

function* productOptionList(action) {
  try {
    const result = yield call(productOptionListAPI, action.data);

    yield put({
      type: PRODUCT_OPTION_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPTION_LIST_FAILURE,
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
async function productOptionCreateAPI(data) {
  return await axios.post(`/api/product/option/create`, data);
}

function* productOptionCreate(action) {
  try {
    const result = yield call(productOptionCreateAPI, action.data);

    yield put({
      type: PRODUCT_OPTION_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPTION_CREATE_FAILURE,
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
async function productOptionUpdateAPI(data) {
  return await axios.post(`/api/product/option/update`, data);
}

function* productOptionUpdate(action) {
  try {
    const result = yield call(productOptionUpdateAPI, action.data);

    yield put({
      type: PRODUCT_OPTION_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPTION_UPDATE_FAILURE,
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
async function productOptionDeleteAPI(data) {
  return await axios.post(`/api/product/option/delete`, data);
}

function* productOptionDelete(action) {
  try {
    const result = yield call(productOptionDeleteAPI, action.data);

    yield put({
      type: PRODUCT_OPTION_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_OPTION_DELETE_FAILURE,
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
async function productTagListAPI(data) {
  return await axios.post(`/api/product/tag/list`, data);
}

function* productTagList(action) {
  try {
    const result = yield call(productTagListAPI, action.data);

    yield put({
      type: PRODUCT_TAG_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TAG_LIST_FAILURE,
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
async function productTagCreateAPI(data) {
  return await axios.post(`/api/product/tag/create`, data);
}

function* productTagCreate(action) {
  try {
    const result = yield call(productTagCreateAPI, action.data);

    yield put({
      type: PRODUCT_TAG_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TAG_CREATE_FAILURE,
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
async function productTagUpdateAPI(data) {
  return await axios.post(`/api/product/tag/update`, data);
}

function* productTagUpdate(action) {
  try {
    const result = yield call(productTagUpdateAPI, action.data);

    yield put({
      type: PRODUCT_TAG_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TAG_UPDATE_FAILURE,
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
async function productTagDeleteAPI(data) {
  return await axios.post(`/api/product/tag/delete`, data);
}

function* productTagDelete(action) {
  try {
    const result = yield call(productTagDeleteAPI, action.data);

    yield put({
      type: PRODUCT_TAG_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_TAG_DELETE_FAILURE,
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
async function productNewUpdateAPI(data) {
  return await axios.post(`/api/product/new/update`, data);
}

function* productNewUpdate(action) {
  try {
    const result = yield call(productNewUpdateAPI, action.data);

    yield put({
      type: PRODUCT_NEW_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_NEW_UPDATE_FAILURE,
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
async function productBestUpdateAPI(data) {
  return await axios.post(`/api/product/best/update`, data);
}

function* productBestUpdate(action) {
  try {
    const result = yield call(productBestUpdateAPI, action.data);

    yield put({
      type: PRODUCT_BEST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_BEST_UPDATE_FAILURE,
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
async function productBestListAPI(data) {
  return await axios.post(`/api/product/best/list`, data);
}

function* productBestList(action) {
  try {
    const result = yield call(productBestListAPI, action.data);

    yield put({
      type: PRODUCT_BEST_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_BEST_LIST_FAILURE,
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
async function productNewListAPI(data) {
  return await axios.post(`/api/product/new/list`, data);
}

function* productNewList(action) {
  try {
    const result = yield call(productNewListAPI, action.data);

    yield put({
      type: PRODUCT_NEW_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PRODUCT_NEW_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchProductList() {
  yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}
function* watchProductLecoList() {
  yield takeLatest(PRODUCT_LECO_LIST_REQUEST, productLecoList);
}
function* watchProductAdminList() {
  yield takeLatest(PRODUCT_ADMIN_LIST_REQUEST, productAdminList);
}
function* watchProductDetail() {
  yield takeLatest(PRODUCT_DETAIL_REQUEST, productDetail);
}
function* watchProductCreate() {
  yield takeLatest(PRODUCT_CREATE_REQUEST, productCreate);
}
function* watchProductUpdate() {
  yield takeLatest(PRODUCT_UPDATE_REQUEST, productUpdate);
}
function* watchProductLecoUpdate() {
  yield takeLatest(PRODUCT_LECO_UPDATE_REQUEST, productLecoUpdate);
}
function* watchProductDelete() {
  yield takeLatest(PRODUCT_DELETE_REQUEST, productDelete);
}
function* watchProductUpload1() {
  yield takeLatest(PRODUCT_UPLOAD1_REQUEST, productImg1);
}
function* watchProductUpload2() {
  yield takeLatest(PRODUCT_UPLOAD2_REQUEST, productImg2);
}
function* watchProductUpload3() {
  yield takeLatest(PRODUCT_UPLOAD3_REQUEST, productImg3);
}
function* watchProductUpload4() {
  yield takeLatest(PRODUCT_UPLOAD4_REQUEST, productImg4);
}
function* watchProductUpload5() {
  yield takeLatest(PRODUCT_UPLOAD5_REQUEST, productImg5);
}
function* watchProductHistoryList() {
  yield takeLatest(PRODUCT_HISTORY_LIST_REQUEST, productHistoryList);
}
function* watchProductOptionList() {
  yield takeLatest(PRODUCT_OPTION_LIST_REQUEST, productOptionList);
}
function* watchProductOptionCreate() {
  yield takeLatest(PRODUCT_OPTION_CREATE_REQUEST, productOptionCreate);
}
function* watchProductOptionUpdate() {
  yield takeLatest(PRODUCT_OPTION_UPDATE_REQUEST, productOptionUpdate);
}
function* watchProductOptionDelete() {
  yield takeLatest(PRODUCT_OPTION_DELETE_REQUEST, productOptionDelete);
}
function* watchProductTagList() {
  yield takeLatest(PRODUCT_TAG_LIST_REQUEST, productTagList);
}
function* watchProductTagCreate() {
  yield takeLatest(PRODUCT_TAG_CREATE_REQUEST, productTagCreate);
}
function* watchProductTagUpdate() {
  yield takeLatest(PRODUCT_TAG_UPDATE_REQUEST, productTagUpdate);
}
function* watchProductTagDelete() {
  yield takeLatest(PRODUCT_TAG_DELETE_REQUEST, productTagDelete);
}
function* watchProductNewUpdate() {
  yield takeLatest(PRODUCT_NEW_UPDATE_REQUEST, productNewUpdate);
}
function* watchProductBestUpdate() {
  yield takeLatest(PRODUCT_BEST_UPDATE_REQUEST, productBestUpdate);
}
function* watchProductBestList() {
  yield takeLatest(PRODUCT_BEST_LIST_REQUEST, productBestList);
}
function* watchProductNewList() {
  yield takeLatest(PRODUCT_NEW_LIST_REQUEST, productNewList);
}

//////////////////////////////////////////////////////////////
export default function* productSaga() {
  yield all([
    fork(watchProductList),
    fork(watchProductLecoList),
    fork(watchProductAdminList),
    fork(watchProductDetail),
    fork(watchProductCreate),
    fork(watchProductUpdate),
    fork(watchProductLecoUpdate),
    fork(watchProductDelete),
    fork(watchProductUpload1),
    fork(watchProductUpload2),
    fork(watchProductUpload3),
    fork(watchProductUpload4),
    fork(watchProductUpload5),
    fork(watchProductHistoryList),
    fork(watchProductOptionList),
    fork(watchProductOptionCreate),
    fork(watchProductOptionUpdate),
    fork(watchProductOptionDelete),
    fork(watchProductTagList),
    fork(watchProductTagCreate),
    fork(watchProductTagUpdate),
    fork(watchProductTagDelete),
    fork(watchProductNewUpdate),
    fork(watchProductBestUpdate),
    fork(watchProductBestList),
    fork(watchProductNewList),

    //
  ]);
}
