import { Edge, Node } from "reactflow";

export type GraphState = {
  nodes: Node[];
  edges: Edge[];
};

export type ViewState = {
  activeTab: number;
};

export type AppState = {
  graph: GraphState;
  view: ViewState;
};
