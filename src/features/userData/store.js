import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./userDataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
