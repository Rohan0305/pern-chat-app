import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, isLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    isLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthUser(null);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
        isLoading(false)
    }
  };

  return { loading, logout };
};

export default useLogout;