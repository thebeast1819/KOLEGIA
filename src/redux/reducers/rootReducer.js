import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import BuySellReducer from "./BuySellReducer";
import { projectReducer } from "./projectReducer";
import LostFoundReducer from "./LostFoundReducer";
import RequirementReducer from "./RequirementReducer";
import chatReducer from "./chatReducer";

const appReducer = combineReducers({
  auth: AuthReducer,
  project: projectReducer,
  buySell: BuySellReducer,
  lostFound: LostFoundReducer,
  requirement: RequirementReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
export default rootReducer;
