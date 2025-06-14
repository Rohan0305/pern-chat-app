import { Request, Response } from "express";
import prisma from "../db/prisma.js";

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
      },
    });

    if (!potentialFriend) {
      res.status(400).json({ error: "User does not exist" });
      return;
    }

    const friendShip = await prisma.friendShip.findUnique({
      where: {
        userId_friendId: {
          userId: senderId,
          friendId: potentialFriend.id,
        },
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
    });
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
    console.log(friendId);
    const userId = req.user.id;
    console.log(userId);
    const [id1, id2] = [userId, friendId].sort();

    await prisma.$transaction([
      prisma.friendShip.create({
        data: {
          userId: id1,
          friendId: id2,
        },
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
      }),
    ]);
    console.log("HERE");
    res.status(200).json({ message: "Friend request accepted." });
  } catch (error: any) {
    console.error("Error in acceptFriendRequest:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.friendRequest.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
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
