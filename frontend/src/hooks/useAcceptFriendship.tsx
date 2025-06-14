import { useState } from "react";
import toast from "react-hot-toast";

const useAcceptFriendship = () => {
    const [acceptLoading, setLoading] = useState(false);

    const acceptFriendship = async (senderId: string) => {
        setLoading(true);
        try{
            const res = await fetch(`/api/friends/acceptFriendRequest/${senderId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            console.log(data)
        }catch(error: any){
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return {acceptLoading, acceptFriendship};
}

export default useAcceptFriendship;