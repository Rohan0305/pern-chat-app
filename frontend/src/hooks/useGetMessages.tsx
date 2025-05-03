import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;
      setLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/${selectedConversation?.id}`);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "An error occurred");
        }
        if (!data) return;
        setMessages(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return {loading, messages}
};
