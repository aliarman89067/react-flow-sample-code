import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FlowContext } from "@/context";
import { type LucideIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface Props {
  data: {
    label: string;
    options: { id: number; label: string; icon: LucideIcon }[];
  };
}

const platforms = [
  {
    id: 1,
    Icon: FaFacebook,
    label: "Facebook",
  },
  {
    id: 2,
    Icon: FaInstagramSquare,
    label: "Instagram",
  },
];

const TriggerOptionsTab = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setNodes, nodes } = useContext(FlowContext);

  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    Icon: LucideIcon;
  } | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    | {
        label: string;
        Icon: IconType;
      }[]
    | null
  >(null);

  const handleCreate = () => {
    if (!selectedOption) {
      alert("Please select an option before creating a node.");
      return;
    }
    if (selectedPlatforms?.length === 0) {
      alert("Please select atleast 1 platform.");
      return;
    }
    const newNode: any = {
      id: `n${nodes.length + 1}`,
      type: "trigger",
      position: { x: 0, y: 0 },
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        platforms: selectedPlatforms?.map((item) => ({
          Icon: item.Icon,
          label: item.label,
        })),
      },
    };
    setNodes((prevNodes) => [newNode, ...prevNodes]);
    setIsOpen(false);
  };

  const handleAddPlatform = ({
    Icon,
    id,
    label,
  }: {
    id: number;
    Icon: IconType;
    label: string;
  }) => {
    const isExist = selectedPlatforms?.find((item) => item.label === label);
    if (isExist) {
      setSelectedPlatforms(
        (prev) => prev?.filter((item) => item.label !== label) || []
      );
    } else {
      setSelectedPlatforms((prev) => [...(prev || []), { Icon, label }]);
    }
  };

  const isPlatformSelected = (platform: string) => {
    return !!selectedPlatforms?.find((item) => item.label === platform);
  };

  return (
    <div className="flex flex-col gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>{data.label}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md!">
          <DialogHeader>
            <DialogTitle>{data.label}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col mt-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-neutral-700">
                Select Trigger Type
              </span>

              <Select
                value={selectedOption?.label}
                onValueChange={(value) => {
                  const selectedValue = data.options.find(
                    (item) => item.label === value
                  );
                  if (selectedValue) {
                    setSelectedOption({
                      Icon: selectedValue.icon,
                      label: selectedValue.label,
                    });
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    {data.options.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.label}
                        className="flex items-center gap-2"
                      >
                        <option.icon />
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {selectedOption ? (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-neutral-700">
                  Pick target platforms
                </span>
                <div className="flex items-center gap-3 flex-wrap">
                  {platforms.map((platform) => (
                    <div
                      key={platform.id}
                      onClick={() => handleAddPlatform(platform)}
                      className={cn(
                        "px-5 py-2.5 rounded-lg cursor-pointer border-neutral-600 border flex items-center gap-3",
                        isPlatformSelected(platform.label)
                          ? "bg-neutral-800"
                          : "bg-neutral-200"
                      )}
                    >
                      <span
                        className={cn(
                          "w-3 h-3 rounded-full border-neutral-400",
                          isPlatformSelected(platform.label)
                            ? "bg-blue-500 border"
                            : "bg-white border"
                        )}
                      ></span>
                      <div
                        className={cn(
                          "flex items-center gap-1",
                          isPlatformSelected(platform.label)
                            ? "text-white"
                            : "text-neutral-800"
                        )}
                      >
                        <platform.Icon className="size-4" />
                        {platform.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-center gap-4">
              <Button onClick={handleCreate} className="mt-7 px-5 flex-1">
                Create
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsOpen(false)}
                className="mt-7 px-5 flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TriggerOptionsTab;
