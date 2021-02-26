import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import ticketReducer from "../features/ticket";

const rootReducer = combineReducers({
  user: userReducer,
  ticket: ticketReducer,
});

export default rootReducer;
