import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

const Node = ({ data }: any) => {
  const { label, Icon } = data;
  return (
    <div className="flex flex-col items-center gap-1 w-fit">
      <div className="w-32 h-24 rounded-xl ring-[#14213d] ring-offset-2 ring-2 bg-[#14213d] border-neutral-800 flex items-center justify-center">
        <div className="w-16 h-16 relative flex items-center justify-center">
          <Icon className="absolute size-6 text-neutral-800 z-20" />
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
      <span className="font-semibold text-sm text-neutral-800">{label}</span>
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
};

export default Node;
