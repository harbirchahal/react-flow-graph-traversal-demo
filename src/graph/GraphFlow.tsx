import { FC } from "react";
import ReactFlow, {
  Controls,
  Background,
  NodeTypes,
  EdgeTypes,
} from "reactflow";

import GraphActions from "./GraphActions";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import useGraphFlow from "./useGraphFlow";

const nodeTypes: NodeTypes = { customNode: GraphNode };
const edgeTypes: EdgeTypes = { customEdge: GraphEdge };

const GraphFlow: FC = () => {
  const { nodes, edges, edgeOptions, onConnect, onNodesChange, onEdgesChange } =
    useGraphFlow();

  return (
    <>
      <GraphActions />
      <div style={{ width: "95vw", height: "75vh" }}>
        <ReactFlow
          fitView
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={edgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default GraphFlow;
