import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useRequests from "../zustand/useRequests";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useListenAcceptedFriendShips = () => {
    const {socket} = useSocketContext();
    const {conversations, setConversations} = useConversation();
    const {requests, setRequests} = useRequests();

    useEffect(() => {
        socket?.on("acceptedFriendship", (updatedFriendRequest, newFriend) => {

            toast(`${updatedFriendRequest.receiver.fullName} accepted your friend request!`, {
                icon: '👋',
                style: {
                    borderRadius: '8px',
                     background: '#333',
                    color: '#fff',
                },
            });

            setConversations([...(conversations ? conversations : []), newFriend])
        });
        return () => {
            socket?.off("acceptedFriendship");
        }
    }, [socket, requests, setRequests])
}

export default useListenAcceptedFriendShips;