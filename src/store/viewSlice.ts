import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppState, ViewState } from "./types";

const initialState: ViewState = {
  activeTab: 0,
};

const slice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
  },
});

const selectSelf = (state: AppState) => state.view;
const getActiveTab = createSelector(selectSelf, (state) => state.activeTab);

export default {
  name: slice.name,
  actions: slice.actions,
  reducer: slice.reducer,
  select: {
    getActiveTab,
  },
};
