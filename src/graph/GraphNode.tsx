import "./graphNode.css";

import { useRef } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

import useGraphFlow from "./useGraphFlow";

const GraphNode = (node: NodeProps) => {
  const { rootNode, onRemoveNode, onRootNodeChange } = useGraphFlow();
  const menuRef = useRef<Menu>(null);

  const menuItems: MenuItem[] = [
    {
      label: "Options",
      items: [
        {
          label: "Make Root",
          icon: PrimeIcons.MAP_MARKER,
          command: () => onRootNodeChange(node.id),
        },
        {
          label: "Delete",
          icon: PrimeIcons.TRASH,
          command: () => onRemoveNode(node.id),
        },
      ],
    },
  ];

  const labelClasses = () => {
    const classes = "node-label border-1 border-round px-2";
    return node.id === rootNode?.id ? classes.concat(" root-node") : classes;
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card>
        <div className={labelClasses()}>{node.data.label}</div>
        <Button
          text
          icon="pi pi-ellipsis-v"
          size="small"
          severity="secondary"
          onClick={(event) => menuRef.current?.toggle(event)}
        />
      </Card>
      <Handle type="source" position={Position.Bottom} />
      <Menu popup ref={menuRef} model={menuItems} />
    </>
  );
};

export default GraphNode;
