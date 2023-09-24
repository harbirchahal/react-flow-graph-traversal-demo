import { FC } from "react";
import ReactFlow, { Controls, Background, NodeTypes } from "reactflow";

import GraphActions from "./GraphActions";
import GraphNode from "./GraphNode";
import useGraphFlow from "./useGraphFlow";

const nodeTypes: NodeTypes = { customNode: GraphNode };

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
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default GraphFlow;
