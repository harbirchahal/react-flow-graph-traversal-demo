import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DefaultEdgeOptions, Node } from "reactflow";

import { AppState, GraphState } from "./types";

const initialState: GraphState = {
  nodes: [],
  edges: [],
  edgeOptions: {},
  rootNodeId: undefined,
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
      if (state.rootNodeId === nodeId) {
        state.rootNodeId = state.nodes[0]?.id;
      }
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
    setRootNode(state, action: PayloadAction<string | undefined>) {
      state.rootNodeId = action.payload;
    },
  },
});

const selectSelf = (state: AppState) => state.graph;
const getNodes = createSelector(selectSelf, (state) => state.nodes);
const getEdges = createSelector(selectSelf, (state) => state.edges);
const getEdgeOptions = createSelector(selectSelf, (state) => state.edgeOptions);
const getSelectedEdge = createSelector(selectSelf, (state) =>
  state.edges.find((e) => e.selected)
);
const getRootNode = createSelector(selectSelf, (state) =>
  state.nodes.find((n) => n.id === state.rootNodeId)
);


export default {
  name: slice.name,
  actions: slice.actions,
  reducer: slice.reducer,
  select: {
    getNodes,
    getEdges,
    getEdgeOptions,
    getSelectedEdge,
    getRootNode,
  },
};
