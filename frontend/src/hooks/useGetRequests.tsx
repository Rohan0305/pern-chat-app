import React, { useEffect } from "react";
import useRequests from "../zustand/useRequests";
import toast from "react-hot-toast";

const useGetRequests = () => {
  const [loading, setLoading] = React.useState(false);
  const {setRequests } = useRequests();

  useEffect(() => {
    const getRequests = async () => {
      setLoading(true);
      setRequests([]);

      try {
        const res = await fetch(`/api/friends/getReceivedFriendRequests`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "An error occurred");
        }
        if (!data) return;
        setRequests(data);
      } catch (error: any) {
        toast.error(error.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [setRequests]);
  return {loading}
};

export default useGetRequests;