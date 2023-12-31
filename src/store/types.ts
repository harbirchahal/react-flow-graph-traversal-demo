import { DefaultEdgeOptions, Edge, Node } from "reactflow";

export type GraphState = {
  nodes: Node[];
  edges: Edge[];
  edgeOptions: DefaultEdgeOptions;
  rootNodeId?: string;
};

export type ViewState = {
  activeTab: number;
};

export type AppState = {
  graph: GraphState;
  view: ViewState;
};
