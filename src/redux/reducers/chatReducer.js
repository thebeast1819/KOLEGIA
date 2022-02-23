import {
  GET_ALL_CHATS,
  GET_ALL_MESSAGES_OF_A_CONVERSATION,
  GET_NEXT_BATCH,
  NEW_REQUEST,
  SEND_MESSAGE,
} from "../constants/AllConstants";

const initialState = {
  chats: [],
  all_messages_of_a_conversation: [],
  next_batch_of_a_conversation: [],
  new_message: null,
  isLoading: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_ALL_CHATS: {
      return {
        ...state,
        isLoading: false,
        chats: action.payload,
      };
    }

    case GET_ALL_MESSAGES_OF_A_CONVERSATION: {
      return {
        ...state,
        isLoading: false,
        all_messages_of_a_conversation: action.payload,
      };
    }

    case GET_NEXT_BATCH: {
      return {
        ...state,
        isLoading: false,
        next_batch_of_a_conversation: action.payload,
      };
    }

    case SEND_MESSAGE: {
      return {
        ...state,
        isLoading: false,
        new_message: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default chatReducer;
