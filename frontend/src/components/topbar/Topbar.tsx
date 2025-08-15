import { useState } from "react";
import NewFriendSearch from "./NewFriendSearch";
import { Inbox } from "lucide-react";
import { Modal } from "./RequestsModal";

const Topbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 h-16 flex flex-row items-center justify-between p-4 gap-4">
      <NewFriendSearch />
      <button
        onClick={() => setOpen(!open)}
        className="relative p-3 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30 rounded-xl group shadow-lg"
      >
        <Inbox className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Topbar;
