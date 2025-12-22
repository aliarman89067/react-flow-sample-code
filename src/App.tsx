import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { MenuIcon } from "lucide-react";
import FlowSheet from "./components/FlowSheet";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="relative overflow-x-hidden">
      <FlowSheet />
      <div
        onClick={() => setIsSidebarOpen(true)}
        className="absolute right-5 top-5 w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 cursor-pointer z-10"
      >
        <MenuIcon className="size-5 text-gray-600" />
      </div>
      <div className="relative w-full min-h-screen"></div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
};

export default App;
