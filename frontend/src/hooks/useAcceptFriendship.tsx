import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useAcceptFriendship = () => {
    const [acceptLoading, setLoading] = useState(false);
    const {conversations, setConversations} = useConversation();

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
            
            let currentConvos = conversations;
            if (currentConvos == null || currentConvos.length == 0) {
                setConversations([data])
            }
            currentConvos = [...(conversations ? conversations : []), data];
            setConversations(currentConvos);

        }catch(error: any){
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return {acceptLoading, acceptFriendship};
}

export default useAcceptFriendship;