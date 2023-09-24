import { FC, useMemo, useState, useRef } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { SelectButton } from "primereact/selectbutton";
import { Tooltip } from "primereact/tooltip";

import GraphTraverse from "./GraphTraverse";
import useGraphFlow from "./useGraphFlow";
import { createGraphNode } from "./graphUtils";
import { Direction, TraverseOp } from "./types";

const GraphActions: FC = () => {
  const {
    direction,
    selectedEdge,
    onAddNode,
    onRemoveEdge,
    onDirectionChange,
  } = useGraphFlow();
  const [traverseOp, setTraverseOp] = useState<TraverseOp>();

  return (
    <>
      <div className="flex gap-3">
        <DirectionAction direction={direction} onChange={onDirectionChange} />
        <div className="divider" />
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
        <TraverseAction setTraverseOp={setTraverseOp} />
      </div>
      <GraphTraverse op={traverseOp} onClear={() => setTraverseOp(undefined)} />
    </>
  );
};

type DirectionActionProps = {
  direction: Direction;
  onChange: (d: Direction) => void;
};

const DirectionAction: FC<DirectionActionProps> = ({ direction, onChange }) => {
  const dirOptions: Array<{ label: string; value: Direction; icon: string }> =
    useMemo(
      () => [
        {
          label: "Undirected",
          value: Direction.UNDIRECTED,
          icon: PrimeIcons.ARROWS_H,
        },
        {
          label: "Directed",
          value: Direction.DIRECTED,
          icon: PrimeIcons.ARROW_RIGHT,
        },
      ],
      []
    );

  return (
    <SelectButton
      optionLabel="value"
      value={direction}
      options={dirOptions}
      onChange={(e) => onChange(e.value)}
      itemTemplate={(option) => (
        <>
          <Tooltip target=".dir-icon" />
          <i
            className={`dir-icon ${option.icon}`}
            data-pr-tooltip={option.label}
            data-pr-position="bottom"
          ></i>
        </>
      )}
    />
  );
};

type TraverseActionProps = {
  setTraverseOp: (t: TraverseOp) => void;
};

const TraverseAction: FC<TraverseActionProps> = ({ setTraverseOp }) => {
  const traverseMenuRef = useRef<Menu>(null);

  const traverseItems: MenuItem[] = useMemo(
    () => [
      {
        label: "Depth First",
        icon: PrimeIcons.ANGLE_DOUBLE_DOWN,
        command: () => setTraverseOp(TraverseOp.DEPTH_FIRST),
      },
      {
        label: "Breadth First",
        icon: PrimeIcons.ANGLE_DOUBLE_RIGHT,
        command: () => setTraverseOp(TraverseOp.BREADTH_FIRST),
      },
    ],
    [setTraverseOp]
  );

  return (
    <>
      <Button
        outlined
        label="Traversal"
        size="small"
        severity="info"
        onClick={(event) => traverseMenuRef.current?.toggle(event)}
      />
      <Menu popup ref={traverseMenuRef} model={traverseItems} />
    </>
  );
};

export default GraphActions;
