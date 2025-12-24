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
  data: any
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
  editData: any;
  setEditData: Dispatch<SetStateAction<any>>;
}

export const FlowContext = createContext<FlowContextType>({
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
  nodeTypes: {},
  editData: null,
  setEditData: () => {},
});

const nodeTypes: any = {
  trigger: Trigger,
  node: Node,
};

export const Provider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<nodes>([]);
  const [edges, setEdges] = useState<edges>([]);
  const [editData, setEditData] = useState(null);
  return (
    <FlowContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        nodeTypes,
        editData,
        setEditData,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
