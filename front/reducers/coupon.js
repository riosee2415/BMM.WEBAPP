import produce from "../util/produce";

export const initailState = {
  couponList: [], // 쿠폰리스트
  couponSearchList: [], // 유저벌 쿠폰리스트 (기본값 내쿠폰조회)

  //
  st_couponListLoading: false, // coupon 가져오기
  st_couponListDone: false,
  st_couponListError: null,
  //
  st_couponCreateLoading: false, // coupon 생성하기
  st_couponCreateDone: false,
  st_couponCreateError: null,
  //
  st_couponDeleteLoading: false, // coupon 삭제하기
  st_couponDeleteDone: false,
  st_couponDeleteError: null,
  //
  st_couponGrantLoading: false, // coupon 사용자에게 쿠폰 부여하기
  st_couponGrantDone: false,
  st_couponGrantError: null,
  //
  st_couponSearchLoading: false, // coupon 타겟 쿠폰 조회하기 (default 내 쿠폰 조회)
  st_couponSearchDone: false,
  st_couponSearchError: null,
  //
  st_couponUseLoading: false, // coupon 쿠폰 사용하기
  st_couponUseDone: false,
  st_couponUseError: null,
  //
  st_couponCheckRegistLoading: false, // coupon  쿠폰 번호 조회하기
  st_couponCheckRegistDone: false,
  st_couponCheckRegistError: null,
  //
  st_couponRegistLoading: false, // coupon 쿠폰 번호로 쿠폰 등록하기
  st_couponRegistDone: false,
  st_couponRegistError: null,
};

export const COUPON_LIST_REQUEST = "COUPON_LIST_REQUEST";
export const COUPON_LIST_SUCCESS = "COUPON_LIST_SUCCESS";
export const COUPON_LIST_FAILURE = "COUPON_LIST_FAILURE";

export const COUPON_CREATE_REQUEST = "COUPON_CREATE_REQUEST";
export const COUPON_CREATE_SUCCESS = "COUPON_CREATE_SUCCESS";
export const COUPON_CREATE_FAILURE = "COUPON_CREATE_FAILURE";

export const COUPON_DELETE_REQUEST = "COUPON_DELETE_REQUEST";
export const COUPON_DELETE_SUCCESS = "COUPON_DELETE_SUCCESS";
export const COUPON_DELETE_FAILURE = "COUPON_DELETE_FAILURE";

export const COUPON_GRANT_REQUEST = "COUPON_GRANT_REQUEST";
export const COUPON_GRANT_SUCCESS = "COUPON_GRANT_SUCCESS";
export const COUPON_GRANT_FAILURE = "COUPON_GRANT_FAILURE";

export const COUPON_SEARCH_REQUEST = "COUPON_SEARCH_REQUEST";
export const COUPON_SEARCH_SUCCESS = "COUPON_SEARCH_SUCCESS";
export const COUPON_SEARCH_FAILURE = "COUPON_SEARCH_FAILURE";

export const COUPON_USE_REQUEST = "COUPON_USE_REQUEST";
export const COUPON_USE_SUCCESS = "COUPON_USE_SUCCESS";
export const COUPON_USE_FAILURE = "COUPON_USE_FAILURE";

export const COUPON_CHECK_REGIST_REQUEST = "COUPON_CHECK_REGIST_REQUEST";
export const COUPON_CHECK_REGIST_SUCCESS = "COUPON_CHECK_REGIST_SUCCESS";
export const COUPON_CHECK_REGIST_FAILURE = "COUPON_CHECK_REGIST_FAILURE";

