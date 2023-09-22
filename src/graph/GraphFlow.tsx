import { FC } from "react";
import ReactFlow, {
  Controls,
  Background,
  DefaultEdgeOptions,
  NodeTypes,
  MarkerType,
} from "reactflow";

import GraphActions from "./GraphActions";
import GraphNode from "./GraphNode";
import useGraphFlow from "./useGraphFlow";

const nodeTypes: NodeTypes = { customNode: GraphNode };
const defaultEdgeOptions: DefaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const GraphFlow: FC = () => {
  const { nodes, edges, onConnect, onNodesChange, onEdgesChange } =
    useGraphFlow();

  return (
    <>
      <GraphActions />
      <div style={{ width: "95vw", height: "75vh" }}>
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={defaultEdgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default GraphFlow;
