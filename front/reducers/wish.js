import produce from "../util/produce";

export const initailState = {
  boughtAdminList: [], // 결제내역목록(관리자)
  items: [], // 장바구니 상품
  itemListView: [], // 장바구니 리스트
  boughtId: null, // 구매아이디
  //
  st_itemCreateLoading: false, // 장바구니 상품 추가
  st_itemCreateDone: false,
  st_itemCreateError: null,
  //
  st_itemUpdateLoading: false, // 장바구니 상품 수량 수정
  st_itemUpdateDone: false,
  st_itemUpdateError: null,
  //
  st_itemDeleteLoading: false, // 장바구니 상품 삭제
  st_itemDeleteDone: false,
  st_itemDeleteError: null,
  //
  st_itemDeleteAllLoading: false, // 장바구니 상품 전체삭제
  st_itemDeleteAllDone: false,
  st_itemDeleteAllError: null,
  //
  st_itemListViewLoading: false, // 장바구니 리스트
  st_itemListViewDone: false,
  st_itemListViewError: null,
  //
  st_boughtAdminListLoading: false, // 결제내역 목록(관리자)
  st_boughtAdminListDone: false,
  st_boughtAdminListError: null,
  //
  st_boughtCreateLoading: false, // 구매하기
  st_boughtCreateDone: false,
  st_boughtCreateError: null,
  //
};