export const COUPON_REGIST_REQUEST = "COUPON_REGIST_REQUEST";
export const COUPON_REGIST_SUCCESS = "COUPON_REGIST_SUCCESS";
export const COUPON_REGIST_FAILURE = "COUPON_REGIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case COUPON_LIST_REQUEST: {
        draft.st_couponListLoading = true;
        draft.st_couponListDone = false;
        draft.st_couponListError = null;
        break;
      }
      case COUPON_LIST_SUCCESS: {
        draft.st_couponListLoading = false;
        draft.st_couponListDone = true;
        draft.st_couponListError = null;
        draft.couponList = action.data;
        break;
      }
      case COUPON_LIST_FAILURE: {
        draft.st_couponListLoading = false;
        draft.st_couponListDone = false;
        draft.st_couponListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case COUPON_CREATE_REQUEST: {
        draft.st_couponCreateLoading = true;
        draft.st_couponCreateDone = false;
        draft.st_couponCreateError = null;
        break;
      }
      case COUPON_CREATE_SUCCESS: {
        draft.st_couponCreateLoading = false;
        draft.st_couponCreateDone = true;
        draft.st_couponCreateError = null;
        break;
      }
      case COUPON_CREATE_FAILURE: {
        draft.st_couponCreateLoading = false;
        draft.st_couponCreateDone = false;
        draft.st_couponCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case COUPON_DELETE_REQUEST: {
        draft.st_couponDeleteLoading = true;
        draft.st_couponDeleteDone = false;
        draft.st_couponDeleteError = null;
        break;
      }
      case COUPON_DELETE_SUCCESS: {
        draft.st_couponDeleteLoading = false;
        draft.st_couponDeleteDone = true;
        draft.st_couponDeleteError = null;
        break;
      }
      case COUPON_DELETE_FAILURE: {
        draft.st_couponDeleteLoading = false;
        draft.st_couponDeleteDone = false;
        draft.st_couponDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case COUPON_GRANT_REQUEST: {
        draft.st_couponGrantLoading = true;
        draft.st_couponGrantDone = false;
        draft.st_couponGrantError = null;
        break;
      }
      case COUPON_GRANT_SUCCESS: {
        draft.st_couponGrantLoading = false;
        draft.st_couponGrantDone = true;
        draft.st_couponGrantError = null;
        break;
      }
      case COUPON_GRANT_FAILURE: {
        draft.st_couponGrantLoading = false;
        draft.st_couponGrantDone = false;
        draft.st_couponGrantError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case COUPON_SEARCH_REQUEST: {
        draft.st_couponSearchLoading = true;
        draft.st_couponSearchDone = false;
        draft.st_couponSearchError = null;
        break;
      }
      case COUPON_SEARCH_SUCCESS: {
        draft.st_couponSearchLoading = false;
        draft.st_couponSearchDone = true;
        draft.st_couponSearchError = null;
        draft.couponSearchList = action.data;
        break;
      }
      case COUPON_SEARCH_FAILURE: {
        draft.st_couponSearchLoading = false;
        draft.st_couponSearchDone = false;
        draft.st_couponSearchError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case COUPON_REGIST_REQUEST: {
        draft.st_couponRegistLoading = true;
        draft.st_couponRegistDone = false;
        draft.st_couponRegistError = null;
        break;
      }
      case COUPON_REGIST_SUCCESS: {
        draft.st_couponRegistLoading = false;
        draft.st_couponRegistDone = true;
        draft.st_couponRegistError = null;
        break;
      }
      case COUPON_REGIST_FAILURE: {
        draft.st_couponRegistLoading = false;
        draft.st_couponRegistDone = false;
        draft.st_couponRegistError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //////////////////////////////////////////////

      case COUPON_CHECK_REGIST_REQUEST: {
        draft.st_couponCheckRegistLoading = true;
        draft.st_couponCheckRegistDone = false;
        draft.st_couponCheckRegistError = null;
        break;
      }
      case COUPON_CHECK_REGIST_SUCCESS: {
        draft.st_couponCheckRegistLoading = false;
        draft.st_couponCheckRegistDone = true;
        draft.st_couponCheckRegistError = null;
        break;
      }
      case COUPON_CHECK_REGIST_FAILURE: {
        draft.st_couponCheckRegistLoading = false;
        draft.st_couponCheckRegistDone = false;
        draft.st_couponCheckRegistError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
