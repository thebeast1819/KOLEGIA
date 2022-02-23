import {
  GET_ALL_LOST_FOUND_ITEMS,
  GET_SINGLE_LOST_FOUND_ITEM,
  ADD_NEW_LOST_FOUND_ITEM,
  NEW_REQUEST,
  GET_MY_OWN_LOST_FOUND_ITEMS,
  EDIT_LOST_FOUND_ITEM,
  DELETE_LOST_FOUND_ITEM,
  RESET_STATUS,
  RAISE_HAND,
  GET_LOST_FOUND_RESPONSES,
  ACCEPT_RAISED_HAND,
  REJECT_RAISED_HAND,
  CHECKING_ERROR_LOST_FOUND,
  MARK_AS_FOUND,
  SEARCH_LOST_FOUND_ITEMS,
  EMPTY_SEARCH_LOST_FOUND,
} from "../constants/AllConstants";

const initialState = {
  lostFoundItemList: [],
  totalLostFoundItems:[],
  singleProduct: {},
  firstImage: "",
  isLoading: false,
  ownlostfoundItems: [],
  editlostfoundResponse: {},
  deleteLostFoundItemResponse: {},
  lostFoundResponses: [],
  acceptRaisedHandDetails: null,
  raisedHandResponse: {},
  addItemsLostFoundResponse: {},
  itemFound: {},
};

const LostFoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOST_FOUND_ITEMS:
      return {
        ...state,
        isLoading: false,
        lostFoundItemList: action.payload,
        totalLostFoundItems:action.payload
      };
    case SEARCH_LOST_FOUND_ITEMS:
      return {
        ...state,
        isLoading:false,
        lostFoundItemList: action.payload
      };
    case EMPTY_SEARCH_LOST_FOUND:
      return {
        ...state,
        isLoading:false,
        lostFoundItemList:state.totalLostFoundItems
      };
    case NEW_REQUEST:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GET_SINGLE_LOST_FOUND_ITEM:
      return {
        ...state,
        isLoading: false,
        singleProduct: action.payload,
        firstImage: action.payload.itemImages
          ? action.payload.itemImages[0].img
          : "",
      };
    case ADD_NEW_LOST_FOUND_ITEM:
      
      return {
        ...state,
        addItemsLostFoundResponse: action.payload,
        isLoading: false,
      };

    case GET_MY_OWN_LOST_FOUND_ITEMS:
      return {
        ...state,
        ownlostfoundItems: action.payload.Products,
        isLoading: false,
      };

    case EDIT_LOST_FOUND_ITEM:
      return {
        ...state,
        editlostfoundResponse: action.payload,
        isLoading: false,
      };

    case RESET_STATUS: {
      return {
        ...state,
        editlostfoundResponse: "",
      };
    }
    case DELETE_LOST_FOUND_ITEM:
      return {
        ...state,
        deleteLostFoundItemResponse: action.payload,
        isLoading: false,
      };
    case RAISE_HAND: {
      return {
        ...state,
        isLoading: false,
        raisedHandResponse: action.payload,
      };
    }

    case GET_LOST_FOUND_RESPONSES: {
      return {
        ...state,
        lostFoundResponses: action.payload,
        isLoading: false,
      };
    }

    case ACCEPT_RAISED_HAND: {
      return {
        ...state,
        isLoading: false,
        acceptRaisedHandDetails: action.payload,
      };
    }

    case REJECT_RAISED_HAND: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CHECKING_ERROR_LOST_FOUND:
      return {
        ...state,
        errorMessageLostFound: action.payload.data.message,
      };

    case MARK_AS_FOUND: {
      return {
        ...state,
        itemFound: action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default LostFoundReducer;
