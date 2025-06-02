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
  senderId: string;
  receiverId: string;
  status: $Enums.FriendRequestStatus;
};
