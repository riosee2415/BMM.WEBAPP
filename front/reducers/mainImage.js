import produce from "../util/produce";

export const initailState = {
  mainImageList: [],
  mainImageHistoryList: [],

  mainImagePath: null,

  //
  st_mainImageListLoading: false, // mainImage 가져오기
  st_mainImageListDone: false,
  st_mainImageListError: null,
  //
  st_mainImageCreateLoading: false, // mainImage 생성하기
  st_mainImageCreateDone: false,
  st_mainImageCreateError: null,
  //
  st_mainImageUpdateLoading: false, // mainImage 수정하기
  st_mainImageUpdateDone: false,
  st_mainImageUpdateError: null,
  //
  st_mainImageDeleteLoading: false, // mainImage 삭제하기
  st_mainImageDeleteDone: false,
  st_mainImageDeleteError: null,
  //
  st_mainImageUploadLoading: false, // mainImage 이미지 등록
  st_mainImageUploadDone: false,
  st_mainImageUploadError: null,
  //
  st_mainImageHistoryListLoading: false, // mainImage 이력
  st_mainImageHistoryListDone: false,
  st_mainImageHistoryListError: null,
};

export const MAINIMAGE_LIST_REQUEST = "MAINIMAGE_LIST_REQUEST";
export const MAINIMAGE_LIST_SUCCESS = "MAINIMAGE_LIST_SUCCESS";
export const MAINIMAGE_LIST_FAILURE = "MAINIMAGE_LIST_FAILURE";

export const MAINIMAGE_CREATE_REQUEST = "MAINIMAGE_CREATE_REQUEST";
export const MAINIMAGE_CREATE_SUCCESS = "MAINIMAGE_CREATE_SUCCESS";
export const MAINIMAGE_CREATE_FAILURE = "MAINIMAGE_CREATE_FAILURE";

export const MAINIMAGE_UPDATE_REQUEST = "MAINIMAGE_UPDATE_REQUEST";
export const MAINIMAGE_UPDATE_SUCCESS = "MAINIMAGE_UPDATE_SUCCESS";
export const MAINIMAGE_UPDATE_FAILURE = "MAINIMAGE_UPDATE_FAILURE";

export const MAINIMAGE_DELETE_REQUEST = "MAINIMAGE_DELETE_REQUEST";
export const MAINIMAGE_DELETE_SUCCESS = "MAINIMAGE_DELETE_SUCCESS";
export const MAINIMAGE_DELETE_FAILURE = "MAINIMAGE_DELETE_FAILURE";

export const MAINIMAGE_UPLOAD_REQUEST = "MAINIMAGE_UPLOAD_REQUEST";
export const MAINIMAGE_UPLOAD_SUCCESS = "MAINIMAGE_UPLOAD_SUCCESS";
export const MAINIMAGE_UPLOAD_FAILURE = "MAINIMAGE_UPLOAD_FAILURE";

export const MAINIMAGE_HISTORY_LIST_REQUEST = "MAINIMAGE_HISTORY_LIST_REQUEST";
export const MAINIMAGE_HISTORY_LIST_SUCCESS = "MAINIMAGE_HISTORY_LIST_SUCCESS";
export const MAINIMAGE_HISTORY_LIST_FAILURE = "MAINIMAGE_HISTORY_LIST_FAILURE";

export const MAINIMAGE_IMAGE_RESET = "MAINIMAGE_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MAINIMAGE_LIST_REQUEST: {
        draft.st_advertiseListLoading = true;
        draft.st_advertiseListDone = false;
        draft.st_advertiseListError = null;
        break;
      }
      case MAINIMAGE_LIST_SUCCESS: {
        draft.st_mainImageListLoading = false;
        draft.st_mainImageListDone = true;
        draft.st_mainImageListError = null;
        draft.mainImageList = action.data;
        break;
      }
      case MAINIMAGE_LIST_FAILURE: {
        draft.st_mainImageListLoading = false;
        draft.st_mainImageListDone = false;
        draft.st_mainImageListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MAINIMAGE_CREATE_REQUEST: {
        draft.st_mainImageCreateLoading = true;
        draft.st_mainImageCreateDone = false;
        draft.st_mainImageCreateError = null;
        break;
      }
      case MAINIMAGE_CREATE_SUCCESS: {
        draft.st_mainImageCreateLoading = false;
        draft.st_mainImageCreateDone = true;
        draft.st_mainImageCreateError = null;
        break;
      }
      case MAINIMAGE_CREATE_FAILURE: {
        draft.st_mainImageCreateLoading = false;
        draft.st_mainImageCreateDone = false;
        draft.st_mainImageCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MAINIMAGE_UPDATE_REQUEST: {
        draft.st_mainImageUpdateLoading = true;
        draft.st_mainImageUpdateDone = false;
        draft.st_mainImageUpdateError = null;
        break;
      }
      case MAINIMAGE_UPDATE_SUCCESS: {
        draft.st_mainImageUpdateLoading = false;
        draft.st_mainImageUpdateDone = true;
        draft.st_mainImageUpdateError = null;
        break;
      }
      case MAINIMAGE_UPDATE_FAILURE: {
        draft.st_mainImageUpdateLoading = false;
        draft.st_mainImageUpdateDone = false;
        draft.st_mainImageUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MAINIMAGE_DELETE_REQUEST: {
        draft.st_mainImageDeleteLoading = true;
        draft.st_mainImageDeleteDone = false;
        draft.st_mainImageDeleteError = null;
        break;
      }
      case MAINIMAGE_DELETE_SUCCESS: {
        draft.st_mainImageDeleteLoading = false;
        draft.st_mainImageDeleteDone = true;
        draft.st_mainImageDeleteError = null;
        break;
      }
      case MAINIMAGE_DELETE_FAILURE: {
        draft.st_mainImageDeleteLoading = false;
        draft.st_mainImageDeleteDone = false;
        draft.st_mainImageDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MAINIMAGE_UPLOAD_REQUEST: {
        draft.st_mainImageUploadLoading = true;
        draft.st_mainImageUploadDone = false;
        draft.st_mainImageUploadError = null;
        break;
      }
      case MAINIMAGE_UPLOAD_SUCCESS: {
        draft.st_mainImageUploadLoading = false;
        draft.st_mainImageUploadDone = true;
        draft.st_mainImageUploadError = null;
        draft.mainImagePath = action.data.path;
        break;
      }
      case MAINIMAGE_UPLOAD_FAILURE: {
        draft.st_mainImageUploadLoading = false;
        draft.st_mainImageUploadDone = false;
        draft.st_mainImageUploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MAINIMAGE_HISTORY_LIST_REQUEST: {
        draft.st_mainImageHistoryListLoading = true;
        draft.st_mainImageHistoryListDone = false;
        draft.st_mainImageHistoryListError = null;
        break;
      }
      case MAINIMAGE_HISTORY_LIST_SUCCESS: {
        draft.st_mainImageHistoryListLoading = false;
        draft.st_mainImageHistoryListDone = true;
        draft.st_mainImageHistoryListError = null;
        draft.mainImageHistoryList = action.data;
        break;
      }
      case MAINIMAGE_HISTORY_LIST_FAILURE: {
        draft.st_mainImageHistoryListLoading = false;
        draft.st_mainImageHistoryListDone = false;
        draft.st_mainImageHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case MAINIMAGE_IMAGE_RESET: {
        draft.mainImagePath = null;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
