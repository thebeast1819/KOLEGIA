import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  GET_ALL_LOST_FOUND_ITEMS,
 
  GET_SINGLE_LOST_FOUND_ITEM,
  ADD_NEW_LOST_FOUND_ITEM,
  NEW_REQUEST,
  GET_MY_OWN_LOST_FOUND_ITEMS,
  EDIT_LOST_FOUND_ITEM,
  DELETE_LOST_FOUND_ITEM,
  RESET_STATUS,
  CHECKING_ERROR,
  GET_LOST_FOUND_RESPONSES,
  RAISE_HAND,
  ACCEPT_RAISED_HAND,
  REJECT_RAISED_HAND,

  MARK_AS_FOUND,
  SEARCH_LOST_FOUND_ITEMS,
  EMPTY_SEARCH_LOST_FOUND,
} from "../constants/AllConstants";

export const getAllLostFoundItems = () => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    const { data } = await axios.get(
      "https://kolegia.herokuapp.com/api/v1/lost-found-items/get-lost-found-feed",
      {
        headers: {
          authorization: `Bearer ${decoded.auth_token}`,
        },
      }
    );
   
    dispatch({
      type: GET_ALL_LOST_FOUND_ITEMS,
      payload: data.products,
    });
  } catch (err) {
    console.log(err);
  }
};

export const lostFoundSearch = (searchQuery) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    const { data } = await axios.get(
      `https://kolegia.herokuapp.com/api/v1/lost-found-items/search-lost-found-products?search=${searchQuery}`,
      {
        headers: {
          authorization: `Bearer ${decoded.auth_token}`,
        }
      }
    );
 
    dispatch({
      type: SEARCH_LOST_FOUND_ITEMS,
      payload: data.products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const emptySearchLostFound = ()=>(dispatch)=>{
  dispatch({
    type:EMPTY_SEARCH_LOST_FOUND
  })
};

export const getLostFoundProductDetails = (itemData) => async (dispatch) => {
  
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    const { data } = await axios.get(
      `https://kolegia.herokuapp.com/api/v1/lost-found-items/get-lost-found-product-details?product_id=${itemData.product_id}`,
      {
        headers: {
          authorization: `Bearer ${itemData.decoded.auth_token}`,
        },
      }
    );
 
    dispatch({
      type: GET_SINGLE_LOST_FOUND_ITEM,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const addNewLostFoundItem = (data) => async (dispatch) => {
  try {
    var token = "";
    for (var key of data.entries()) {
     
      if (key[0] === "token") {
        token = key[1];
      }
    }
  
    const res = await axios.post(
      "https://kolegia.herokuapp.com/api/v1/lost-found-items/create-new-lost-found-product",
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const payloadobj = { message: res.data.message, status: res.status };
    dispatch({
      type: ADD_NEW_LOST_FOUND_ITEM,
      payload: payloadobj,
    });
  } catch (error) {
    if (error.response) {
      const payloadobj = {
        message: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: ADD_NEW_LOST_FOUND_ITEM,
        payload: payloadobj,
      });
    }
  }
};

export const getAllOwnLostFoundItems = () => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);
    const { data } = await axios.get(
      "https://kolegia.herokuapp.com/api/v1/lost-found-items/get-own-lost-found-list",
      {
        headers: {
          authorization: `Bearer ${decoded.auth_token}`,
        },
      }
    );
  
    dispatch({
      type: GET_MY_OWN_LOST_FOUND_ITEMS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editLostFoundItem = (formData) => async (dispatch) => {
  try {
    var token = "";
    for (var key of formData.entries()) {
      if (key[0] === "token") {
        token = key[1];
      }
    }
    const res = await axios.put(
      "https://kolegia.herokuapp.com/api/v1/lost-found-items/edit-lost-found-product",
      formData,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const payloadobj = { message: res.data.message, status: res.status };
    dispatch({
      type: EDIT_LOST_FOUND_ITEM,
      payload: payloadobj,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      const payloadobj = {
        message: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: EDIT_LOST_FOUND_ITEM,
        payload: payloadobj,
      });
    }
  }
};

export const deleteLostFoundItem = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
  
    const res = await axios.delete(
      "https://kolegia.herokuapp.com/api/v1/lost-found-items/delete-lost-found-product",
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        data,
      }
    );
    const payloadobj = { message: res.data.message, status: res.status };
    dispatch({
      type: DELETE_LOST_FOUND_ITEM,
      payload: payloadobj,
    });
  } catch (error) {
    if (error.response) {
      const payloadobj = {
        message: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: DELETE_LOST_FOUND_ITEM,
        payload: payloadobj,
      });
    }
  }
};

export const markAsFound = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
   
    const res = await axios.put(
      "https://kolegia.herokuapp.com/api/v1/lost-found-items/mark-as-found",
      data,
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }
    );
    
    const payloadobj = { message: res.data.message, status: res.status };
    dispatch({
      type: MARK_AS_FOUND,
      payload: payloadobj,
    });
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      const payloadobj = {
        message: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: MARK_AS_FOUND,
        payload: payloadobj,
      });
    }
  }
};

export const raiseHand = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    
    const res = await axios.post(
      "https://kolegia.herokuapp.com/api/v1/raisedhands/raise-hand-on-an-item",
      data,
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }
    );
    const payloadobj = { message: res.data.message, status: res.status };
    dispatch({
      type: RAISE_HAND,
      payload: payloadobj,
    });
  } catch (error) {
    if (error.response) {
      const payloadobj = {
        message: error.response.data.message,
        status: error.response.status,
      };
    
      dispatch({
        type: RAISE_HAND,
        payload: payloadobj,
      });
    }
  }
};

export const getLostFoundItemResponses = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    const res = await axios.get(
      "https://kolegia.herokuapp.com/api/v1/raisedhands/get-raised-responses",

      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        data,
      }
    );
    
    dispatch({
      type: GET_LOST_FOUND_RESPONSES,
      payload: res.data.raised_hands,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const acceptRaisedHand = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
  
    const res = await axios.post(
      "https://kolegia.herokuapp.com/api/v1/raisedhands/accept-raised-hand",
      data,
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }
    );
  
    dispatch({
      type: ACCEPT_RAISED_HAND,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const rejectRaisedHand = (data) => async (dispatch) => {
  dispatch({
    type: NEW_REQUEST,
    payload: true,
  });
  try {
    const res = await axios.delete(
      "https://kolegia.herokuapp.com/api/v1/raisedhands/reject-raised-hand",

      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        data,
      }
    );
  
    dispatch({
      type: REJECT_RAISED_HAND,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({
        type: CHECKING_ERROR,
        payload: error.response,
      });
    }
  }
};

export const resetStatus = (dispatch) => {
  dispatch({
    type: RESET_STATUS,
  });
};

