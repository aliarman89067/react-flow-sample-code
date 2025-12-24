import { useContext, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { EditIcon, InfoIcon, ItalicIcon, type LucideIcon } from "lucide-react";
import { FlowContext } from "@/context";

type NodeDataType =
  | {
      type: "Reply";
      isAiActive: boolean;
      model: {
        image: string;
        label: string;
      } | null;
      input: string;
    }
  | {
      type: "Email";
      to: string;
      subject: string;
      message: string;
    }
  | {
      type: "Template";
      template: {
        id: string;
        text: string;
        image?: string;
      };
    };

type NodeType = {
  data: {
    node: {
      Icon: LucideIcon;
      label: string;
    };
    nodeData: NodeDataType;
  };
  id: string;
};

const Node = ({ data, id }: NodeType) => {
  const { setEditData } = useContext(FlowContext);
  const { node, nodeData } = data;

  const handleUpdateNode = () => {
    if (nodeData.type === "Reply") {
      setEditData({
        id,
        isTrigger: false,
        type: nodeData.type,
        isAiActive: nodeData.isAiActive,
        selectedOption: {
          label: node.label,
          Icon: node.Icon,
        },
        model: nodeData.model
          ? {
              image: nodeData.model.image,
              label: nodeData.model.label,
            }
          : null,
        input: nodeData.input,
      });
    } else if (nodeData.type === "Email") {
      setEditData({
        id,
        isTrigger: false,
        type: nodeData.type,
        selectedOption: {
          label: node.label,
          Icon: node.Icon,
        },
        to: nodeData.to,
        subject: nodeData.subject,
        message: nodeData.message,
      });
    } else if (nodeData.type === "Template") {
      setEditData({
        id,
        isTrigger: false,
        type: nodeData.type,
        selectedOption: {
          label: node.label,
          Icon: node.Icon,
        },
        template: {
          id: nodeData.template.id,
          text: nodeData.template.text,
          image: nodeData.template.image,
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 w-fit">
      <div className="flex justify-start items-start w-full gap-0.5">
        {nodeData.type === "Reply" && (
          <>
            {nodeData.isAiActive && nodeData.model && (
              <div className="w-4 h-4 rounded-full bg-white border border-neutral-800 flex items-center justify-center">
                <img
                  src={nodeData.model?.image}
                  alt={`${nodeData.model?.label} image`}
                  className="size-2.5 object-contain"
                />
              </div>
            )}
            {nodeData.input && (
              <div className="group relative w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center cursor-text">
                <div className="group-hover:flex hidden absolute left-2.5 bottom-2.5 bg-neutral-800 px-2 py-1.5 text-white text-[8px] min-w-28 rounded-lg z-[100]">
                  {nodeData.input}
                </div>
                <ItalicIcon className="size-2.5 text-white" />
              </div>
            )}
          </>
        )}
        {nodeData.type === "Email" && (
          <>
            <div className="relative group w-4 h-4 rounded-full bg-neutral-800 border border-neutral-800 flex items-center justify-center cursor-text">
              <div className="group-hover:flex hidden absolute left-2.5 bottom-2.5 bg-neutral-800 px-2 py-1.5 text-white text-[8px]  rounded-lg z-[100] flex-col">
                <div className="flex items-center gap-1 border-b border-neutral-600">
                  <span>{nodeData.to}</span>
                </div>
                <div className="flex items-center gap-1 border-b border-neutral-600">
                  <span>{nodeData.subject}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{nodeData.message}</span>
                </div>
              </div>
              <InfoIcon className="size-2.5 text-white" />
            </div>
          </>
        )}
        {nodeData.type === "Template" && (
          <>
            <div className="relative group w-4 h-4 rounded-full bg-neutral-800 border border-neutral-800 flex items-center justify-center cursor-text">
              <div className="group-hover:flex hidden absolute left-2.5 bottom-2.5 bg-neutral-800 px-2 py-1.5 text-white text-[8px]  rounded-lg z-[100] flex-col">
                <span className="text-white font-medium">
                  {nodeData.template.text}
                </span>
                <img
                  src={nodeData.template.image}
                  alt="image"
                  className="min-w-20 h-14 object-cover rounded-lg"
                />
              </div>
              <InfoIcon className="size-2.5 text-white" />
            </div>
          </>
        )}
        <div
          onClick={handleUpdateNode}
          className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-800 flex items-center justify-center cursor-pointer"
        >
          <EditIcon className="size-2.5 text-white" />
        </div>
      </div>
      <div className="w-12 h-12 rounded-xl ring-[#14213d] ring-offset-2 ring-2 bg-[#14213d] border-neutral-800 flex items-center justify-center">
        <div className="w-8 h-8 relative flex items-center justify-center">
          <node.Icon className="absolute size-3 text-neutral-800 z-20" />
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              background: "#fff",
              filter: "blur(0px)",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
      <span className="font-semibold text-[8px] text-neutral-800">
        {node.label}
      </span>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default Node;
