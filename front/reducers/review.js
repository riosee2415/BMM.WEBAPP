import produce from "../util/produce";

export const initailState = {
  myReviewList: [], //나의리뷰내역리스트
  page: 1,
  reviewAdminList: [], //관리자리스트
  myReviewDetail: null, //나의리뷰내역상세
  productReviewList: [], //상품 별 리뷰 리스트

  //   requestMyList: [], //마이페이지 상품요청리스트

  //   requestData: null, // 상품요청 데이터

  reviewImage1Path: null,
  reviewImage2Path: null,
  reviewImage3Path: null,
  reviewImage4Path: null,

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
  //
  st_reviewImage1UploadLoading: false, // 리뷰 이미지1 업로드
  st_reviewImage1UploadDone: false,
  st_reviewImage1UploadError: null,
  //
  st_reviewImage2UploadLoading: false, // 리뷰 이미지2 업로드
  st_reviewImage2UploadDone: false,
  st_reviewImage2UploadError: null,
  //
  st_reviewImage3UploadLoading: false, // 리뷰 이미지3 업로드
  st_reviewImage3UploadDone: false,
  st_reviewImage3UploadError: null,
  //
  st_reviewImage4UploadLoading: false, // 리뷰 이미지4 업로드
  st_reviewImage4UploadDone: false,
  st_reviewImage4UploadError: null,
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

export const REVIEW_IMAGE1_UPLOAD_REQUEST = "REVIEW_IMAGE1_UPLOAD_REQUEST"; // 리뷰 이미지1 업로드
export const REVIEW_IMAGE1_UPLOAD_SUCCESS = "REVIEW_IMAGE1_UPLOAD_SUCCESS";
export const REVIEW_IMAGE1_UPLOAD_FAILURE = "REVIEW_IMAGE1_UPLOAD_FAILURE";

export const REVIEW_IMAGE2_UPLOAD_REQUEST = "REVIEW_IMAGE2_UPLOAD_REQUEST"; // 리뷰 이미지2 업로드
export const REVIEW_IMAGE2_UPLOAD_SUCCESS = "REVIEW_IMAGE2_UPLOAD_SUCCESS";
export const REVIEW_IMAGE2_UPLOAD_FAILURE = "REVIEW_IMAGE2_UPLOAD_FAILURE";

export const REVIEW_IMAGE3_UPLOAD_REQUEST = "REVIEW_IMAGE3_UPLOAD_REQUEST"; // 리뷰 이미지3 업로드
export const REVIEW_IMAGE3_UPLOAD_SUCCESS = "REVIEW_IMAGE3_UPLOAD_SUCCESS";
export const REVIEW_IMAGE3_UPLOAD_FAILURE = "REVIEW_IMAGE3_UPLOAD_FAILURE";

export const REVIEW_IMAGE4_UPLOAD_REQUEST = "REVIEW_IMAGE4_UPLOAD_REQUEST"; // 리뷰 이미지4 업로드
export const REVIEW_IMAGE4_UPLOAD_SUCCESS = "REVIEW_IMAGE4_UPLOAD_SUCCESS";
export const REVIEW_IMAGE4_UPLOAD_FAILURE = "REVIEW_IMAGE4_UPLOAD_FAILURE";
//
export const REVIEW_IMAGE1_RESET = "REVIEW_IMAGE1_RESET";
export const REVIEW_IMAGE2_RESET = "REVIEW_IMAGE2_RESET";
export const REVIEW_IMAGE3_RESET = "REVIEW_IMAGE3_RESET";
export const REVIEW_IMAGE4_RESET = "REVIEW_IMAGE4_RESET";

export const REVIEW_ALL_RESET = "REVIEW_ALL_RESET";

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

      case REVIEW_IMAGE1_UPLOAD_REQUEST: {
        draft.st_reviewImage1UploadLoading = true;
        draft.st_reviewImage1UploadDone = false;
        draft.st_reviewImage1UploadError = null;
        break;
      }
      case REVIEW_IMAGE1_UPLOAD_SUCCESS: {
        draft.st_reviewImage1UploadLoading = false;
        draft.st_reviewImage1UploadDone = true;
        draft.st_reviewImage1UploadError = null;
        draft.reviewImage1Path = action.data.path;
        break;
      }
      case REVIEW_IMAGE1_UPLOAD_FAILURE: {
        draft.st_reviewImage1UploadLoading = false;
        draft.st_reviewImage1UploadDone = false;
        draft.st_reviewImage1UploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_IMAGE2_UPLOAD_REQUEST: {
        draft.st_reviewImage2UploadLoading = true;
        draft.st_reviewImage2UploadDone = false;
        draft.st_reviewImage2UploadError = null;
        break;
      }
      case REVIEW_IMAGE2_UPLOAD_SUCCESS: {
        draft.st_reviewImage2UploadLoading = false;
        draft.st_reviewImage2UploadDone = true;
        draft.st_reviewImage2UploadError = null;
        draft.reviewImage2Path = action.data.path;
        break;
      }
      case REVIEW_IMAGE2_UPLOAD_FAILURE: {
        draft.st_reviewImage2UploadLoading = false;
        draft.st_reviewImage2UploadDone = false;
        draft.st_reviewImage2UploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_IMAGE3_UPLOAD_REQUEST: {
        draft.st_reviewImage1UploadLoading = true;
        draft.st_reviewImage1UploadDone = false;
        draft.st_reviewImage1UploadError = null;
        break;
      }
      case REVIEW_IMAGE3_UPLOAD_SUCCESS: {
        draft.st_reviewImage3UploadLoading = false;
        draft.st_reviewImage3UploadDone = true;
        draft.st_reviewImage3UploadError = null;
        draft.reviewImage3Path = action.data.path;
        break;
      }
      case REVIEW_IMAGE3_UPLOAD_FAILURE: {
        draft.st_reviewImage3UploadLoading = false;
        draft.st_reviewImage3UploadDone = false;
        draft.st_reviewImage3UploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_IMAGE4_UPLOAD_REQUEST: {
        draft.st_reviewImage4UploadLoading = true;
        draft.st_reviewImage4UploadDone = false;
        draft.st_reviewImage4UploadError = null;
        break;
      }
      case REVIEW_IMAGE4_UPLOAD_SUCCESS: {
        draft.st_reviewImage4UploadLoading = false;
        draft.st_reviewImage4UploadDone = true;
        draft.st_reviewImage4UploadError = null;
        draft.reviewImage4Path = action.data.path;
        break;
      }
      case REVIEW_IMAGE4_UPLOAD_FAILURE: {
        draft.st_reviewImage4UploadLoading = false;
        draft.st_reviewImage4UploadDone = false;
        draft.st_reviewImage4UploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case REVIEW_ALL_RESET: {
        draft.reviewImage1Path = null;
        draft.reviewImage2Path = null;
        draft.reviewImage3Path = null;
        draft.reviewImage4Path = null;
      }

      case REVIEW_IMAGE1_RESET: {
        draft.reviewImage1Path = null;
      }
      case REVIEW_IMAGE2_RESET: {
        draft.reviewImage2Path = null;
      }
      case REVIEW_IMAGE3_RESET: {
        draft.reviewImage3Path = null;
      }
      case REVIEW_IMAGE4_RESET: {
        draft.reviewImage4Path = null;
      }
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
