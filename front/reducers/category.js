import produce from "../util/produce";

export const initailState = {
  upList: [],
  downList: [],
  //
  // 1뎁스 카테고리 가져오기
  st_upListLoading: false,
  st_upListDone: false,
  st_upListError: null,
  //
  // 1뎁스 카테고리 추가하기
  st_upNewLoading: false,
  st_upNewDone: false,
  st_upNewError: null,
  //
  // 1뎁스 카테고리 수정하기
  st_upUpdateLoading: false,
  st_upUpdateDone: false,
  st_upUpdateError: null,
  //
  // 1뎁스 카테고리 삭제
  st_upDelLoading: false,
  st_upDelDone: false,
  st_upDelError: null,
  //
  // 2뎁스 카테고리 가져오기
  st_downListLoading: false,
  st_downListDone: false,
  st_downListError: null,
  //
  // 2뎁스 카테고리 생성하기
  st_downNewLoading: false,
  st_downNewDone: false,
  st_downNewError: null,
  //
  // 2뎁스 카테고리 수정하기
  st_downUpdateLoading: false,
  st_downUpdateDone: false,
  st_downUpdateError: null,
  //
  // 2뎁스 카테고리 삭제하기
  st_downDelLoading: false,
  st_downDelDone: false,
  st_downDelError: null,
};

export const UP_LIST_REQUEST = "UP_LIST_REQUEST";
export const UP_LIST_SUCCESS = "UP_LIST_SUCCESS";
export const UP_LIST_FAILURE = "UP_LIST_FAILURE";

export const UP_NEW_REQUEST = "UP_NEW_REQUEST";
export const UP_NEW_SUCCESS = "UP_NEW_SUCCESS";
export const UP_NEW_FAILURE = "UP_NEW_FAILURE";

export const UP_UPDATE_REQUEST = "UP_UPDATE_REQUEST";
export const UP_UPDATE_SUCCESS = "UP_UPDATE_SUCCESS";
export const UP_UPDATE_FAILURE = "UP_UPDATE_FAILURE";

export const UP_DEL_REQUEST = "UP_DEL_REQUEST";
export const UP_DEL_SUCCESS = "UP_DEL_SUCCESS";
export const UP_DEL_FAILURE = "UP_DEL_FAILURE";

export const DOWN_LIST_REQUEST = "DOWN_LIST_REQUEST";
export const DOWN_LIST_SUCCESS = "DOWN_LIST_SUCCESS";
export const DOWN_LIST_FAILURE = "DOWN_LIST_FAILURE";

export const DOWN_NEW_REQUEST = "DOWN_NEW_REQUEST";
export const DOWN_NEW_SUCCESS = "DOWN_NEW_SUCCESS";
export const DOWN_NEW_FAILURE = "DOWN_NEW_FAILURE";

export const DOWN_UPDATE_REQUEST = "DOWN_UPDATE_REQUEST";
export const DOWN_UPDATE_SUCCESS = "DOWN_UPDATE_SUCCESS";
export const DOWN_UPDATE_FAILURE = "DOWN_UPDATE_FAILURE";

export const DOWN_DEL_REQUEST = "DOWN_DEL_REQUEST";
export const DOWN_DEL_SUCCESS = "DOWN_DEL_SUCCESS";
export const DOWN_DEL_FAILURE = "DOWN_DEL_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UP_LIST_REQUEST: {
        draft.st_upListLoading = true;
        draft.st_upListDone = false;
        draft.st_upListError = null;
        break;
      }

      case UP_LIST_SUCCESS: {
        draft.st_upListLoading = false;
        draft.st_upListDone = true;
        draft.st_upListError = null;
        draft.upList = action.data;
        break;
      }

      case UP_LIST_FAILURE: {
        draft.st_upListLoading = false;
        draft.st_upListDone = false;
        draft.st_upListError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case UP_NEW_REQUEST: {
        draft.st_upNewLoading = true;
        draft.st_upNewDone = false;
        draft.st_upNewError = null;
        break;
      }

      case UP_NEW_SUCCESS: {
        draft.st_upNewLoading = false;
        draft.st_upNewDone = true;
        draft.st_upNewError = null;
        break;
      }

      case UP_NEW_FAILURE: {
        draft.st_upNewLoading = false;
        draft.st_upNewDone = false;
        draft.st_upNewError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case UP_UPDATE_REQUEST: {
        draft.st_upUpdateLoading = true;
        draft.st_upUpdateDone = false;
        draft.st_upUpdateError = null;
        break;
      }

      case UP_UPDATE_SUCCESS: {
        draft.st_upUpdateLoading = false;
        draft.st_upUpdateDone = true;
        draft.st_upUpdateError = null;
        break;
      }

      case UP_UPDATE_FAILURE: {
        draft.st_upUpdateLoading = false;
        draft.st_upUpdateDone = false;
        draft.st_upUpdateError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case UP_DEL_REQUEST: {
        draft.st_upDelLoading = true;
        draft.st_upDelDone = false;
        draft.st_upDelError = null;
        break;
      }

      case UP_DEL_SUCCESS: {
        draft.st_upDelLoading = false;
        draft.st_upDelDone = true;
        draft.st_upDelError = null;
        break;
      }

      case UP_DEL_FAILURE: {
        draft.st_upDelLoading = false;
        draft.st_upDelDone = false;
        draft.st_upDelError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case DOWN_LIST_REQUEST: {
        draft.st_downListLoading = true;
        draft.st_downListDone = false;
        draft.st_downListError = null;
        break;
      }

      case DOWN_LIST_SUCCESS: {
        draft.st_downListLoading = false;
        draft.st_downListDone = true;
        draft.st_downListError = null;
        draft.downList = action.data;
        break;
      }

      case DOWN_LIST_FAILURE: {
        draft.st_downListLoading = false;
        draft.st_downListDone = false;
        draft.st_downListError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case DOWN_NEW_REQUEST: {
        draft.st_downNewLoading = true;
        draft.st_downNewDone = false;
        draft.st_downNewError = null;
        break;
      }

      case DOWN_NEW_SUCCESS: {
        draft.st_downNewLoading = false;
        draft.st_downNewDone = true;
        draft.st_downNewError = null;
        break;
      }

      case DOWN_NEW_FAILURE: {
        draft.st_downNewLoading = false;
        draft.st_downNewDone = false;
        draft.st_downNewError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case DOWN_UPDATE_REQUEST: {
        draft.st_downUpdateLoading = true;
        draft.st_downUpdateDone = false;
        draft.st_downUpdateError = null;
        break;
      }

      case DOWN_UPDATE_SUCCESS: {
        draft.st_downUpdateLoading = false;
        draft.st_downUpdateDone = true;
        draft.st_downUpdateError = null;
        break;
      }

      case DOWN_UPDATE_FAILURE: {
        draft.st_downUpdateLoading = false;
        draft.st_downUpdateDone = false;
        draft.st_downUpdateError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////
      case DOWN_DEL_REQUEST: {
        draft.st_downDelLoading = true;
        draft.st_downDelDone = false;
        draft.st_downDelError = null;
        break;
      }

      case DOWN_DEL_SUCCESS: {
        draft.st_downDelLoading = false;
        draft.st_downDelDone = true;
        draft.st_downDelError = null;
        break;
      }

      case DOWN_DEL_FAILURE: {
        draft.st_downDelLoading = false;
        draft.st_downDelDone = false;
        draft.st_downDelError = action.data.error;
        break;
      }
      ////////////////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
