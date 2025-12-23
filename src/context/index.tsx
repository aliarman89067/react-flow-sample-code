import Node from "@/components/custom_nodes/node";
import Trigger from "@/components/custom_nodes/trigger";
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type nodes = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
}[];
type edges = {
  id: string;
  source: string;
  target: string;
}[];

interface FlowContextType {
  nodes: nodes;
  edges: edges;
  setNodes: Dispatch<SetStateAction<nodes>>;
  setEdges: Dispatch<SetStateAction<edges>>;
  nodeTypes: any;
}

export const FlowContext = createContext<FlowContextType>({
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
  nodeTypes: {},
});

const nodeTypes: any = {
  trigger: Trigger,
  messageNode: Node,
};

export const Provider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<nodes>([]);
  const [edges, setEdges] = useState<edges>([]);
  return (
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        nodeTypes,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
