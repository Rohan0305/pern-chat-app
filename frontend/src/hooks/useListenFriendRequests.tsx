import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useRequests from "../zustand/useRequests";
import toast from "react-hot-toast";

const useListenFriendRequests = () => {
    const {socket} = useSocketContext();
    const {requests, setRequests} = useRequests();

    useEffect(() => {
        socket?.on("newFriendRequest", (newFriendRequest) => {
            setRequests([...(requests || []), newFriendRequest]);

            toast(`${newFriendRequest.sender.fullName} sent you a friend request!`, {
                icon: '👋',
                style: {
                    borderRadius: '8px',
                    background: '#333',
                    color: '#fff',
                },
            });

        });
        return () => {
            socket?.off("newFriendRequest");
        }
    }, [socket, requests, setRequests])
}

export default useListenFriendRequests;