import {
  HandHeartIcon,
  LayoutTemplateIcon,
  MailIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  SendIcon,
  Share2Icon,
  XIcon,
} from "lucide-react";
import OptionsTab from "./TriggerOptionsTab";
import TriggerOptionsTab from "./TriggerOptionsTab";
import NodeOptionsTab from "./NodeOptionsTab";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const triggerData = {
  label: "Add Trigger",
  options: [
    {
      id: 1,
      label: "Direct Message",
      icon: MessageSquareIcon,
    },
    {
      id: 2,
      label: "Post Message",
      icon: MessageCircleIcon,
    },
  ],
};

const messageNodeOptions = {
  label: "Add Node",
  options: [
    {
      id: 1,
      label: "Template",
      icon: LayoutTemplateIcon,
    },
    {
      id: 2,
      label: "Email",
      icon: SendIcon,
    },
    {
      id: 3,
      label: "Reply",
      icon: MailIcon,
    },
  ],
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  return (
    <div
      className={`absolute px-2.5 py-4 w-50 z-20 ${
        isSidebarOpen ? "right-0" : "-right-50"
      } top-0 border-l-1 bg-gray-200 border-gray-400 h-screen`}
    >
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <span>Menu</span>
          <XIcon
            size={20}
            className="text-gray-600 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <TriggerOptionsTab data={triggerData} />
          <NodeOptionsTab data={messageNodeOptions} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
