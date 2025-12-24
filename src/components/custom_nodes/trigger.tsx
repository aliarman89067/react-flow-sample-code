import { FlowContext } from "@/context";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { EditIcon, type LucideIcon } from "lucide-react";
import { useContext } from "react";
import type { IconType } from "react-icons";

type TriggerType = {
  id: string;
  data: {
    node: {
      label: string;
      Icon: LucideIcon;
    };
    nodeData: {
      type: "Direct Message" | "Post Message";
    };
    platforms: {
      label: string;
      Icon: LucideIcon;
    }[];
  };
};

const Trigger = ({ data, id }: TriggerType) => {
  const { setEditData } = useContext(FlowContext);
  const { node, platforms, nodeData } = data;

  const handleUpdateNode = () => {
    setEditData({
      id,
      type: nodeData.type,
      nodeData,
      isTrigger: true,
      selectedOption: {
        label: node.label,
        Icon: node.Icon,
      },
      platforms,
    });
  };

  return (
    <div className="flex flex-col items-center gap-1 w-fit">
      <div className="w-16 h-12 rounded-l-full ring-[#14213d] ring-offset-2 ring-2 bg-[#14213d] border-neutral-800 flex items-center justify-center">
        <div className="w-8 h-8 relative flex items-center justify-center">
          <node.Icon className="absolute size-3 text-white z-20" />
          <div className="absolute w-full h-full rounded-full top-0 left-0 bg-white/0 blur-xl z-[11]" />
          <div className="absolute w-full h-full rounded-full top-0 left-0 bg-white/10 backdrop-blur-md z-10" />
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              background:
                "conic-gradient(from 0deg, #ff008c, #d309e1, #9c1aff, #7700ff, #ff008c)",
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
      <div className="flex flex-col">
        <span className="font-semibold text-[8px] text-neutral-800">
          {node.label}
        </span>
        <div className="flex items-center gap-1">
          {platforms.map(
            (item: { Icon: IconType; label: string }, index: number) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center"
              >
                <item.Icon className="size-2.5 text-white" />
              </div>
            )
          )}
          <div
            onClick={handleUpdateNode}
            className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-800 flex items-center justify-center cursor-pointer"
          >
            <EditIcon className="size-2.5 text-white" />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default Trigger;
