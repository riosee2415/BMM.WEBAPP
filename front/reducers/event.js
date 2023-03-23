import produce from "../util/produce";

export const initailState = {
  eventList: [],
  eventPage: 1,
  eventAdminList: [],
  eventDetail: null,
  eventHistoryList: [],

  eventPath1: null,
  eventPath2: null,

  //
  st_eventListLoading: false, // event 가져오기
  st_eventListDone: false,
  st_eventListError: null,
  //
  st_eventAdminListLoading: false, // event 관리자 가져오기
  st_eventAdminListDone: false,
  st_eventAdminListError: null,
  //
  st_eventCreateLoading: false, // event 생성하기
  st_eventCreateDone: false,
  st_eventCreateError: null,
  //
  st_eventUpdateLoading: false, // event 수정하기
  st_eventUpdateDone: false,
  st_eventUpdateError: null,
  //
  st_eventDeleteLoading: false, // event 삭제하기
  st_eventDeleteDone: false,
  st_eventDeleteError: null,
  //
  st_eventUpload1Loading: false, // event 이미지 등록
  st_eventUpload1Done: false,
  st_eventUpload1Error: null,
  //
  st_eventUpload2Loading: false, // event 이미지 등록
  st_eventUpload2Done: false,
  st_eventUpload2Error: null,
  //
  st_eventDetailLoading: false, // event 디테일
  st_eventDetailDone: false,
  st_eventDetailError: null,
  //
  st_eventHistoryListLoading: false, // event 이력
  st_eventHistoryListDone: false,
  st_eventHistoryListError: null,
};

export const EVENT_LIST_REQUEST = "EVENT_LIST_REQUEST";
export const EVENT_LIST_SUCCESS = "EVENT_LIST_SUCCESS";
export const EVENT_LIST_FAILURE = "EVENT_LIST_FAILURE";

export const EVENT_ADMIN_LIST_REQUEST = "EVENT_ADMIN_LIST_REQUEST";
export const EVENT_ADMIN_LIST_SUCCESS = "EVENT_ADMIN_LIST_SUCCESS";
export const EVENT_ADMIN_LIST_FAILURE = "EVENT_ADMIN_LIST_FAILURE";

export const EVENT_CREATE_REQUEST = "EVENT_CREATE_REQUEST";
export const EVENT_CREATE_SUCCESS = "EVENT_CREATE_SUCCESS";
export const EVENT_CREATE_FAILURE = "EVENT_CREATE_FAILURE";

export const EVENT_UPDATE_REQUEST = "EVENT_UPDATE_REQUEST";
export const EVENT_UPDATE_SUCCESS = "EVENT_UPDATE_SUCCESS";
export const EVENT_UPDATE_FAILURE = "EVENT_UPDATE_FAILURE";

export const EVENT_DELETE_REQUEST = "EVENT_DELETE_REQUEST";
export const EVENT_DELETE_SUCCESS = "EVENT_DELETE_SUCCESS";
export const EVENT_DELETE_FAILURE = "EVENT_DELETE_FAILURE";

export const EVENT_UPLOAD1_REQUEST = "EVENT_UPLOAD1_REQUEST";
export const EVENT_UPLOAD1_SUCCESS = "EVENT_UPLOAD1_SUCCESS";
export const EVENT_UPLOAD1_FAILURE = "EVENT_UPLOAD1_FAILURE";

export const EVENT_UPLOAD2_REQUEST = "EVENT_UPLOAD2_REQUEST";
export const EVENT_UPLOAD2_SUCCESS = "EVENT_UPLOAD2_SUCCESS";
export const EVENT_UPLOAD2_FAILURE = "EVENT_UPLOAD2_FAILURE";

export const EVENT_DETAIL_REQUEST = "EVENT_DETAIL_REQUEST";
export const EVENT_DETAIL_SUCCESS = "EVENT_DETAIL_SUCCESS";
export const EVENT_DETAIL_FAILURE = "EVENT_DETAIL_FAILURE";

export const EVENT_HISTORY_LIST_REQUEST = "EVENT_HISTORY_LIST_REQUEST";
export const EVENT_HISTORY_LIST_SUCCESS = "EVENT_HISTORY_LIST_SUCCESS";
export const EVENT_HISTORY_LIST_FAILURE = "EVENT_HISTORY_LIST_FAILURE";

