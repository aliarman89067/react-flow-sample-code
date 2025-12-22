import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";

const Trigger = ({ data }: any) => {
  const { label, Icon } = data;
  return (
    <div className="flex flex-col items-center gap-1 w-fit">
      <div className="w-32 h-24 rounded-l-full ring-[#14213d] ring-offset-2 ring-2 bg-[#14213d] border-neutral-800 flex items-center justify-center">
        <div className="w-16 h-16 relative flex items-center justify-center">
          <Icon className="absolute size-6 text-white z-20" />
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
      <span className="font-semibold text-sm text-neutral-800">{label}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default Trigger;
