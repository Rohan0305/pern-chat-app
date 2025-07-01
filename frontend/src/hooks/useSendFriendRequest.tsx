import React from "react";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const sendFriendRequest = async (value: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/sendFriendRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: value }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success("Friend request sent")
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendFriendRequest };
};

export default useSendFriendRequest;
