type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
};

type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  shouldShake?: boolean;
};

type RequestType = {
  id: string;
  createdAt: Date;
  receiverId: string;
  status: $Enums.FriendRequestStatus;
  sender: {
    id: string;
    username: string;
    fullName: string;
    profilePic: string;
  };
};
