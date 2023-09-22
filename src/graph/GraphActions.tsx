import { FC, useState, useRef } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

import GraphTraverse from "./GraphTraverse";
import { createGraphNode } from "./graphUtils";
import useGraphFlow from "./useGraphFlow";
import { GraphTraverseOp } from "./types";

const GraphActions: FC = () => {
  const { selectedEdge, onAddNode, onRemoveEdge } = useGraphFlow();
  const [traverseOp, setTraverseOp] = useState<GraphTraverseOp>();
  const traverseMenuRef = useRef<Menu>(null);

  const traverseItems: MenuItem[] = [
    {
      label: "Depth First",
      icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
      command: () => setTraverseOp(GraphTraverseOp.DEPTH_FIRST),
    },
    {
      label: "Breadth First",
      icon: PrimeIcons.ANGLE_DOUBLE_RIGHT,
      command: () => setTraverseOp(GraphTraverseOp.BREADTH_FIRST),
    },
  ];

  return (
    <>
      <div className="flex gap-3">
        <Button
          outlined
          label="Add Node"
          size="small"
          onClick={() => onAddNode(createGraphNode())}
        />
        <Button
          outlined
          label="Delete Edge"
          size="small"
          severity="warning"
          disabled={!selectedEdge}
          onClick={() => selectedEdge && onRemoveEdge(selectedEdge!.id)}
        />
        <div className="divider" />
        <Button
          outlined
          label="Traversal"
          size="small"
          severity="info"
          onClick={(event) => traverseMenuRef.current?.toggle(event)}
        />
      </div>
      <GraphTraverse op={traverseOp} onClear={() => setTraverseOp(undefined)} />
      <Menu popup ref={traverseMenuRef} model={traverseItems} />
    </>
  );
};

export default GraphActions;