// 장바구니 상품 추가
export const ITEM_CREATE_REQUEST = "ITEM_CREATE_REQUEST";
export const ITEM_CREATE_SUCCESS = "ITEM_CREATE_SUCCESS";
export const ITEM_CREATE_FAILURE = "ITEM_CREATE_FAILURE";
// 장바구니 상품 수량 수정
export const ITEM_UPDATE_REQUEST = "ITEM_UPDATE_REQUEST";
export const ITEM_UPDATE_SUCCESS = "ITEM_UPDATE_SUCCESS";
export const ITEM_UPDATE_FAILURE = "ITEM_UPDATE_FAILURE";
// 장바구니 상품 삭제
export const ITEM_DELETE_REQUEST = "ITEM_DELETE_REQUEST";
export const ITEM_DELETE_SUCCESS = "ITEM_DELETE_SUCCESS";
export const ITEM_DELETE_FAILURE = "ITEM_DELETE_FAILURE";
// 장바구니 상품 전체삭제
export const ITEM_DELETE_ALL_REQUEST = "ITEM_DELETE_ALL_REQUEST";
export const ITEM_DELETE_ALL_SUCCESS = "ITEM_DELETE_ALL_SUCCESS";
export const ITEM_DELETE_ALL_FAILURE = "ITEM_DELETE_ALL_FAILURE";
// 장바구니 상품 리스트
export const ITEM_LIST_VIEW_REQUEST = "ITEM_LIST_VIEW_REQUEST";
export const ITEM_LIST_VIEW_SUCCESS = "ITEM_LIST_VIEW_SUCCESS";
export const ITEM_LIST_VIEW_FAILURE = "ITEM_LIST_VIEW_FAILURE";
// 결제내역목록 (관리자)
export const BOUGHT_ADMIN_LIST_REQUEST = "BOUGHT_ADMIN_LIST_REQUEST";
export const BOUGHT_ADMIN_LIST_SUCCESS = "BOUGHT_ADMIN_LIST_SUCCESS";
export const BOUGHT_ADMIN_LIST_FAILURE = "BOUGHT_ADMIN_LIST_FAILURE";
// 구매하기
export const BOUGHT_CREATE_REQUEST = "BOUGHT_CREATE_REQUEST";
export const BOUGHT_CREATE_SUCCESS = "BOUGHT_CREATE_SUCCESS";
export const BOUGHT_CREATE_FAILURE = "BOUGHT_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ITEM_CREATE_REQUEST: {
        draft.st_itemCreateLoading = true;
        draft.st_itemCreateDone = false;
        draft.st_itemCreateError = null;
        break;
      }
      case ITEM_CREATE_SUCCESS: {
        draft.st_itemCreateLoading = false;
        draft.st_itemCreateDone = true;
        draft.st_itemCreateError = null;
        draft.items = action.data.items;
        break;
      }
      case ITEM_CREATE_FAILURE: {
        draft.st_itemCreateLoading = false;
        draft.st_itemCreateDone = false;
        draft.st_itemCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ITEM_UPDATE_REQUEST: {
        draft.st_itemUpdateLoading = true;
        draft.st_itemUpdateDone = false;
        draft.st_itemUpdateError = null;
        break;
      }
      case ITEM_UPDATE_SUCCESS: {
        draft.st_itemUpdateLoading = false;
        draft.st_itemUpdateDone = true;
        draft.st_itemUpdateError = null;

        break;
      }
      case ITEM_UPDATE_FAILURE: {
        draft.st_itemUpdateLoading = false;
        draft.st_itemUpdateDone = false;
        draft.st_itemUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ITEM_DELETE_REQUEST: {
        draft.st_itemDeleteLoading = true;
        draft.st_itemDeleteDone = false;
        draft.st_itemDeleteError = null;
        break;
      }
      case ITEM_DELETE_SUCCESS: {
        draft.st_itemDeleteLoading = false;
        draft.st_itemDeleteDone = true;
        draft.st_itemDeleteError = null;

        break;
      }
      case ITEM_DELETE_FAILURE: {
        draft.st_itemDeleteLoading = false;
        draft.st_itemDeleteDone = false;
        draft.st_itemDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ITEM_DELETE_ALL_REQUEST: {
        draft.st_itemDeleteAllLoading = true;
        draft.st_itemDeleteAllDone = false;
        draft.st_itemDeleteAllError = null;
        break;
      }
      case ITEM_DELETE_ALL_SUCCESS: {
        draft.st_itemDeleteAllLoading = false;
        draft.st_itemDeleteAllDone = true;
        draft.st_itemDeleteAllError = null;

        break;
      }
      case ITEM_DELETE_ALL_FAILURE: {
        draft.st_itemDeleteAllLoading = false;
        draft.st_itemDeleteAllDone = false;
        draft.st_itemDeleteAllError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case ITEM_LIST_VIEW_REQUEST: {
        draft.st_itemListViewLoading = true;
        draft.st_itemListViewDone = false;
        draft.st_itemListViewError = null;
        break;
      }
      case ITEM_LIST_VIEW_SUCCESS: {
        draft.st_itemListViewLoading = false;
        draft.st_itemListViewDone = true;
        draft.st_itemListViewError = null;
        draft.itemListView = action.data;

        break;
      }
      case ITEM_LIST_VIEW_FAILURE: {
        draft.st_itemListViewLoading = false;
        draft.st_itemListViewDone = false;
        draft.st_itemListViewError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case BOUGHT_ADMIN_LIST_REQUEST: {
        draft.st_boughtAdminListLoading = true;
        draft.st_boughtAdminListDone = false;
        draft.st_boughtAdminListError = null;
        break;
      }
      case BOUGHT_ADMIN_LIST_SUCCESS: {
        draft.st_boughtAdminListLoading = false;
        draft.st_boughtAdminListDone = true;
        draft.st_boughtAdminListError = null;
        draft.boughtAdminList = action.data;

        break;
      }
      case BOUGHT_ADMIN_LIST_FAILURE: {
        draft.st_boughtAdminListLoading = false;
        draft.st_boughtAdminListDone = false;
        draft.st_boughtAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case BOUGHT_CREATE_REQUEST: {
        draft.st_boughtCreateLoading = true;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = null;
        break;
      }
      case BOUGHT_CREATE_SUCCESS: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = true;
        draft.st_boughtCreateError = null;
        draft.boughtId = action.data.historyId;
        break;
      }
      case BOUGHT_CREATE_FAILURE: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
