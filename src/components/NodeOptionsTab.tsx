import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { LucideIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

interface Props {
  data: {
    label: string;
    options: { id: number; label: string; icon: LucideIcon }[];
  };
}

const NodeOptionsTab = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    Icon: LucideIcon;
  } | null>(null);

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
                Select Node Type
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
              <>
                {selectedOption.label === "Reply" ? (
                  <Reply isOpen={isOpen} setIsOpen={setIsOpen} />
                ) : null}
                {selectedOption.label === "Email" ? <>Email</> : null}
                {selectedOption.label === "Template" ? <>Template</> : null}
              </>
            ) : null}
            {!selectedOption ? (
              <div className="flex items-center justify-center gap-4">
                <Button
                  disabled
                  onClick={() => {}}
                  className="mt-7 px-5 flex-1"
                >
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
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NodeOptionsTab;

interface ReplyProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Reply = ({ isOpen, setIsOpen }: ReplyProps) => {
  const [isAIActive, setIsAiActive] = useState(false);
  const [input, setInput] = useState("");
  const [selectedAI, setSelectedAI] = useState<{
    image: string;
    label: string;
  } | null>(null);

  const AI = [
    {
      id: 1,
      label: "Open AI",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png",
    },
    {
      id: 2,
      label: "Google Gemini",
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-ai-studio-icon.png",
    },
  ];

  const handleCreate = () => {
    if (!input.trim()) {
      alert("Please add input!");
      return;
    }
    if (isAIActive && !selectedAI) {
      alert("Please select your AI!");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-neutral-700">
        Generate Reply with AI
      </span>
      <Switch
        checked={isAIActive}
        onCheckedChange={() => {
          setIsAiActive(!isAIActive);
        }}
      />
      <div className="flex flex-col mt-3 gap-1">
        {isAIActive ? (
          <div className="flex flex-col gap-1">
            <Select
              value={selectedAI?.label}
              onValueChange={(value) => {
                const selectedValue = AI.find((item) => item.label === value);
                if (selectedValue) {
                  setSelectedAI({
                    image: selectedValue.image,
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
                  {AI.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.label}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={option.image}
                        alt={`${option.label} image`}
                        className="w-5 h-5 object-contain"
                      />
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedAI && (
              <Textarea
                placeholder="Describe our brand to user which is..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-neutral-700">
              Your Reply
            </span>
            <Textarea
              placeholder="Hey how are you...."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={() => {}} className="mt-7 px-5 flex-1">
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
  );
};
