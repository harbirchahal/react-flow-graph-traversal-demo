import { configureStore } from "@reduxjs/toolkit";

import viewSlice from "./viewSlice";
import graphSlice from "./graphSlice";

const store = configureStore({
  reducer: {
    [graphSlice.name]: graphSlice.reducer,
    [viewSlice.name]: viewSlice.reducer,
  },
  devTools: true,
});

export default store;
