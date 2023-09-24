import { Edge, Node } from "reactflow";

import { Direction } from "./types";

type ID = string;
type AdjacencyList = Map<ID, Set<ID>>;

export function buildNodesDict(nodes: Node[]) {
  return nodes.reduce(
    (dict, node) => dict.set(node.id, node),
    new Map<string, Node>()
  );
}

function buildAdjacencyList(edges: Edge[], direction: Direction) {
  const adjList: AdjacencyList = new Map();

  function addEdge(source: ID, target: ID) {
    if (!adjList.has(source)) {
      adjList.set(source, new Set());
    }
    adjList.get(source)!.add(target);
  }

  for (const edge of edges) {
    addEdge(edge.source, edge.target);
    if (direction === Direction.UNDIRECTED) {
      addEdge(edge.target, edge.source);
    }
  }

  return adjList;
}

function* adjacentNodes(adjacency: AdjacencyList, nodeId: ID) {
  if (adjacency.has(nodeId)) {
    for (const id of adjacency.get(nodeId)!) {
      yield id;
    }
  }
}

function* adjacentUnvisitedNodes(
  adjacency: AdjacencyList,
  visited: Set<ID>,
  nodeId: ID
) {
  for (const id of adjacentNodes(adjacency, nodeId)) {
    if (!visited.has(id)) {
      visited.add(id);
      yield id;
    }
  }
}

export function* depthFirstTraverse(
  nodes: Node[],
  edges: Edge[],
  direction: Direction
) {
  if (!nodes.length) {
    return;
  }

  const stack: ID[] = [];
  const visited = new Set<ID>();
  const adjacency = buildAdjacencyList(edges, direction);

  stack.push(nodes[0].id);
  visited.add(nodes[0].id);
  yield nodes[0].id;

  while (stack.length) {
    const visit = stack[stack.length - 1];
    if (!visit) continue;
    let adjNode = "";
    for (const id of adjacentUnvisitedNodes(adjacency, visited, visit)) {
      adjNode = id;
      break;
    }
    if (adjNode) {
      stack.push(adjNode);
      yield adjNode;
    } else {
      stack.pop();
    }
  }
}

export function* breadthFirstTraverse(
  nodes: Node[],
  edges: Edge[],
  direction: Direction
) {
  if (!nodes.length) {
    return;
  }

  const queue: ID[] = [];
  const visited = new Set<ID>();
  const adjacency = buildAdjacencyList(edges, direction);

  queue.push(nodes[0].id);
  visited.add(nodes[0].id);

  while (queue.length) {
    const visit = queue.shift();
    if (!visit) continue;
    yield visit;
    for (const adjNode of adjacentUnvisitedNodes(adjacency, visited, visit)) {
      queue.push(adjNode);
    }
  }
}
