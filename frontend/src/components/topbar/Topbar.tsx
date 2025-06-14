import { useState } from "react";
import NewFriendSearch from "./NewFriendSearch";
import { Inbox } from "lucide-react";
import { Modal } from "./RequestsModal";

const Topbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-700 h-16 flex flex-row items-center justify-between p-1 md:p-4 gap-2">
      <NewFriendSearch />
      <Inbox onClick={() => setOpen(!open)} />

      <Modal isOpen={open} onClose={() => setOpen(false)}/>
    </div>
  );
};

export default Topbar;
