import { addEdge, Edge, Node, XYPosition } from "reactflow";

let ID = 0;
const ids = new Map<number, string>();

function dataToNodes(data: Array<Array<number>>): Node[] {
  const nodes: Node[] = [];
  const set = new Set<number>();

  for (const v of data) {
    set.add(v[0]);
    set.add(v[1]);
  }
  for (const v of set) {
    const newNode = createGraphNode(v, { x: 50 * v, y: 50 * v });
    ids.set(v, newNode.id);
    nodes.push(newNode);
  }

  return nodes;
}

function dataToEdges(data: Array<Array<number>>): Edge[] {
  let edges: Edge[] = [];

  for (const v of data) {
    const node1 = ids.get(v[0]) ?? `n${v[0]}`;
    const node2 = ids.get(v[1]) ?? `n${v[1]}`;
    const weight = v[2];
    edges = addEdge(
      {
        type: "customEdge",
        data: { weight },
        source: node1,
        sourceHandle: null,
        target: node2,
        targetHandle: null,
      },
      edges
    );
  }

  return edges;
}

export function graphDataToFlow(data: Array<Array<number>>) {
  const nodes = dataToNodes(data);
  const edges = dataToEdges(data);
  ID = nodes.length + 10;
  return { nodes, edges };
}

export function createGraphNode(nid?: number, position?: XYPosition): Node {
  const id = nid ?? ++ID;
  return {
    id: `n${id}`,
    type: "customNode",
    data: { label: id },
    position: position ?? { x: 0, y: 0 },
  };
}
