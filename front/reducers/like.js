import produce from "../util/produce";

export const initailState = {
  likeList: [],
  likePage: 1,

  //
  st_likeListLoading: false, // like 가져오기
  st_likeListDone: false,
  st_likeListError: null,

  //
  st_likeCreateLoading: false, // like 생성하기
  st_likeCreateDone: false,
  st_likeCreateError: null,
  //
  st_likeDeleteLoading: false, // like 삭제하기
  st_likeDeleteDone: false,
  st_likeDeleteError: null,
};

export const LIKE_LIST_REQUEST = "LIKE_LIST_REQUEST";
export const LIKE_LIST_SUCCESS = "LIKE_LIST_SUCCESS";
export const LIKE_LIST_FAILURE = "LIKE_LIST_FAILURE";

export const LIKE_CREATE_REQUEST = "LIKE_CREATE_REQUEST";
export const LIKE_CREATE_SUCCESS = "LIKE_CREATE_SUCCESS";
export const LIKE_CREATE_FAILURE = "LIKE_CREATE_FAILURE";

export const LIKE_DELETE_REQUEST = "LIKE_DELETE_REQUEST";
export const LIKE_DELETE_SUCCESS = "LIKE_DELETE_SUCCESS";
export const LIKE_DELETE_FAILURE = "LIKE_DELETE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LIKE_LIST_REQUEST: {
        draft.st_likeListLoading = true;
        draft.st_likeListDone = false;
        draft.st_likeListError = null;
        break;
      }
      case LIKE_LIST_SUCCESS: {
        draft.st_likeListLoading = false;
        draft.st_likeListDone = true;
        draft.st_likeListError = null;
        draft.likeList = action.data.product;
        draft.likePage = action.data.lastPage;
        break;
      }
      case LIKE_LIST_FAILURE: {
        draft.st_likeListLoading = false;
        draft.st_likeListDone = false;
        draft.st_likeListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case LIKE_CREATE_REQUEST: {
        draft.st_likeCreateLoading = true;
        draft.st_likeCreateDone = false;
        draft.st_likeCreateError = null;
        break;
      }
      case LIKE_CREATE_SUCCESS: {
        draft.st_likeCreateLoading = false;
        draft.st_likeCreateDone = true;
        draft.st_likeCreateError = null;
        break;
      }
      case LIKE_CREATE_FAILURE: {
        draft.st_likeCreateLoading = false;
        draft.st_likeCreateDone = false;
        draft.st_likeCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case LIKE_DELETE_REQUEST: {
        draft.st_likeDeleteLoading = true;
        draft.st_likeDeleteDone = false;
        draft.st_likeDeleteError = null;
        break;
      }
      case LIKE_DELETE_SUCCESS: {
        draft.st_likeDeleteLoading = false;
        draft.st_likeDeleteDone = true;
        draft.st_likeDeleteError = null;
        break;
      }
      case LIKE_DELETE_FAILURE: {
        draft.st_likeDeleteLoading = false;
        draft.st_likeDeleteDone = false;
        draft.st_likeDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
