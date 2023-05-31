import produce from "../util/produce";

export const initailState = {
  myReviewList: [], //나의리뷰내역리스트
  page: 1,
  reviewAdminList: [], //관리자리스트
  myReviewDetail: null, //나의리뷰내역상세
  productReviewList: [], //상품 별 리뷰 리스트

  //   requestMyList: [], //마이페이지 상품요청리스트

  //   requestData: null, // 상품요청 데이터

  //
  st_myReviewListLoading: false, // 나의 리뷰내역 가져오기
  st_myReviewListDone: false,
  st_myReviewListError: null,
  //
  st_productReviewListLoading: false, // 상품 별 리뷰 리스트
  st_productReviewListDone: false,
  st_productReviewListError: null,
  //
  st_myReviewListDetailLoading: false, // 나의 리뷰내역 상세목록 가져오기
  st_myReviewListDetailDone: false,
  st_myReviewListDetailError: null,
  //
  st_myReviewCreateLoading: false, // 리뷰 작성하기
  st_myReviewCreateDone: false,
  st_myReviewCreateError: null,
  //
  st_myReviewUpdateLoading: false, // 리뷰 수정하기
  st_myReviewUpdateDone: false,
  st_myReviewUpdateError: null,
  //
  st_questionDeleteLoading: false, // 리뷰 삭제하기
  st_questionDeleteDone: false,
  st_questionDeleteError: null,
};

export const MY_REVIEW_REQUEST = "MY_REVIEW_REQUEST"; // 나의 리뷰내역 가져오기
export const MY_REVIEW_SUCCESS = "MY_REVIEW_SUCCESS";
export const MY_REVIEW_FAILURE = "MY_REVIEW_FAILURE";

export const PRODUCT_REVIEW_REQUEST = "PRODUCT_REVIEW_REQUEST"; // 나의 리뷰내역 가져오기
export const PRODUCT_REVIEW_SUCCESS = "PRODUCT_REVIEW_SUCCESS";
export const PRODUCT_REVIEW_FAILURE = "PRODUCT_REVIEW_FAILURE";

export const MY_REVIEW_DETAIL_REQUEST = "MY_REVIEW_DETAIL_REQUEST"; // 나의 리뷰내역 상세목록 가져오기
export const MY_REVIEW_DETAIL_SUCCESS = "MY_REVIEW_DETAIL_SUCCESS";
export const MY_REVIEW_DETAIL_FAILURE = "MY_REVIEW_DETAIL_FAILURE";

export const REVIEW_CREATE_REQUEST = "REVIEW_CREATE_REQUEST"; // 리뷰 작성하기
export const REVIEW_CREATE_SUCCESS = "REVIEW_CREATE_SUCCESS";
export const REVIEW_CREATE_FAILURE = "REVIEW_CREATE_FAILURE";

export const REVIEW_UPDATE_REQUEST = "REVIEW_UPDATE_REQUEST"; // 리뷰 수정하기
export const REVIEW_UPDATE_SUCCESS = "REVIEW_UPDATE_SUCCESS";
export const REVIEW_UPDATE_FAILURE = "REVIEW_UPDATE_FAILURE";

export const REVIEW_DELETE_REQUEST = "REVIEW_DELETE_REQUEST"; // 리뷰 삭제하기
export const REVIEW_DELETE_SUCCESS = "REVIEW_DELETE_SUCCESS";
export const REVIEW_DELETE_FAILURE = "REVIEW_DELETE_FAILURE";

// export const DATA = "DATA";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_REVIEW_REQUEST: {
        draft.st_myReviewListLoading = true;
        draft.st_myReviewListDone = false;
        draft.st_myReviewListError = null;
        break;
      }
      case MY_REVIEW_SUCCESS: {
        draft.st_myReviewListLoading = false;
        draft.st_myReviewListDone = true;
        draft.st_myReviewListError = null;
        draft.page = action.data.lastPage;
        draft.myReviewList = action.data.reviews;

        break;
      }
      case MY_REVIEW_FAILURE: {
        draft.st_myReviewListLoading = false;
        draft.st_myReviewListDone = false;
        draft.st_myReviewListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case PRODUCT_REVIEW_REQUEST: {
        draft.st_productReviewListLoading = true;
        draft.st_productReviewListDone = false;
        draft.st_productReviewListError = null;
        break;
      }
      case PRODUCT_REVIEW_SUCCESS: {
        draft.st_productReviewListLoading = false;
        draft.st_productReviewListDone = true;
        draft.st_productReviewListError = null;
        draft.productReviewList = action.data;

        break;
      }
      case PRODUCT_REVIEW_FAILURE: {
        draft.st_productReviewListLoading = false;
        draft.st_productReviewListDone = false;
        draft.st_productReviewListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case MY_REVIEW_DETAIL_REQUEST: {
        draft.st_myReviewListDetailLoading = true;
        draft.st_myReviewListDetailDone = false;
        draft.st_myReviewListDetailError = null;
        break;
      }
      case MY_REVIEW_DETAIL_SUCCESS: {
        draft.st_myReviewListDetailLoading = false;
        draft.st_myReviewListDetailDone = true;
        draft.st_myReviewListDetailError = null;
        draft.myReviewDetail = action.data;

        break;
      }
      case MY_REVIEW_DETAIL_FAILURE: {
        draft.st_myReviewListDetailLoading = false;
        draft.st_myReviewListDetailDone = false;
        draft.st_myReviewListDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_CREATE_REQUEST: {
        draft.st_myReviewCreateLoading = true;
        draft.st_myReviewCreateDone = false;
        draft.st_myReviewCreateError = null;
        break;
      }
      case REVIEW_CREATE_SUCCESS: {
        draft.st_myReviewCreateLoading = false;
        draft.st_myReviewCreateDone = true;
        draft.st_myReviewCreateError = null;
        break;
      }
      case REVIEW_CREATE_FAILURE: {
        draft.st_myReviewCreateLoading = false;
        draft.st_myReviewCreateDone = false;
        draft.st_myReviewCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_UPDATE_REQUEST: {
        draft.st_myReviewUpdateLoading = true;
        draft.st_myReviewUpdateDone = false;
        draft.st_myReviewUpdateError = null;
        break;
      }
      case REVIEW_UPDATE_SUCCESS: {
        draft.st_myReviewUpdateLoading = false;
        draft.st_myReviewUpdateDone = true;
        draft.st_myReviewUpdateError = null;
        break;
      }
      case REVIEW_UPDATE_FAILURE: {
        draft.st_myReviewUpdateLoading = false;
        draft.st_myReviewUpdateDone = false;
        draft.st_myReviewUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_DELETE_REQUEST: {
        draft.st_questionDeleteLoading = true;
        draft.st_questionDeleteDone = false;
        draft.st_questionDeleteError = null;
        break;
      }
      case REVIEW_DELETE_SUCCESS: {
        draft.st_questionDeleteLoading = false;
        draft.st_questionDeleteDone = true;
        draft.st_questionDeleteError = null;
        break;
      }
      case REVIEW_DELETE_FAILURE: {
        draft.st_questionDeleteLoading = false;
        draft.st_questionDeleteDone = false;
        draft.st_questionDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      //   case REQUEST_DATA: {
      //     draft.requestData = action.data;
      //   }

      //   case REQUEST_DATA: {
      //     draft.requestData = action.data;
      //     break;
      //   }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
