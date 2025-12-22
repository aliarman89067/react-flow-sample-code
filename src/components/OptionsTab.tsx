import { useContext, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FlowContext } from "@/context";
import { type LucideIcon } from "lucide-react";

interface Props {
  data: {
    label: string;
    options: { id: number; label: string; icon: LucideIcon }[];
  };
}

const OptionsTab = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setNodes, nodes } = useContext(FlowContext);

  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    Icon: LucideIcon;
  } | null>(null);

  const handleCreate = () => {
    if (!selectedOption) {
      alert("Please select an option before creating a node.");
      return;
    }
    const newNode: any = {
      id: `n${nodes.length + 1}`,
      type: data.label === "Triggers Type" ? "directMessage" : "messageNode",
      position: { x: 0, y: 0 },
      data: { label: selectedOption.label, Icon: selectedOption.Icon },
    };
    setNodes((prevNodes) => [newNode, ...prevNodes]);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>{data.label}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{data.label}</DialogTitle>
            <DialogDescription>
              {data.label.toLowerCase()} are listed below
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col mt-3 gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              {data.options.map((option) => (
                <Button
                  key={option.id}
                  onClick={() =>
                    setSelectedOption({
                      Icon: option.icon,
                      label: option.label,
                    })
                  }
                  className={`px-5 py-2.5 rounded-lg border border-neutral-600 ${
                    selectedOption?.label === option.label
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-gray-300 text-black hover:bg-gray-400"
                  } `}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleCreate}
              variant="outline"
              className="mt-7 w-fit px-5"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OptionsTab;
