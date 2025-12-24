import React, {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
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
import { PlusIcon, type LucideIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { FlowContext } from "@/context";
import { cn } from "@/lib/utils";

interface Props {
  data: {
    label: string;
    options: { id: number; label: string; icon: LucideIcon }[];
  };
}

const NodeOptionsTab = ({ data }: Props) => {
  const { editData, setEditData } = useContext(FlowContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    Icon: LucideIcon;
  } | null>(null);

  useEffect(() => {
    if (editData && !editData.isTrigger) {
      setIsOpen(true);
      setSelectedOption({
        Icon: editData.selectedOption.Icon,
        label: editData.selectedOption.label,
      });
    }
  }, [editData, setEditData]);

  return (
    <div className="flex flex-col gap-3">
      <Dialog
        open={isOpen}
        onOpenChange={(value) => {
          if (!value) {
            setEditData(null);
            setSelectedOption(null);
          }
          setIsOpen(value);
        }}
      >
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
                  <Reply
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedOption={selectedOption}
                    editData={editData}
                    setEditData={setEditData}
                  />
                ) : null}
                {selectedOption.label === "Email" ? (
                  <Email
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    editData={editData}
                    setEditData={setEditData}
                    selectedOption={selectedOption}
                  />
                ) : null}
                {selectedOption.label === "Template" ? (
                  <Template
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    editData={editData}
                    setEditData={setEditData}
                    selectedOption={selectedOption}
                  />
                ) : null}
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
  selectedOption: {
    label: string;
    Icon: LucideIcon;
  };
  editData: any;
  setEditData: Dispatch<SetStateAction<any>>;
}

const Reply = ({
  isOpen,
  setIsOpen,
  selectedOption,
  editData,
  setEditData,
}: ReplyProps) => {
  const { nodes, setNodes } = useContext(FlowContext);
  const [isAiActive, setIsAiActive] = useState(false);
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

  useEffect(() => {
    if (editData) {
      setIsAiActive(editData.isAiActive);
      setSelectedAI(editData.model);
      setInput(editData.input);
    }
  }, [editData, setEditData]);

  const handleCreate = () => {
    if (!input.trim()) {
      alert("Please add input!");
      return;
    }
    if (isAiActive && !selectedAI) {
      alert("Please select your AI!");
      return;
    }
    const newNode: any = {
      id: `n${nodes.length + 1}`,
      type: "node",
      position: { x: 0, y: 0 },
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        nodeData: {
          type: "Reply",
          isAiActive: isAiActive,
          model: selectedAI,
          input: input,
        },
      },
    };
    setNodes((prevNodes) => [newNode, ...prevNodes]);
    setIsOpen(false);
    setEditData(null);
  };
  const updateNode = () => {
    if (!input.trim()) {
      alert("Please add input!");
      return;
    }
    if (isAiActive && !selectedAI) {
      alert("Please select your AI!");
      return;
    }
    const updatedNode: any = {
      id: editData.id,
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        nodeData: {
          type: "Reply",
          isAiActive: isAiActive,
          model: selectedAI,
          input: input,
        },
      },
    };
    setNodes((prev) =>
      prev.map((item) => {
        const targetNode = item.id === updatedNode.id;
        if (targetNode) {
          return {
            ...item,
            data: updatedNode.data,
          };
        } else {
          return item;
        }
      })
    );
    setIsOpen(false);
    setEditData(null);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-neutral-700">
        Generate Reply with AI
      </span>
      <Switch
        checked={isAiActive}
        onCheckedChange={() => {
          setIsAiActive(!isAiActive);
        }}
      />
      <div className="flex flex-col mt-3 gap-1">
        {isAiActive ? (
          <div className="flex flex-col gap-3">
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
        <Button
          onClick={() => (editData ? updateNode() : handleCreate())}
          className="mt-7 px-5 flex-1"
        >
          {editData ? "Update" : "Create"}
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

interface EmailProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedOption: {
    label: string;
    Icon: LucideIcon;
  };
  editData: any;
  setEditData: Dispatch<SetStateAction<any>>;
}

const Email = ({
  isOpen,
  setIsOpen,
  selectedOption,
  editData,
  setEditData,
}: EmailProps) => {
  const { nodes, setNodes } = useContext(FlowContext);

  const [emailInfo, setEmailInfo] = useState<{
    to: string;
    subject: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (editData) {
      setEmailInfo({
        to: editData.to,
        subject: editData.subject,
        message: editData.message,
      });
    }
  }, [editData]);

  const handleCreate = () => {
    if (!emailInfo?.to || !emailInfo.subject || !emailInfo.message) {
      alert("Please fill all the fields");
      return;
    }
    const isValidEmail = emailInfo.to.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!isValidEmail) {
      alert("Please add a valide email");
      return;
    }
    const newNode: any = {
      id: `n${nodes.length + 1}`,
      type: "node",
      position: { x: 0, y: 0 },
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        nodeData: {
          type: "Email",
          to: emailInfo.to,
          subject: emailInfo.subject,
          message: emailInfo.message,
        },
      },
    };
    setNodes((prevNodes) => [newNode, ...prevNodes]);
    setIsOpen(false);
    setEditData(null);
  };

  const handleUpdate = () => {
    if (!emailInfo?.to || !emailInfo.subject || !emailInfo.message) {
      alert("Please fill all the fields");
      return;
    }
    const isValidEmail = emailInfo.to.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!isValidEmail) {
      alert("Please add a valide email");
      return;
    }
    const updatedNode: any = {
      id: editData.id,
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        nodeData: {
          type: "Email",
          to: emailInfo.to,
          subject: emailInfo.subject,
          message: emailInfo.message,
        },
      },
    };
    setNodes((prev) =>
      prev.map((item) => {
        const targetNode = item.id === updatedNode.id;
        if (targetNode) {
          return {
            ...item,
            data: updatedNode.data,
          };
        } else {
          return item;
        }
      })
    );
    setIsOpen(false);
    setEditData(null);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* <span className="text-sm font-semibold text-neutral-700">Send Email</span> */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-neutral-700">To</span>
          <Input
            placeholder="John doe@gmail.com..."
            value={emailInfo?.to}
            type="email"
            onChange={(e) => {
              setEmailInfo((prev) => ({
                message: prev?.message || "",
                subject: prev?.subject || "",
                to: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-neutral-700">
            Subject
          </span>
          <Input
            placeholder="New Lead Generated..."
            value={emailInfo?.subject}
            onChange={(e) => {
              setEmailInfo((prev) => ({
                message: prev?.message || "",
                subject: e.target.value,
                to: prev?.to || "",
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-neutral-700">
            Message
          </span>
          <Input
            placeholder="Hey john doe site got new lead. here's info..."
            value={emailInfo?.message}
            onChange={(e) => {
              setEmailInfo((prev) => ({
                message: e.target.value,
                subject: prev?.subject || "",
                to: prev?.to || "",
              }));
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => (editData ? handleUpdate() : handleCreate())}
          className="mt-7 px-5 flex-1"
        >
          {editData ? "Update" : "Create"}
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

interface TemplateProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedOption: {
    label: string;
    Icon: LucideIcon;
  };
  editData: any;
  setEditData: Dispatch<SetStateAction<any>>;
}

const Template = ({
  isOpen,
  setIsOpen,
  selectedOption,
  editData,
  setEditData,
}: TemplateProps) => {
  const { nodes, setNodes } = useContext(FlowContext);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [templateData, setTemplateData] = useState<{
    id: string;
    text: string;
    image?: string;
  } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id: string;
    text: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    if (editData) {
      setSelectedTemplate(editData.template);
    }
  }, [editData]);

  const templates = localStorage.getItem("templates");
  const parsedTemplates: { id: string; text: string; image?: string }[] =
    templates ? JSON.parse(templates) : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTemplateData((prev) => ({
        id: prev?.id || "",
        text: prev?.text || "",
        image: imageUrl,
      }));
    }
  };

  const handleCreateTemplate = () => {
    if (!templateData?.text) {
      alert("Please add text for template");
      return;
    }
    const updatedTemplates = [...parsedTemplates, templateData];
    localStorage.setItem("templates", JSON.stringify(updatedTemplates));
    setTemplateData(null);
    setIsTemplateOpen(false);
  };

  const handleCreate = () => {
    if (!selectedTemplate) {
      alert("Please select a template");
      return;
    }
    const newNode: any = {
      id: `n${nodes.length + 1}`,
      type: "node",
      position: { x: 0, y: 0 },
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        nodeData: {
          type: "Template",
          template: selectedTemplate,
        },
      },
    };

    setNodes((prevNodes) => [newNode, ...prevNodes]);
    setIsOpen(false);
    setEditData(null);
  };

  const handleUpdate = () => {
    if (!selectedTemplate) {
      alert("Please select a template");
      return;
    }
    const updatedNode: any = {
      id: editData.id,
      data: {
        node: {
          label: selectedOption.label,
          Icon: selectedOption.Icon,
        },
        nodeData: {
          type: "Template",
          template: selectedTemplate,
        },
      },
    };
    setNodes((prev) =>
      prev.map((item) => {
        const targetNode = item.id === updatedNode.id;
        if (targetNode) {
          return {
            ...item,
            data: updatedNode.data,
          };
        } else {
          return item;
        }
      })
    );
    setIsOpen(false);
    setEditData(null);
  };

  return (
    <>
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-md!">
          <DialogHeader>
            <DialogTitle>Create Template</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-neutral-700">
                Text
              </span>
              <Textarea
                placeholder="Template text..."
                value={templateData?.text}
                onChange={(e) => {
                  if (!templateData || !templateData.id) {
                    setTemplateData({
                      id: Date.now().toString(),
                      text: templateData?.text || "",
                      image: templateData?.image,
                    });
                  }
                  setTemplateData((prev) => ({
                    id: prev!.id || "",
                    image: prev?.image,
                    text: e.target.value,
                  }));
                }}
              />
            </div>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-neutral-700">
                Image
              </span>
              {templateData?.image ? (
                <img
                  src={templateData?.image}
                  alt="Image"
                  className="w-full h-40 ronuded-xl object-cover"
                />
              ) : (
                <div className="w-full h-28 rounded-xl bg-neutral-400"></div>
              )}
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={handleCreateTemplate} className="mt-7 px-5 flex-1">
              {editData ? "Update" : "Create"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsTemplateOpen(false)}
              className="mt-7 px-5 flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-neutral-700">
          Pick a tempate
        </span>
        <div className="grid grid-cols-2 gap-3">
          {parsedTemplates.length === 0 ? (
            <div
              onClick={() => setIsTemplateOpen(true)}
              className="justify-center h-48 bg-neutral-200 rounded-xl flex flex-col items-center cursor-pointer"
            >
              <PlusIcon className="size-4 text-neutral-800" />
              <span className="text-sm text-neutral-800">
                Create first template
              </span>
            </div>
          ) : (
            <>
              {parsedTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate({
                      id: template.id,
                      text: template.text,
                      image: template.image,
                    });
                  }}
                  className={cn(
                    "relative justify-center h-48 bg-neutral-200 rounded-xl p-3 flex flex-col items-center cursor-pointer gap-1",
                    selectedTemplate?.id === template.id &&
                      "border border-neutral-600"
                  )}
                >
                  <h3 className="text-neutral-800 font-semibold text-sm">
                    {template.text}
                  </h3>
                  <img
                    src={template.image}
                    alt="Image"
                    className="w-full object-cover h-32 rounded-xl"
                  />
                </div>
              ))}
              <div
                onClick={() => setIsTemplateOpen(true)}
                className="justify-center h-48 bg-neutral-200 rounded-xl flex flex-col items-center cursor-pointer"
              >
                <PlusIcon className="size-4 text-neutral-800" />
                <span className="text-sm text-neutral-800">
                  Create first template
                </span>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => (editData ? handleUpdate() : handleCreate())}
            className="mt-7 px-5 flex-1"
          >
            {editData ? "Update" : "Create"}
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
    </>
  );
};
