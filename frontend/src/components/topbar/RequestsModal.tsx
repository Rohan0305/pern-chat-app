import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useAcceptFriendship from "../../hooks/useAcceptFriendship";
import useGetRequests from "../../hooks/useGetRequests";
import useRequests from "../../zustand/useRequests";
import useIgnoreRequest from "../../hooks/useIgnoreRequest";

export const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  useGetRequests();
  const {requests, setRequests} = useRequests();
  const { authUser } = useAuthContext();
  const [removeRequestId, setRemoveRequestId] = useState<string | null>(null);
  const { acceptLoading, acceptFriendship } = useAcceptFriendship();
  const { ignoreLoading, ignoreRequest } = useIgnoreRequest();

  useEffect(() => {
    if ((acceptLoading || ignoreLoading) && removeRequestId) {
      let currentRequests = requests ?? [];
      currentRequests = requests?.filter((request) => request.id !== removeRequestId) ?? [];
      setRequests(currentRequests)
    }
  }, [acceptLoading, ignoreLoading, removeRequestId]);

  return (
    <div className="fixed left-1/2 top-[300%] -translate-x-1/2 flex w-128 justify-center items-start">
      <div className="bg-white min-h-[200px] max-h-[80vh] w-full max-w-lg overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <p className="text-black text-center mb-2 font-bold">Friend Requests</p>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {requests?.length ? (
          requests?.map((request) => {
            if (request.sender.id === authUser?.id) {
              return null;
            }

            return (
              <div
                key={request.id}
                className="border border-gray-300 h-16 rounded-lg w-full max-w-lg bg-gray-600 flex flex-row justify-between items-center space-x-2 px-2"
              >
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={request.sender.profilePic}
                    className="size-10"
                    alt="user avatar"
                  />
                  <p className="text-blue-300">
                    {request.sender?.fullName || "Unknown User"}
                  </p>
                  <p className="text-blue-300 italic">
                    ({request.sender?.username})
                  </p>
                </div>

                <div className="flex flex-row space-x-2">
                  <button
                    onClick={async () => {
                      setRemoveRequestId(request.id);
                      await acceptFriendship(request.sender?.id);
                    }}
                    className="bg-green-400 hover:bg-green-300 h-10 w-18 px-4 py-2 rounded flex text-white text-center text-sm items-center justify-center"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={async () => {
                      setRemoveRequestId(request.id);
                      await ignoreRequest(request.id);
                    }}
                    className="bg-red-400 hover:bg-red-300 h-10 w-18 px-4 py-2 rounded flex text-white text-center text-sm items-center justify-center"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-black text-center italic">
            You have no friend requests
          </p>
        )}
      </div>
    </div>
  );
};
