import produce from "../util/produce";

export const initailState = {
  advertiseList: [],
  advertiseHistoryList: [],

  advertisePath: null,

  //
  st_advertiseListLoading: false, // advertise 가져오기
  st_advertiseListDone: false,
  st_advertiseListError: null,
  //
  st_advertiseCreateLoading: false, // advertise 생성하기
  st_advertiseCreateDone: false,
  st_advertiseCreateError: null,
  //
  st_advertiseUpdateLoading: false, // advertise 수정하기
  st_advertiseUpdateDone: false,
  st_advertiseUpdateError: null,
  //
  st_advertiseDeleteLoading: false, // advertise 삭제하기
  st_advertiseDeleteDone: false,
  st_advertiseDeleteError: null,
  //
  st_advertiseUploadLoading: false, // advertise 이미지 등록
  st_advertiseUploadDone: false,
  st_advertiseUploadError: null,
  //
  st_advertiseHistoryListLoading: false, // advertise 이력
  st_advertiseHistoryListDone: false,
  st_advertiseHistoryListError: null,
};

export const ADVERTISE_LIST_REQUEST = "ADVERTISE_LIST_REQUEST";
export const ADVERTISE_LIST_SUCCESS = "ADVERTISE_LIST_SUCCESS";
export const ADVERTISE_LIST_FAILURE = "ADVERTISE_LIST_FAILURE";

export const ADVERTISE_CREATE_REQUEST = "ADVERTISE_CREATE_REQUEST";
export const ADVERTISE_CREATE_SUCCESS = "ADVERTISE_CREATE_SUCCESS";
export const ADVERTISE_CREATE_FAILURE = "ADVERTISE_CREATE_FAILURE";

export const ADVERTISE_UPDATE_REQUEST = "ADVERTISE_UPDATE_REQUEST";
export const ADVERTISE_UPDATE_SUCCESS = "ADVERTISE_UPDATE_SUCCESS";
export const ADVERTISE_UPDATE_FAILURE = "ADVERTISE_UPDATE_FAILURE";

export const ADVERTISE_DELETE_REQUEST = "ADVERTISE_DELETE_REQUEST";
export const ADVERTISE_DELETE_SUCCESS = "ADVERTISE_DELETE_SUCCESS";
export const ADVERTISE_DELETE_FAILURE = "ADVERTISE_DELETE_FAILURE";

export const ADVERTISE_UPLOAD_REQUEST = "ADVERTISE_UPLOAD_REQUEST";
export const ADVERTISE_UPLOAD_SUCCESS = "ADVERTISE_UPLOAD_SUCCESS";
export const ADVERTISE_UPLOAD_FAILURE = "ADVERTISE_UPLOAD_FAILURE";

export const ADVERTISE_HISTORY_LIST_REQUEST = "ADVERTISE_HISTORY_LIST_REQUEST";
export const ADVERTISE_HISTORY_LIST_SUCCESS = "ADVERTISE_HISTORY_LIST_SUCCESS";
export const ADVERTISE_HISTORY_LIST_FAILURE = "ADVERTISE_HISTORY_LIST_FAILURE";

export const ADVERTISE_IMAGE_RESET = "ADVERTISE_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADVERTISE_LIST_REQUEST: {
        draft.st_advertiseListLoading = true;
        draft.st_advertiseListDone = false;
        draft.st_advertiseListError = null;
        break;
      }
      case ADVERTISE_LIST_SUCCESS: {
        draft.st_advertiseListLoading = false;
        draft.st_advertiseListDone = true;
        draft.st_advertiseListError = null;
        draft.advertiseList = action.data;
        break;
      }
      case ADVERTISE_LIST_FAILURE: {
        draft.st_advertiseListLoading = false;
        draft.st_advertiseListDone = false;
        draft.st_advertiseListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADVERTISE_CREATE_REQUEST: {
        draft.st_advertiseCreateLoading = true;
        draft.st_advertiseCreateDone = false;
        draft.st_advertiseCreateError = null;
        break;
      }
      case ADVERTISE_CREATE_SUCCESS: {
        draft.st_advertiseCreateLoading = false;
        draft.st_advertiseCreateDone = true;
        draft.st_advertiseCreateError = null;
        break;
      }
      case ADVERTISE_CREATE_FAILURE: {
        draft.st_advertiseCreateLoading = false;
        draft.st_advertiseCreateDone = false;
        draft.st_advertiseCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADVERTISE_UPDATE_REQUEST: {
        draft.st_advertiseUpdateLoading = true;
        draft.st_advertiseUpdateDone = false;
        draft.st_advertiseUpdateError = null;
        break;
      }
      case ADVERTISE_UPDATE_SUCCESS: {
        draft.st_advertiseUpdateLoading = false;
        draft.st_advertiseUpdateDone = true;
        draft.st_advertiseUpdateError = null;
        break;
      }
      case ADVERTISE_UPDATE_FAILURE: {
        draft.st_advertiseUpdateLoading = false;
        draft.st_advertiseUpdateDone = false;
        draft.st_advertiseUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADVERTISE_DELETE_REQUEST: {
        draft.st_advertiseDeleteLoading = true;
        draft.st_advertiseDeleteDone = false;
        draft.st_advertiseDeleteError = null;
        break;
      }
      case ADVERTISE_DELETE_SUCCESS: {
        draft.st_advertiseDeleteLoading = false;
        draft.st_advertiseDeleteDone = true;
        draft.st_advertiseDeleteError = null;
        break;
      }
      case ADVERTISE_DELETE_FAILURE: {
        draft.st_advertiseDeleteLoading = false;
        draft.st_advertiseDeleteDone = false;
        draft.st_advertiseDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADVERTISE_UPLOAD_REQUEST: {
        draft.st_advertiseUploadLoading = true;
        draft.st_advertiseUploadDone = false;
        draft.st_advertiseUploadError = null;
        break;
      }
      case ADVERTISE_UPLOAD_SUCCESS: {
        draft.st_advertiseUploadLoading = false;
        draft.st_advertiseUploadDone = true;
        draft.st_advertiseUploadError = null;
        draft.advertisePath = action.data.path;
        break;
      }
      case ADVERTISE_UPLOAD_FAILURE: {
        draft.st_advertiseUploadLoading = false;
        draft.st_advertiseUploadDone = false;
        draft.st_advertiseUploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADVERTISE_HISTORY_LIST_REQUEST: {
        draft.st_advertiseHistoryListLoading = true;
        draft.st_advertiseHistoryListDone = false;
        draft.st_advertiseHistoryListError = null;
        break;
      }
      case ADVERTISE_HISTORY_LIST_SUCCESS: {
        draft.st_advertiseHistoryListLoading = false;
        draft.st_advertiseHistoryListDone = true;
        draft.st_advertiseHistoryListError = null;
        draft.advertiseHistoryList = action.data;
        break;
      }
      case ADVERTISE_HISTORY_LIST_FAILURE: {
        draft.st_advertiseHistoryListLoading = false;
        draft.st_advertiseHistoryListDone = false;
        draft.st_advertiseHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case ADVERTISE_IMAGE_RESET: {
        draft.advertisePath = null;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
