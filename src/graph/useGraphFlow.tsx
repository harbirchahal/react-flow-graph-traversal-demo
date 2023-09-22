import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  NodeChange,
  Edge,
  Connection,
  Node,
} from "reactflow";

import graphSlice from "../store/graphSlice";

const useGraphFlow = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(graphSlice.select.getNodes) ?? [];
  const edges = useSelector(graphSlice.select.getEdges) ?? [];
  const selectedEdge = edges.find((e) => e.selected);

  const onAddNode = (node: Node) => {
    dispatch(graphSlice.actions.addNode(node));
  };

  const onRemoveNode = (id: string) => {
    dispatch(graphSlice.actions.removeNode(id));
  };

  const onRemoveEdge = (id: string) => {
    dispatch(graphSlice.actions.removeEdge(id));
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdges = addEdge(params, edges);
      dispatch(graphSlice.actions.setEdges(newEdges));
    },
    [edges]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const newNodes = applyNodeChanges(changes, nodes);
      dispatch(graphSlice.actions.setNodes(newNodes));
    },
    [nodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const newEdges = applyEdgeChanges(changes, edges);
      dispatch(graphSlice.actions.setEdges(newEdges));
    },
    [edges]
  );

  return {
    nodes,
    edges,
    selectedEdge,
    onAddNode,
    onRemoveNode,
    onRemoveEdge,
    onConnect,
    onNodesChange,
    onEdgesChange,
  };
};

export default useGraphFlow;
