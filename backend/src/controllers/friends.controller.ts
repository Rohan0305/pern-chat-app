import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambda = new LambdaClient({ region: "us-east-1" });

const sentFriendRequestEmail = async (username: string, email: string) => {
  const command = new InvokeCommand({
    FunctionName: "sendSentFriendRequestEmail",
    InvocationType: "RequestResponse",
    Payload: Buffer.from(JSON.stringify({ username, email })),
  });

  const response = await lambda.send(command);
  const payload = JSON.parse(new TextDecoder("utf-8").decode(response.Payload));
  return payload;
};

const acceptedFriendRequestEmail = async (username: string, email: string) => {
  const command = new InvokeCommand({
    FunctionName: "sendAcceptedFriendRequestEmail",
    InvocationType: "RequestResponse",
    Payload: Buffer.from(JSON.stringify({ username, email })),
  });

  const response = await lambda.send(command);
  const payload = JSON.parse(new TextDecoder("utf-8").decode(response.Payload));
  return payload;
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    const senderId = req.user.id;

    const potentialFriend = await prisma.user.findUnique({
      where: {
        username: userName,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!potentialFriend) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    const friendShip = await prisma.friendShip.findFirst({
      where: {
        OR: [
          { userId: senderId, friendId: potentialFriend.id },
          { userId: potentialFriend.id, friendId: senderId },
        ],
      },
    });

    if (friendShip) {
      res.status(400).json({ error: "User is already a friend" });
      return;
    }

    const sentFriendRequest = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId: potentialFriend.id,
        },
      },
    });

    if (sentFriendRequest) {
      res
        .status(400)
        .json({ error: "You have already sent a friend request to this user" });
      return;
    }

    const receivedFriendRequest = await prisma.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: potentialFriend.id,
          receiverId: senderId,
        },
      },
    });

    if (receivedFriendRequest) {
      res
        .status(400)
        .json({ error: "User has already sent you a friend request" });
      return;
    }

    const newFriendRequest = await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId: potentialFriend.id,
      },
      select: {
        id: true,
        createdAt: true,
        receiverId: true,
        status: true,
        sender: {
          select: {
            id: true,
            username: true,
            fullName: true,
            profilePic: true,
          },
        },
      },
    });

    const receiverSocketId = getReceiverSocketId(potentialFriend.id);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newFriendRequest", newFriendRequest);
    }

    try {
      await sentFriendRequestEmail(
        potentialFriend.username,
        potentialFriend.email
      );
    } catch (lambdaErr) {
      console.error("Email Lambda error:", lambdaErr);
    }

    res.status(201).json(newFriendRequest);
  } catch (error: any) {
    console.log("Error in friends controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { id: friendId } = req.params;
    const userId = req.user.id;

    const [_, __, updatedFriendRequest, newFriend] = await prisma.$transaction([
      prisma.friendShip.create({
        data: { userId, friendId },
      }),
      prisma.friendShip.create({
        data: { userId: friendId, friendId: userId },
      }),
      prisma.friendRequest.update({
        where: {
          senderId_receiverId: {
            senderId: friendId,
            receiverId: userId,
          },
        },
        data: {
          status: "ACCEPTED",
        },
        select: {
          id: true,
          receiver: {
            select: {
              fullName: true,
            },
          },
        },
      }),

      prisma.user.findFirst({
        where: {
          id: friendId,
        },
        select: {
          id: true,
          fullName: true,
          profilePic: true,
          username: true,
          email: true,
        },
      }),
    ]);

    const receiverSocketId = getReceiverSocketId(friendId);

    console.log(receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "acceptedFriendship",
        updatedFriendRequest,
        newFriend
      );
    }

    if (newFriend) {
      try {
        await acceptedFriendRequestEmail(newFriend.username, newFriend.email);
      } catch (lambdaErr) {
        console.error("Email Lambda error:", lambdaErr);
      }
    }

    res.status(200).json(newFriend);
  } catch (error: any) {
    console.error("Error in acceptFriendRequest:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReceivedFriendRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            username: true,
            fullName: true,
            profilePic: true,
          },
        },
        status: true,
        receiverId: true,
      },
    });

    res.status(200).json(requests);
  } catch (error: any) {
    console.error("Error in getFriendRequest:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSentFriendRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.friendRequest.findMany({
      where: {
        senderId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        receiver: {
          select: {
            id: true,
            username: true,
            fullName: true,
            profilePic: true,
          },
        },
        status: true,
      },
    });

    res.status(200).json(requests);
  } catch (error: any) {
    console.error("Error in getFriendRequest:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
