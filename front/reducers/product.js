import produce from "../util/produce";

export const initailState = {
  productList: [], // 상품 리스트
  productPage: 1, // 상품 리스트 페이지
  productLecoList: [], // 추천 상품 리스트
  productAdminList: [], // 관리자 상품 리스트

  productDetail: null, // 상품 상세

  productOptionList: [], // 상품 옵션 리스트

  productTagList: [], // 상품 태그 리스트

  productPath1: null, // 이미지 1
  productPath2: null, // 이미지 2
  productPath3: null, // 이미지 3
  productPath4: null, // 이미지 4
  productDetail: null, // 상세이미지

  productHistoryList: [],

  //
  st_productListLoading: false, // product 가져오기
  st_productListDone: false,
  st_productListError: null,
  //
  st_productLecoListLoading: false, // product 추천 가져오기
  st_productLecoListDone: false,
  st_productLecoListError: null,
  //
  st_productAdminListLoading: false, // product 관리자 가져오기
  st_productAdminListDone: false,
  st_productAdminListError: null,
  //
  st_productDetailLoading: false, // product detail 가져오기
  st_productDetailDone: false,
  st_productDetailError: null,
  //
  st_productCreateLoading: false, // product 생성하기
  st_productCreateDone: false,
  st_productCreateError: null,
  //
  st_productUpdateLoading: false, // product 수정하기
  st_productUpdateDone: false,
  st_productUpdateError: null,
  //
  st_productLecoUpdateLoading: false, // product 추천 여부 수정하기
  st_productLecoUpdateDone: false,
  st_productLecoUpdateError: null,
  //
  st_productDeleteLoading: false, // product 삭제하기
  st_productDeleteDone: false,
  st_productDeleteError: null,
  //
  st_productUpload1Loading: false, // product 이미지 1 등록
  st_productUpload1Done: false,
  st_productUpload1Error: null,
  //
  st_productUpload2Loading: false, // product 이미지 2 등록
  st_productUpload2Done: false,
  st_productUpload2Error: null,
  //
  st_productUpload3Loading: false, // product 이미지 3 등록
  st_productUpload3Done: false,
  st_productUpload3Error: null,
  //
  st_productUpload4Loading: false, // product 이미지 4 등록
  st_productUpload4Done: false,
  st_productUpload4Error: null,
  //
  st_productUpload5Loading: false, // product 이미지 5 등록
  st_productUpload5Done: false,
  st_productUpload5Error: null,
  //
  st_productHistoryListLoading: false, // product 이력
  st_productHistoryListDone: false,
  st_productHistoryListError: null,
  //
  st_productOptionListLoading: false, // product 옵션 가져오기
  st_productOptionListDone: false,
  st_productOptionListError: null,
  //
  st_productOptionCreateLoading: false, // product 옵션 생성
  st_productOptionCreateDone: false,
  st_productOptionCreateError: null,
  //
  st_productOptionUpdateLoading: false, // product 옵션 수정
  st_productOptionUpdateDone: false,
  st_productOptionUpdateError: null,
  //
  st_productOptionDeleteLoading: false, // product 옵션 삭제
  st_productOptionDeleteDone: false,
  st_productOptionDeleteError: null,
  //
  st_productTagListLoading: false, // product 태그 가져오기
  st_productTagListDone: false,
  st_productTagListError: null,
  //
  st_productTagCreateLoading: false, // product 태그 생성
  st_productTagCreateDone: false,
  st_productTagCreateError: null,
  //
  st_productTagUpdateLoading: false, // product 태그 수정
  st_productTagUpdateDone: false,
  st_productTagUpdateError: null,
  //
  st_productTagDeleteLoading: false, // product 태그 삭제
  st_productTagDeleteDone: false,
  st_productTagDeleteError: null,
  //
};

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";

