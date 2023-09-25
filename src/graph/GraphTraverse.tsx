import { FC, useEffect, useMemo, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";

import {
  buildNodesDict,
  depthFirstTraverse,
  breadthFirstTraverse,
} from "./traverseUtils";
import useGraphFlow from "./useGraphFlow";
import { TraverseOp } from "./types";

type GraphTraverseProps = {
  op: TraverseOp | undefined;
  onClear: () => void;
};

const GraphTraverse: FC<GraphTraverseProps> = ({ op, onClear }) => {
  const { nodes, edges, direction, rootNode } = useGraphFlow();
  const [opResult, setOpResult] = useState<{
    op: string;
    result: string[];
  }>();
  const nodesDict = useMemo(() => {
    return buildNodesDict(nodes);
  }, [nodes]);

  useEffect(() => {
    if (op === TraverseOp.DEPTH_FIRST) {
      setOpResult({
        op: "Depth First Traverse",
        result: [...depthFirstTraverse(nodes, edges, direction, rootNode)],
      });
    } else if (op === TraverseOp.BREADTH_FIRST) {
      setOpResult({
        op: "Breadth First Traverse",
        result: [...breadthFirstTraverse(nodes, edges, direction, rootNode)],
      });
    } else {
      setOpResult(undefined);
    }
  }, [op, nodes, edges, rootNode]);

  const renderResult = () => {
    if (opResult) {
      const title = (
        <div className="flex align-items-center justify-content-between">
          <div className="font-normal">{opResult.op}</div>
          <Button
            text
            icon={PrimeIcons.TIMES}
            severity="secondary"
            onClick={onClear}
          />
        </div>
      );
      return (
        <Card title={title} className="mt-2">
          <div className="flex flex-wrap gap-3">
            {opResult.result.map((n) => {
              const node = nodesDict.get(n);
              return <Chip key={n} label={node?.data?.label} />;
            })}
          </div>
        </Card>
      );
    }
  };

  return renderResult();
};

export default GraphTraverse;
