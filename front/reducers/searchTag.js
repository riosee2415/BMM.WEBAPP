import produce from "../util/produce";

export const initailState = {
  searchTagList: [],
  searchTagHistoryList: [],

  //
  st_searchTagListLoading: false, // searchTag 가져오기
  st_searchTagListDone: false,
  st_searchTagListError: null,
  //
  st_searchTagCreateLoading: false, // searchTag 생성하기
  st_searchTagCreateDone: false,
  st_searchTagCreateError: null,
  //
  st_searchTagUpdateLoading: false, // searchTag 수정하기
  st_searchTagUpdateDone: false,
  st_searchTagUpdateError: null,
  //
  st_searchTagDeleteLoading: false, // searchTag 삭제하기
  st_searchTagDeleteDone: false,
  st_searchTagDeleteError: null,
  //
  st_searchTagHistoryListLoading: false, // searchTag 이력
  st_searchTagHistoryListDone: false,
  st_searchTagHistoryListError: null,
};

export const SEARCHTAG_LIST_REQUEST = "SEARCHTAG_LIST_REQUEST";
export const SEARCHTAG_LIST_SUCCESS = "SEARCHTAG_LIST_SUCCESS";
export const SEARCHTAG_LIST_FAILURE = "SEARCHTAG_LIST_FAILURE";

export const SEARCHTAG_CREATE_REQUEST = "SEARCHTAG_CREATE_REQUEST";
export const SEARCHTAG_CREATE_SUCCESS = "SEARCHTAG_CREATE_SUCCESS";
export const SEARCHTAG_CREATE_FAILURE = "SEARCHTAG_CREATE_FAILURE";

export const SEARCHTAG_UPDATE_REQUEST = "SEARCHTAG_UPDATE_REQUEST";
export const SEARCHTAG_UPDATE_SUCCESS = "SEARCHTAG_UPDATE_SUCCESS";
export const SEARCHTAG_UPDATE_FAILURE = "SEARCHTAG_UPDATE_FAILURE";

export const SEARCHTAG_DELETE_REQUEST = "SEARCHTAG_DELETE_REQUEST";
export const SEARCHTAG_DELETE_SUCCESS = "SEARCHTAG_DELETE_SUCCESS";
export const SEARCHTAG_DELETE_FAILURE = "SEARCHTAG_DELETE_FAILURE";

export const SEARCHTAG_HISTORY_LIST_REQUEST = "SEARCHTAG_HISTORY_LIST_REQUEST";
export const SEARCHTAG_HISTORY_LIST_SUCCESS = "SEARCHTAG_HISTORY_LIST_SUCCESS";
export const SEARCHTAG_HISTORY_LIST_FAILURE = "SEARCHTAG_HISTORY_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SEARCHTAG_LIST_REQUEST: {
        draft.st_searchTagListLoading = true;
        draft.st_searchTagListDone = false;
        draft.st_searchTagListError = null;
        break;
      }
      case SEARCHTAG_LIST_SUCCESS: {
        draft.st_searchTagListLoading = false;
        draft.st_searchTagListDone = true;
        draft.st_searchTagListError = null;
        draft.searchTagList = action.data;
        break;
      }
      case SEARCHTAG_LIST_FAILURE: {
        draft.st_searchTagListLoading = false;
        draft.st_searchTagListDone = false;
        draft.st_searchTagListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SEARCHTAG_CREATE_REQUEST: {
        draft.st_searchTagCreateLoading = true;
        draft.st_searchTagCreateDone = false;
        draft.st_searchTagCreateError = null;
        break;
      }
      case SEARCHTAG_CREATE_SUCCESS: {
        draft.st_searchTagCreateLoading = false;
        draft.st_searchTagCreateDone = true;
        draft.st_searchTagCreateError = null;
        break;
      }
      case SEARCHTAG_CREATE_FAILURE: {
        draft.st_searchTagCreateLoading = false;
        draft.st_searchTagCreateDone = false;
        draft.st_searchTagCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SEARCHTAG_UPDATE_REQUEST: {
        draft.st_searchTagUpdateLoading = true;
        draft.st_searchTagUpdateDone = false;
        draft.st_searchTagUpdateError = null;
        break;
      }
      case SEARCHTAG_UPDATE_SUCCESS: {
        draft.st_searchTagUpdateLoading = false;
        draft.st_searchTagUpdateDone = true;
        draft.st_searchTagUpdateError = null;
        break;
      }
      case SEARCHTAG_UPDATE_FAILURE: {
        draft.st_searchTagUpdateLoading = false;
        draft.st_searchTagUpdateDone = false;
        draft.st_searchTagUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SEARCHTAG_DELETE_REQUEST: {
        draft.st_searchTagDeleteLoading = true;
        draft.st_searchTagDeleteDone = false;
        draft.st_searchTagDeleteError = null;
        break;
      }
      case SEARCHTAG_DELETE_SUCCESS: {
        draft.st_searchTagDeleteLoading = false;
        draft.st_searchTagDeleteDone = true;
        draft.st_searchTagDeleteError = null;
        break;
      }
      case SEARCHTAG_DELETE_FAILURE: {
        draft.st_searchTagDeleteLoading = false;
        draft.st_searchTagDeleteDone = false;
        draft.st_searchTagDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SEARCHTAG_HISTORY_LIST_REQUEST: {
        draft.st_searchTagHistoryListLoading = true;
        draft.st_searchTagHistoryListDone = false;
        draft.st_searchTagHistoryListError = null;
        break;
      }
      case SEARCHTAG_HISTORY_LIST_SUCCESS: {
        draft.st_searchTagHistoryListLoading = false;
        draft.st_searchTagHistoryListDone = true;
        draft.st_searchTagHistoryListError = null;
        draft.searchTagHistoryList = action.data;
        break;
      }
      case SEARCHTAG_HISTORY_LIST_FAILURE: {
        draft.st_searchTagHistoryListLoading = false;
        draft.st_searchTagHistoryListDone = false;
        draft.st_searchTagHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