export const PRODUCT_LECO_LIST_REQUEST = "PRODUCT_LECO_LIST_REQUEST";
export const PRODUCT_LECO_LIST_SUCCESS = "PRODUCT_LECO_LIST_SUCCESS";
export const PRODUCT_LECO_LIST_FAILURE = "PRODUCT_LECO_LIST_FAILURE";

export const PRODUCT_ADMIN_LIST_REQUEST = "PRODUCT_ADMIN_LIST_REQUEST";
export const PRODUCT_ADMIN_LIST_SUCCESS = "PRODUCT_ADMIN_LIST_SUCCESS";
export const PRODUCT_ADMIN_LIST_FAILURE = "PRODUCT_ADMIN_LIST_FAILURE";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAILURE = "PRODUCT_DETAIL_FAILURE";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAILURE = "PRODUCT_CREATE_FAILURE";

export const PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST";
export const PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS";
export const PRODUCT_UPDATE_FAILURE = "PRODUCT_UPDATE_FAILURE";

export const PRODUCT_LECO_UPDATE_REQUEST = "PRODUCT_LECO_UPDATE_REQUEST";
export const PRODUCT_LECO_UPDATE_SUCCESS = "PRODUCT_LECO_UPDATE_SUCCESS";
export const PRODUCT_LECO_UPDATE_FAILURE = "PRODUCT_LECO_UPDATE_FAILURE";

export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
export const PRODUCT_DELETE_FAILURE = "PRODUCT_DELETE_FAILURE";

export const PRODUCT_UPLOAD1_REQUEST = "PRODUCT_UPLOAD1_REQUEST";
export const PRODUCT_UPLOAD1_SUCCESS = "PRODUCT_UPLOAD1_SUCCESS";
export const PRODUCT_UPLOAD1_FAILURE = "PRODUCT_UPLOAD1_FAILURE";

export const PRODUCT_UPLOAD2_REQUEST = "PRODUCT_UPLOAD2_REQUEST";
export const PRODUCT_UPLOAD2_SUCCESS = "PRODUCT_UPLOAD2_SUCCESS";
export const PRODUCT_UPLOAD2_FAILURE = "PRODUCT_UPLOAD2_FAILURE";

export const PRODUCT_UPLOAD3_REQUEST = "PRODUCT_UPLOAD3_REQUEST";
export const PRODUCT_UPLOAD3_SUCCESS = "PRODUCT_UPLOAD3_SUCCESS";
export const PRODUCT_UPLOAD3_FAILURE = "PRODUCT_UPLOAD3_FAILURE";

export const PRODUCT_UPLOAD4_REQUEST = "PRODUCT_UPLOAD4_REQUEST";
export const PRODUCT_UPLOAD4_SUCCESS = "PRODUCT_UPLOAD4_SUCCESS";
export const PRODUCT_UPLOAD4_FAILURE = "PRODUCT_UPLOAD4_FAILURE";

export const PRODUCT_UPLOAD5_REQUEST = "PRODUCT_UPLOAD5_REQUEST";
export const PRODUCT_UPLOAD5_SUCCESS = "PRODUCT_UPLOAD5_SUCCESS";
export const PRODUCT_UPLOAD5_FAILURE = "PRODUCT_UPLOAD5_FAILURE";

export const PRODUCT_HISTORY_LIST_REQUEST = "PRODUCT_HISTORY_LIST_REQUEST";
export const PRODUCT_HISTORY_LIST_SUCCESS = "PRODUCT_HISTORY_LIST_SUCCESS";
export const PRODUCT_HISTORY_LIST_FAILURE = "PRODUCT_HISTORY_LIST_FAILURE";

export const PRODUCT_OPTION_LIST_REQUEST = "PRODUCT_OPTION_LIST_REQUEST";
export const PRODUCT_OPTION_LIST_SUCCESS = "PRODUCT_OPTION_LIST_SUCCESS";
export const PRODUCT_OPTION_LIST_FAILURE = "PRODUCT_OPTION_LIST_FAILURE";

