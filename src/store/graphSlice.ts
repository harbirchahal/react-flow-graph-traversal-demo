import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DefaultEdgeOptions, Edge, MarkerType, Node } from "reactflow";

import { AppState, GraphState } from "./types";

const initialState: GraphState = {
  nodes: [],
  edges: [],
  edgeOptions: {
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
};

const slice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<any>) {
      state.nodes = action.payload;
    },
    addNode(state, action: PayloadAction<Node>) {
      state.nodes.push(action.payload);
    },
    removeNode(state, action: PayloadAction<string>) {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((n) => n.id !== nodeId);
      state.edges = state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
    },
    setEdges(state, action: PayloadAction<any>) {
      state.edges = action.payload;
    },
    removeEdge(state, action: PayloadAction<string>) {
      const nodeId = action.payload;
      state.edges = state.edges.filter((e) => e.id !== nodeId);
    },
    setEdgeOptions(
      state,
      action: PayloadAction<{ key: keyof DefaultEdgeOptions; value: any }>
    ) {
      const { key, value } = action.payload;
      state.edgeOptions[key] = value;
    },
  },
});

const selectSelf = (state: AppState) => state.graph;
const getNodes = createSelector(selectSelf, (state) => state.nodes);
const getEdges = createSelector(selectSelf, (state) => state.edges);
const getEdgeOptions = createSelector(selectSelf, (state) => state.edgeOptions);

export default {
  name: slice.name,
  actions: slice.actions,
  reducer: slice.reducer,
  select: {
    getNodes,
    getEdges,
    getEdgeOptions,
  },
};