export const EVENT_IMAGE_RESET = "EVENT_IMAGE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EVENT_LIST_REQUEST: {
        draft.st_eventListLoading = true;
        draft.st_eventListDone = false;
        draft.st_eventListError = null;
        break;
      }
      case EVENT_LIST_SUCCESS: {
        draft.st_eventListLoading = false;
        draft.st_eventListDone = true;
        draft.st_eventListError = null;
        draft.eventList = action.data.events;
        draft.eventPage = action.data.lastPage;
        break;
      }
      case EVENT_LIST_FAILURE: {
        draft.st_eventListLoading = false;
        draft.st_eventListDone = false;
        draft.st_eventListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_ADMIN_LIST_REQUEST: {
        draft.st_eventAdminListLoading = true;
        draft.st_eventAdminListDone = false;
        draft.st_eventAdminListError = null;
        break;
      }
      case EVENT_ADMIN_LIST_SUCCESS: {
        draft.st_eventAdminListLoading = false;
        draft.st_eventAdminListDone = true;
        draft.st_eventAdminListError = null;
        draft.eventAdminList = action.data;
        break;
      }
      case EVENT_ADMIN_LIST_FAILURE: {
        draft.st_eventAdminListLoading = false;
        draft.st_eventAdminListDone = false;
        draft.st_eventAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_CREATE_REQUEST: {
        draft.st_eventCreateLoading = true;
        draft.st_eventCreateDone = false;
        draft.st_eventCreateError = null;
        break;
      }
      case EVENT_CREATE_SUCCESS: {
        draft.st_eventCreateLoading = false;
        draft.st_eventCreateDone = true;
        draft.st_eventCreateError = null;
        break;
      }
      case EVENT_CREATE_FAILURE: {
        draft.st_eventCreateLoading = false;
        draft.st_eventCreateDone = false;
        draft.st_eventCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_UPDATE_REQUEST: {
        draft.st_eventUpdateLoading = true;
        draft.st_eventUpdateDone = false;
        draft.st_eventUpdateError = null;
        break;
      }
      case EVENT_UPDATE_SUCCESS: {
        draft.st_eventUpdateLoading = false;
        draft.st_eventUpdateDone = true;
        draft.st_eventUpdateError = null;
        break;
      }
      case EVENT_UPDATE_FAILURE: {
        draft.st_eventUpdateLoading = false;
        draft.st_eventUpdateDone = false;
        draft.st_eventUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_DELETE_REQUEST: {
        draft.st_eventDeleteLoading = true;
        draft.st_eventDeleteDone = false;
        draft.st_eventDeleteError = null;
        break;
      }
      case EVENT_DELETE_SUCCESS: {
        draft.st_eventDeleteLoading = false;
        draft.st_eventDeleteDone = true;
        draft.st_eventDeleteError = null;
        break;
      }
      case EVENT_DELETE_FAILURE: {
        draft.st_eventDeleteLoading = false;
        draft.st_eventDeleteDone = false;
        draft.st_eventDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_UPLOAD1_REQUEST: {
        draft.st_eventUpload1Loading = true;
        draft.st_eventUpload1Done = false;
        draft.st_eventUpload1Error = null;
        break;
      }
      case EVENT_UPLOAD1_SUCCESS: {
        draft.st_eventUpload1Loading = false;
        draft.st_eventUpload1Done = true;
        draft.st_eventUpload1Error = null;
        draft.eventPath1 = action.data.path;
        break;
      }
      case EVENT_UPLOAD1_FAILURE: {
        draft.st_eventUpload1Loading = false;
        draft.st_eventUpload1Done = false;
        draft.st_eventUpload1Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_UPLOAD2_REQUEST: {
        draft.st_eventUpload2Loading = true;
        draft.st_eventUpload2Done = false;
        draft.st_eventUpload2Error = null;
        break;
      }
      case EVENT_UPLOAD2_SUCCESS: {
        draft.st_eventUpload2Loading = false;
        draft.st_eventUpload2Done = true;
        draft.st_eventUpload2Error = null;
        draft.eventPath2 = action.data.path;
        break;
      }
      case EVENT_UPLOAD2_FAILURE: {
        draft.st_eventUpload2Loading = false;
        draft.st_eventUpload2Done = false;
        draft.st_eventUpload2Error = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_DETAIL_REQUEST: {
        draft.st_eventDetailLoading = true;
        draft.st_eventDetailDone = false;
        draft.st_eventDetailError = null;
        break;
      }
      case EVENT_DETAIL_SUCCESS: {
        draft.st_eventDetailLoading = false;
        draft.st_eventDetailDone = true;
        draft.st_eventDetailError = null;
        draft.eventDetail = action.data;
        break;
      }
      case EVENT_DETAIL_FAILURE: {
        draft.st_eventDetailLoading = false;
        draft.st_eventDetailDone = false;
        draft.st_eventDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_HISTORY_LIST_REQUEST: {
        draft.st_eventHistoryListLoading = true;
        draft.st_eventHistoryListDone = false;
        draft.st_eventHistoryListError = null;
        break;
      }
      case EVENT_HISTORY_LIST_SUCCESS: {
        draft.st_eventHistoryListLoading = false;
        draft.st_eventHistoryListDone = true;
        draft.st_eventHistoryListError = null;
        draft.eventHistoryList = action.data;
        break;
      }
      case EVENT_HISTORY_LIST_FAILURE: {
        draft.st_eventHistoryListLoading = false;
        draft.st_eventHistoryListDone = false;
        draft.st_eventHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case EVENT_IMAGE_RESET: {
        draft.eventPath1 = null;
        draft.eventPath2 = null;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
