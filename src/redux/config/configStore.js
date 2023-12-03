import letters from "redux/modules/letters";
import member from "redux/modules/member";
import authSlice from "redux/modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    letters: letters,
    member: member,
    auth: authSlice,
  },
});

export default store;
