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
import OptionsTab from "./OptionsTab";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const triggerData = {
  label: "Triggers Type",
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
    {
      id: 3,
      label: "Like Post",
      icon: HandHeartIcon,
    },
    {
      id: 4,
      label: "Share Post",
      icon: Share2Icon,
    },
  ],
};

const messageNodeOptions = {
  label: "Node Type",
  options: [
    {
      id: 1,
      label: "Send Template",
      icon: LayoutTemplateIcon,
    },
    {
      id: 2,
      label: "Email",
      icon: SendIcon,
    },
    {
      id: 3,
      label: "Message",
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
          <OptionsTab data={triggerData} />
          <OptionsTab data={messageNodeOptions} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
