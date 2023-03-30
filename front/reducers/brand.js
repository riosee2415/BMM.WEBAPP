import produce from "../util/produce";

export const initailState = {
  brandList: [],
  brandHistoryList: [],

  brandPath: null,

  //
  st_brandListLoading: false, // brand 가져오기
  st_brandListDone: false,
  st_brandListError: null,
  //
  st_brandCreateLoading: false, // brand 생성하기
  st_brandCreateDone: false,
  st_brandCreateError: null,
  //
  st_brandUpdateLoading: false, // brand 수정하기
  st_brandUpdateDone: false,
  st_brandUpdateError: null,
  //
  st_brandDeleteLoading: false, // brand 삭제하기
  st_brandDeleteDone: false,
  st_brandDeleteError: null,
  //
  st_brandUploadLoading: false, // brand 이미지 등록
  st_brandUploadDone: false,
  st_brandUploadError: null,
  //
  st_brandHistoryListLoading: false, // brand 이력
  st_brandHistoryListDone: false,
  st_brandHistoryListError: null,
};

export const BRAND_LIST_REQUEST = "BRAND_LIST_REQUEST";
export const BRAND_LIST_SUCCESS = "BRAND_LIST_SUCCESS";
export const BRAND_LIST_FAILURE = "BRAND_LIST_FAILURE";

export const BRAND_CREATE_REQUEST = "BRAND_CREATE_REQUEST";
export const BRAND_CREATE_SUCCESS = "BRAND_CREATE_SUCCESS";
export const BRAND_CREATE_FAILURE = "BRAND_CREATE_FAILURE";

export const BRAND_UPDATE_REQUEST = "BRAND_UPDATE_REQUEST";
export const BRAND_UPDATE_SUCCESS = "BRAND_UPDATE_SUCCESS";
export const BRAND_UPDATE_FAILURE = "BRAND_UPDATE_FAILURE";

export const BRAND_DELETE_REQUEST = "BRAND_DELETE_REQUEST";
export const BRAND_DELETE_SUCCESS = "BRAND_DELETE_SUCCESS";
export const BRAND_DELETE_FAILURE = "BRAND_DELETE_FAILURE";

export const BRAND_UPLOAD_REQUEST = "BRAND_UPLOAD_REQUEST";
export const BRAND_UPLOAD_SUCCESS = "BRAND_UPLOAD_SUCCESS";
export const BRAND_UPLOAD_FAILURE = "BRAND_UPLOAD_FAILURE";

export const BRAND_HISTORY_LIST_REQUEST = "BRAND_HISTORY_LIST_REQUEST";
export const BRAND_HISTORY_LIST_SUCCESS = "BRAND_HISTORY_LIST_SUCCESS";
export const BRAND_HISTORY_LIST_FAILURE = "BRAND_HISTORY_LIST_FAILURE";

export const BRAND_IMAGE_RESET = "BRAND_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BRAND_LIST_REQUEST: {
        draft.st_brandListLoading = true;
        draft.st_brandListDone = false;
        draft.st_brandListError = null;
        break;
      }
      case BRAND_LIST_SUCCESS: {
        draft.st_brandListLoading = false;
        draft.st_brandListDone = true;
        draft.st_brandListError = null;
        draft.brandList = action.data;
        break;
      }
      case BRAND_LIST_FAILURE: {
        draft.st_brandListLoading = false;
        draft.st_brandListDone = false;
        draft.st_brandListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BRAND_CREATE_REQUEST: {
        draft.st_brandCreateLoading = true;
        draft.st_brandCreateDone = false;
        draft.st_brandCreateError = null;
        break;
      }
      case BRAND_CREATE_SUCCESS: {
        draft.st_brandCreateLoading = false;
        draft.st_brandCreateDone = true;
        draft.st_brandCreateError = null;
        break;
      }
      case BRAND_CREATE_FAILURE: {
        draft.st_brandCreateLoading = false;
        draft.st_brandCreateDone = false;
        draft.st_brandCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BRAND_UPDATE_REQUEST: {
        draft.st_brandUpdateLoading = true;
        draft.st_brandUpdateDone = false;
        draft.st_brandUpdateError = null;
        break;
      }
      case BRAND_UPDATE_SUCCESS: {
        draft.st_brandUpdateLoading = false;
        draft.st_brandUpdateDone = true;
        draft.st_brandUpdateError = null;
        break;
      }
      case BRAND_UPDATE_FAILURE: {
        draft.st_brandUpdateLoading = false;
        draft.st_brandUpdateDone = false;
        draft.st_brandUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BRAND_DELETE_REQUEST: {
        draft.st_brandDeleteLoading = true;
        draft.st_brandDeleteDone = false;
        draft.st_brandDeleteError = null;
        break;
      }
      case BRAND_DELETE_SUCCESS: {
        draft.st_brandDeleteLoading = false;
        draft.st_brandDeleteDone = true;
        draft.st_brandDeleteError = null;
        break;
      }
      case BRAND_DELETE_FAILURE: {
        draft.st_brandDeleteLoading = false;
        draft.st_brandDeleteDone = false;
        draft.st_brandDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BRAND_UPLOAD_REQUEST: {
        draft.st_brandUploadLoading = true;
        draft.st_brandUploadDone = false;
        draft.st_brandUploadError = null;
        break;
      }
      case BRAND_UPLOAD_SUCCESS: {
        draft.st_brandUploadLoading = false;
        draft.st_brandUploadDone = true;
        draft.st_brandUploadError = null;
        draft.brandPath = action.data.path;
        break;
      }
      case BRAND_UPLOAD_FAILURE: {
        draft.st_brandUploadLoading = false;
        draft.st_brandUploadDone = false;
        draft.st_brandUploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BRAND_HISTORY_LIST_REQUEST: {
        draft.st_brandHistoryListLoading = true;
        draft.st_brandHistoryListDone = false;
        draft.st_brandHistoryListError = null;
        break;
      }
      case BRAND_HISTORY_LIST_SUCCESS: {
        draft.st_brandHistoryListLoading = false;
        draft.st_brandHistoryListDone = true;
        draft.st_brandHistoryListError = null;
        draft.brandHistoryList = action.data;
        break;
      }
      case BRAND_HISTORY_LIST_FAILURE: {
        draft.st_brandHistoryListLoading = false;
        draft.st_brandHistoryListDone = false;
        draft.st_brandHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case BRAND_IMAGE_RESET: {
        draft.brandPath = null;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