export const PRODUCT_OPTION_CREATE_REQUEST = "PRODUCT_OPTION_CREATE_REQUEST";
export const PRODUCT_OPTION_CREATE_SUCCESS = "PRODUCT_OPTION_CREATE_SUCCESS";
export const PRODUCT_OPTION_CREATE_FAILURE = "PRODUCT_OPTION_CREATE_FAILURE";

export const PRODUCT_OPTION_UPDATE_REQUEST = "PRODUCT_OPTION_UPDATE_REQUEST";
export const PRODUCT_OPTION_UPDATE_SUCCESS = "PRODUCT_OPTION_UPDATE_SUCCESS";
export const PRODUCT_OPTION_UPDATE_FAILURE = "PRODUCT_OPTION_UPDATE_FAILURE";

export const PRODUCT_OPTION_DELETE_REQUEST = "PRODUCT_OPTION_DELETE_REQUEST";
export const PRODUCT_OPTION_DELETE_SUCCESS = "PRODUCT_OPTION_DELETE_SUCCESS";
export const PRODUCT_OPTION_DELETE_FAILURE = "PRODUCT_OPTION_DELETE_FAILURE";

export const PRODUCT_TAG_LIST_REQUEST = "PRODUCT_TAG_LIST_REQUEST";
export const PRODUCT_TAG_LIST_SUCCESS = "PRODUCT_TAG_LIST_SUCCESS";
export const PRODUCT_TAG_LIST_FAILURE = "PRODUCT_TAG_LIST_FAILURE";

export const PRODUCT_TAG_CREATE_REQUEST = "PRODUCT_TAG_CREATE_REQUEST";
export const PRODUCT_TAG_CREATE_SUCCESS = "PRODUCT_TAG_CREATE_SUCCESS";
export const PRODUCT_TAG_CREATE_FAILURE = "PRODUCT_TAG_CREATE_FAILURE";

export const PRODUCT_TAG_UPDATE_REQUEST = "PRODUCT_TAG_UPDATE_REQUEST";
export const PRODUCT_TAG_UPDATE_SUCCESS = "PRODUCT_TAG_UPDATE_SUCCESS";
export const PRODUCT_TAG_UPDATE_FAILURE = "PRODUCT_TAG_UPDATE_FAILURE";

export const PRODUCT_TAG_DELETE_REQUEST = "PRODUCT_TAG_DELETE_REQUEST";
export const PRODUCT_TAG_DELETE_SUCCESS = "PRODUCT_TAG_DELETE_SUCCESS";
export const PRODUCT_TAG_DELETE_FAILURE = "PRODUCT_TAG_DELETE_FAILURE";

