import produce from "../util/produce";

export const initailState = {
  requestList: [], //상품요청리스트
  lastPage: 1,
  requestAdminList: [], //관리자리스트
  reqyestDetail: null,

  requestData: null, // 상품요청 데이턴

  //
  st_requestListLoading: false, // 상품요청 가져오기
  st_requestListDone: false,
  st_requestListError: null,
  //
  st_requestListDetailLoading: false, // 상품요청 상세목록 가져오기
  st_requestListDetailDone: false,
  st_requestListDetailError: null,
  //
  st_requestAdminListLoading: false, // 상품요청 관리자 가져오기
  st_requestAdminListDone: false,
  st_requestAdminListError: null,
  //
  st_requestCreateLoading: false, // 상품요청 생성하기
  st_requestCreateDone: false,
  st_requestCreateError: null,
  //
  st_requestAnswerUpdateLoading: false, // 상품요청 수정하기
  st_requestAnswerUpdateDone: false,
  st_requestAnswerUpdateError: null,
};

export const REQUEST_LIST_REQUEST = "REQUEST_LIST_REQUEST";
export const REQUEST_LIST_SUCCESS = "REQUEST_LIST_SUCCESS";
export const REQUEST_LIST_FAILURE = "REQUEST_LIST_FAILURE";

export const REQUEST_LIST_DETAIL_REQUEST = "REQUEST_LIST_DETAIL_REQUEST";
export const REQUEST_LIST_DETAIL_SUCCESS = "REQUEST_LIST_DETAIL_SUCCESS";
export const REQUEST_LIST_DETAIL_FAILURE = "REQUEST_LIST_DETAIL_FAILURE";

export const REQUEST_ADMIN_LIST_REQUEST = "REQUEST_ADMIN_LIST_REQUEST";
export const REQUEST_ADMIN_LIST_SUCCESS = "REQUEST_ADMIN_LIST_SUCCESS";
export const REQUEST_ADMIN_LIST_FAILURE = "REQUEST_ADMIN_LIST_FAILURE";

export const REQUEST_CREATE_REQUEST = "REQUEST_CREATE_REQUEST";
export const REQUEST_CREATE_SUCCESS = "REQUEST_CREATE_SUCCESS";
export const REQUEST_CREATE_FAILURE = "REQUEST_CREATE_FAILURE";

export const REQUEST_ANSWER_UPDATE_REQUEST = "REQUEST_UPDATE_REQUEST";
export const REQUEST_ANSWER_UPDATE_SUCCESS = "REQUEST_UPDATE_SUCCESS";
export const REQUEST_ANSWER_UPDATE_FAILURE = "REQUEST_UPDATE_FAILURE";

export const REQUEST = "REQUEST_UPDATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_LIST_REQUEST: {
        draft.st_requestListLoading = true;
        draft.st_requestListDone = false;
        draft.st_requestListError = null;
        break;
      }
      case REQUEST_LIST_SUCCESS: {
        draft.st_requestListLoading = false;
        draft.st_requestListDone = true;
        draft.st_requestListError = null;
        draft.requestList = action.data.list;
        break;
      }
      case REQUEST_LIST_FAILURE: {
        draft.st_requestListLoading = false;
        draft.st_requestListDone = false;
        draft.st_requestListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REQUEST_LIST_DETAIL_REQUEST: {
        draft.st_requestListDetailLoading = true;
        draft.st_requestListDetailDone = false;
        draft.st_requestListDetailError = null;
        break;
      }
      case REQUEST_LIST_DETAIL_SUCCESS: {
        draft.st_requestListDetailLoading = false;
        draft.st_requestListDetailDone = true;
        draft.st_requestListDetailError = null;
        draft.requestDetail = action.data;
        break;
      }
      case REQUEST_LIST_DETAIL_FAILURE: {
        draft.st_requestListDetailLoading = false;
        draft.st_requestListDetailDone = false;
        draft.st_requestListDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REQUEST_ADMIN_LIST_REQUEST: {
        draft.st_requestAdminListLoading = true;
        draft.st_requestAdminListDone = false;
        draft.st_requestAdminListError = null;
        break;
      }
      case REQUEST_ADMIN_LIST_SUCCESS: {
        draft.st_requestAdminListLoading = false;
        draft.st_requestAdminListDone = true;
        draft.st_requestAdminListError = null;
        draft.requestAdminList = action.data.productQuestions;
        break;
      }
      case REQUEST_ADMIN_LIST_FAILURE: {
        draft.st_requestAdminListLoading = false;
        draft.st_requestAdminListDone = false;
        draft.st_requestAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REQUEST_CREATE_REQUEST: {
        draft.st_requestCreateLoading = true;
        draft.st_requestCreateDone = false;
        draft.st_requestCreateError = null;
        break;
      }
      case REQUEST_CREATE_SUCCESS: {
        draft.st_requestCreateLoading = false;
        draft.st_requestCreateDone = true;
        draft.st_requestCreateError = null;
        break;
      }
      case REQUEST_CREATE_FAILURE: {
        draft.st_requestCreateLoading = false;
        draft.st_requestCreateDone = false;
        draft.st_requestCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REQUEST_ANSWER_UPDATE_REQUEST: {
        draft.st_requestAnswerUpdateLoading = true;
        draft.st_requestAnswerUpdateDone = false;
        draft.st_requestAnswerUpdateError = null;
        break;
      }
      case REQUEST_ANSWER_UPDATE_SUCCESS: {
        draft.st_requestAnswerUpdateLoading = false;
        draft.st_requestAnswerUpdateDone = true;
        draft.st_requestAnswerUpdateError = null;
        break;
      }
      case REQUEST_ANSWER_UPDATE_FAILURE: {
        draft.st_requestAnswerUpdateLoading = false;
        draft.st_requestAnswerUpdateDone = false;
        draft.st_requestAnswerUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