export const PRODUCT_IMAGE_RESET = "PRODUCT_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST: {
        draft.st_productListLoading = true;
        draft.st_productListDone = false;
        draft.st_productListError = null;
        break;
      }
      case PRODUCT_LIST_SUCCESS: {
        draft.st_productListLoading = false;
        draft.st_productListDone = true;
        draft.st_productListError = null;
        draft.productList = action.data.product;
        draft.productPage = action.data.lastPage;
        break;
      }
      case PRODUCT_LIST_FAILURE: {
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_LECO_LIST_REQUEST: {
        draft.st_productLecoListLoading = true;
        draft.st_productLecoListDone = false;
        draft.st_productLecoListError = null;
        break;
      }
      case PRODUCT_LECO_LIST_SUCCESS: {
        draft.st_productLecoListLoading = false;
        draft.st_productLecoListDone = true;
        draft.st_productLecoListError = null;
        draft.productLecoList = action.data;
        break;
      }
      case PRODUCT_LECO_LIST_FAILURE: {
        draft.st_productLecoListLoading = false;
        draft.st_productLecoListDone = false;
        draft.st_productLecoListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_ADMIN_LIST_REQUEST: {
        draft.st_productAdminListLoading = true;
        draft.st_productAdminListDone = false;
        draft.st_productAdminListError = null;
        break;
      }
      case PRODUCT_ADMIN_LIST_SUCCESS: {
        draft.st_productAdminListLoading = false;
        draft.st_productAdminListDone = true;
        draft.st_productAdminListError = null;
        draft.productAdminList = action.data;
        break;
      }
      case PRODUCT_ADMIN_LIST_FAILURE: {
        draft.st_productAdminListLoading = false;
        draft.st_productAdminListDone = false;
        draft.st_productAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_DETAIL_REQUEST: {
        draft.st_productDetailLoading = true;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = null;
        break;
      }
      case PRODUCT_DETAIL_SUCCESS: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = true;
        draft.st_productDetailError = null;
        draft.productDetail = action.data;
        break;
      }
      case PRODUCT_DETAIL_FAILURE: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_CREATE_REQUEST: {
        draft.st_productCreateLoading = true;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = null;
        break;
      }
      case PRODUCT_CREATE_SUCCESS: {
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = true;
        draft.st_productCreateError = null;
        break;
      }
      case PRODUCT_CREATE_FAILURE: {
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_UPDATE_REQUEST: {
        draft.st_productUpdateLoading = true;
        draft.st_productUpdateDone = false;
        draft.st_productUpdateError = null;
        break;
      }
      case PRODUCT_UPDATE_SUCCESS: {
        draft.st_productUpdateLoading = false;
        draft.st_productUpdateDone = true;
        draft.st_productUpdateError = null;
        break;
      }
      case PRODUCT_UPDATE_FAILURE: {
        draft.st_productUpdateLoading = false;
        draft.st_productUpdateDone = false;
        draft.st_productUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_LECO_UPDATE_REQUEST: {
        draft.st_productLecoUpdateLoading = true;
        draft.st_productLecoUpdateDone = false;
        draft.st_productLecoUpdateError = null;
        break;
      }
      case PRODUCT_LECO_UPDATE_SUCCESS: {
        draft.st_productLecoUpdateLoading = false;
        draft.st_productLecoUpdateDone = true;
        draft.st_productLecoUpdateError = null;
        break;
      }
      case PRODUCT_LECO_UPDATE_FAILURE: {
        draft.st_productLecoUpdateLoading = false;
        draft.st_productLecoUpdateDone = false;
        draft.st_productLecoUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_DELETE_REQUEST: {
        draft.st_productDeleteLoading = true;
        draft.st_productDeleteDone = false;
        draft.st_productDeleteError = null;
        break;
      }
      case PRODUCT_DELETE_SUCCESS: {
        draft.st_productDeleteLoading = false;
        draft.st_productDeleteDone = true;
        draft.st_productDeleteError = null;
        break;
      }
      case PRODUCT_DELETE_FAILURE: {
        draft.st_productDeleteLoading = false;
        draft.st_productDeleteDone = false;
        draft.st_productDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_UPLOAD1_REQUEST: {
        draft.st_productUpload1Loading = true;
        draft.st_productUpload1Done = false;
        draft.st_productUpload1Error = null;
        break;
      }
      case PRODUCT_UPLOAD1_SUCCESS: {
        draft.st_productUpload1Loading = false;
        draft.st_productUpload1Done = true;
        draft.st_productUpload1Error = null;
        draft.productPath1 = action.data.path;
        break;
      }
      case PRODUCT_UPLOAD1_FAILURE: {
        draft.st_productUpload1Loading = false;
        draft.st_productUpload1Done = false;
        draft.st_productUpload1Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_UPLOAD2_REQUEST: {
        draft.st_productUpload2Loading = true;
        draft.st_productUpload2Done = false;
        draft.st_productUpload2Error = null;
        break;
      }
      case PRODUCT_UPLOAD2_SUCCESS: {
        draft.st_productUpload2Loading = false;
        draft.st_productUpload2Done = true;
        draft.st_productUpload2Error = null;
        draft.productPath2 = action.data.path;
        break;
      }
      case PRODUCT_UPLOAD2_FAILURE: {
        draft.st_productUpload2Loading = false;
        draft.st_productUpload2Done = false;
        draft.st_productUpload2Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_UPLOAD3_REQUEST: {
        draft.st_productUpload3Loading = true;
        draft.st_productUpload3Done = false;
        draft.st_productUpload3Error = null;
        break;
      }
      case PRODUCT_UPLOAD3_SUCCESS: {
        draft.st_productUpload3Loading = false;
        draft.st_productUpload3Done = true;
        draft.st_productUpload3Error = null;
        draft.productPath3 = action.data.path;
        break;
      }
      case PRODUCT_UPLOAD3_FAILURE: {
        draft.st_productUpload3Loading = false;
        draft.st_productUpload3Done = false;
        draft.st_productUpload3Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_UPLOAD4_REQUEST: {
        draft.st_productUpload4Loading = true;
        draft.st_productUpload4Done = false;
        draft.st_productUpload4Error = null;
        break;
      }
      case PRODUCT_UPLOAD4_SUCCESS: {
        draft.st_productUpload4Loading = false;
        draft.st_productUpload4Done = true;
        draft.st_productUpload4Error = null;
        draft.productPath4 = action.data.path;
        break;
      }
      case PRODUCT_UPLOAD4_FAILURE: {
        draft.st_productUpload4Loading = false;
        draft.st_productUpload4Done = false;
        draft.st_productUpload4Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_UPLOAD5_REQUEST: {
        draft.st_productUpload5Loading = true;
        draft.st_productUpload5Done = false;
        draft.st_productUpload5Error = null;
        break;
      }
      case PRODUCT_UPLOAD5_SUCCESS: {
        draft.st_productUpload5Loading = false;
        draft.st_productUpload5Done = true;
        draft.st_productUpload5Error = null;
        draft.productDetail = action.data.path;
        break;
      }
      case PRODUCT_UPLOAD5_FAILURE: {
        draft.st_productUpload5Loading = false;
        draft.st_productUpload5Done = false;
        draft.st_productUpload5Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_HISTORY_LIST_REQUEST: {
        draft.st_productHistoryListLoading = true;
        draft.st_productHistoryListDone = false;
        draft.st_productHistoryListError = null;
        break;
      }
      case PRODUCT_HISTORY_LIST_SUCCESS: {
        draft.st_productHistoryListLoading = false;
        draft.st_productHistoryListDone = true;
        draft.st_productHistoryListError = null;
        draft.productHistoryList = action.data;
        break;
      }
      case PRODUCT_HISTORY_LIST_FAILURE: {
        draft.st_productHistoryListLoading = false;
        draft.st_productHistoryListDone = false;
        draft.st_productHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_OPTION_LIST_REQUEST: {
        draft.st_productOptionListLoading = true;
        draft.st_productOptionListDone = false;
        draft.st_productOptionListError = null;
        break;
      }
      case PRODUCT_OPTION_LIST_SUCCESS: {
        draft.st_productOptionListLoading = false;
        draft.st_productOptionListDone = true;
        draft.st_productOptionListError = null;
        draft.productOptionList = action.data;
        break;
      }
      case PRODUCT_OPTION_LIST_FAILURE: {
        draft.st_productOptionListLoading = false;
        draft.st_productOptionListDone = false;
        draft.st_productOptionListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_OPTION_CREATE_REQUEST: {
        draft.st_productOptionCreateLoading = true;
        draft.st_productOptionCreateDone = false;
        draft.st_productOptionCreateError = null;
        break;
      }
      case PRODUCT_OPTION_CREATE_SUCCESS: {
        draft.st_productOptionCreateLoading = false;
        draft.st_productOptionCreateDone = true;
        draft.st_productOptionCreateError = null;
        break;
      }
      case PRODUCT_OPTION_CREATE_FAILURE: {
        draft.st_productOptionCreateLoading = false;
        draft.st_productOptionCreateDone = false;
        draft.st_productOptionCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_OPTION_UPDATE_REQUEST: {
        draft.st_productOptionUpdateLoading = true;
        draft.st_productOptionUpdateDone = false;
        draft.st_productOptionUpdateError = null;
        break;
      }
      case PRODUCT_OPTION_UPDATE_SUCCESS: {
        draft.st_productOptionUpdateLoading = false;
        draft.st_productOptionUpdateDone = true;
        draft.st_productOptionUpdateError = null;
        break;
      }
      case PRODUCT_OPTION_UPDATE_FAILURE: {
        draft.st_productOptionUpdateLoading = false;
        draft.st_productOptionUpdateDone = false;
        draft.st_productOptionUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_OPTION_DELETE_REQUEST: {
        draft.st_productOptionDeleteLoading = true;
        draft.st_productOptionDeleteDone = false;
        draft.st_productOptionDeleteError = null;
        break;
      }
      case PRODUCT_OPTION_DELETE_SUCCESS: {
        draft.st_productOptionDeleteLoading = false;
        draft.st_productOptionDeleteDone = true;
        draft.st_productOptionDeleteError = null;
        break;
      }
      case PRODUCT_OPTION_DELETE_FAILURE: {
        draft.st_productOptionDeleteLoading = false;
        draft.st_productOptionDeleteDone = false;
        draft.st_productOptionDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_TAG_LIST_REQUEST: {
        draft.st_productTagListLoading = true;
        draft.st_productTagListDone = false;
        draft.st_productTagListError = null;
        break;
      }
      case PRODUCT_TAG_LIST_SUCCESS: {
        draft.st_productTagListLoading = false;
        draft.st_productTagListDone = true;
        draft.st_productTagListError = null;
        draft.productTagList = action.data;
        break;
      }
      case PRODUCT_TAG_LIST_FAILURE: {
        draft.st_productTagListLoading = false;
        draft.st_productTagListDone = false;
        draft.st_productTagListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_TAG_CREATE_REQUEST: {
        draft.st_productTagCreateLoading = true;
        draft.st_productTagCreateDone = false;
        draft.st_productTagCreateError = null;
        break;
      }
      case PRODUCT_TAG_CREATE_SUCCESS: {
        draft.st_productTagCreateLoading = false;
        draft.st_productTagCreateDone = true;
        draft.st_productTagCreateError = null;
        break;
      }
      case PRODUCT_TAG_CREATE_FAILURE: {
        draft.st_productTagCreateLoading = false;
        draft.st_productTagCreateDone = false;
        draft.st_productTagCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_TAG_UPDATE_REQUEST: {
        draft.st_productTagUpdateLoading = true;
        draft.st_productTagUpdateDone = false;
        draft.st_productTagUpdateError = null;
        break;
      }
      case PRODUCT_TAG_UPDATE_SUCCESS: {
        draft.st_productTagUpdateLoading = false;
        draft.st_productTagUpdateDone = true;
        draft.st_productTagUpdateError = null;
        break;
      }
      case PRODUCT_TAG_UPDATE_FAILURE: {
        draft.st_productTagUpdateLoading = false;
        draft.st_productTagUpdateDone = false;
        draft.st_productTagUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_TAG_DELETE_REQUEST: {
        draft.st_productTagDeleteLoading = true;
        draft.st_productTagDeleteDone = false;
        draft.st_productTagDeleteError = null;
        break;
      }
      case PRODUCT_TAG_DELETE_SUCCESS: {
        draft.st_productTagDeleteLoading = false;
        draft.st_productTagDeleteDone = true;
        draft.st_productTagDeleteError = null;
        break;
      }
      case PRODUCT_TAG_DELETE_FAILURE: {
        draft.st_productTagDeleteLoading = false;
        draft.st_productTagDeleteDone = false;
        draft.st_productTagDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case PRODUCT_IMAGE_RESET: {
        draft.productPath1 = null;
        draft.productPath2 = null;
        draft.productPath3 = null;
        draft.productPath4 = null;
        draft.productDetail = null;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
