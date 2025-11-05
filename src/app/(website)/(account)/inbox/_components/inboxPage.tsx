/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";

function InboxPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const TOKEN = session?.user?.accessToken || "";

  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesRef = useRef<any[]>([]); // ✅ keep latest messages
  const [unreadCount, setUnreadCount] = useState<{ [key: string]: number }>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  // -------------------- Fetch Conversations --------------------
  const { data: convRes } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/conversation`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const json = await res.json();
      return json.data;
    },
    enabled: !!userId,
  });

  const conversations = convRes || [];
  const selectedConversation = conversations[selectedChat];

  // -------------------- Fetch Messages --------------------
  const fetchMessages = useCallback(async () => {
    if (!selectedConversation) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message/${selectedConversation._id}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    const json = await res.json();
    setMessages(json.data);
    messagesRef.current = json.data; // ✅ sync ref
  }, [selectedConversation?._id, TOKEN]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // -------------------- Socket.IO --------------------
  useEffect(() => {
    if (!userId) return;

    socket.emit("addUser", userId);

    const handleReceiveMessage = (msg: any) => {
      // If current conversation
      if (msg.conversationId === selectedConversation?._id) {
        // ✅ Always update latest state
        messagesRef.current = [...messagesRef.current, msg];
        setMessages([...messagesRef.current]);
      } else {
        // For other conversations, increment unread count
        setUnreadCount((prev) => ({
          ...prev,
          [msg.conversationId]: (prev[msg.conversationId] || 0) + 1,
        }));
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [userId, selectedConversation?._id]);

  // -------------------- Send Message --------------------
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const receiverId = selectedConversation.members.find((m: any) => m._id !== userId)?._id;
    const payload = {
      senderId: userId,
      receiverId,
      conversationId: selectedConversation._id,
      message: messageInput,
    };

    // Send to backend
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    // Emit via socket
    socket.emit("sendMessage", payload);

    // Update UI immediately
    messagesRef.current = [...messagesRef.current, { ...payload, _id: Date.now().toString() }];
    setMessages([...messagesRef.current]);
    setMessageInput("");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // -------------------- Handle Conversation Switch --------------------
  const handleSelectConversation = (index: number) => {
    setSelectedChat(index);
    setUnreadCount((prev) => ({
      ...prev,
      [conversations[index]?._id]: 0,
    }));
  };

  // -------------------- Auto-scroll --------------------
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <BreadcrumbHeader
        title="Inbox"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Inbox", href: "/inbox" },
        ]}
      />

      <div className="flex h-[80vh] container mx-auto py-9 px-10">
        {/* Sidebar */}
        <div className="w-80 bg-white border border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Message ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((c: any, i: number) => {
              const otherUser = c.members.find((m: any) => m._id !== userId);
              return (
                <button
                  key={c._id}
                  onClick={() => {
                    handleSelectConversation(i);
                    setTimeout(fetchMessages, 50); // fetch latest messages
                  }}
                  className={`w-full px-4 py-3 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-50 ${
                    selectedChat === i ? "bg-green-50" : ""
                  }`}
                >
                  <Image
                    width={48}
                    height={48}
                    src={otherUser?.profileImage || "/noavatar.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-medium text-gray-900 truncate">
                      {otherUser?.firstName} {otherUser?.lastName}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">{otherUser?.email}</p>
                  </div>
                  {unreadCount[c._id] > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-2 text-xs">
                      {unreadCount[c._id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white flex flex-col">
          {selectedConversation && (
            <>
              <div className="p-6 border border-gray-200 bg-white flex items-center gap-3">
                <Image
                  width={48}
                  height={48}
                  src={
                    selectedConversation.members.find((m: any) => m._id !== userId)
                      ?.profileImage || "/noavatar.png"
                  }
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedConversation.members.find((m: any) => m._id !== userId)?.firstName}{" "}
                    {selectedConversation.members.find((m: any) => m._id !== userId)?.lastName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedConversation.members.find((m: any) => m._id !== userId)?.email}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                {messages.map((m: any) => {
                  const isSender = m.senderId === userId || m.senderId?._id === userId;
                  return (
                    <div
                      key={m._id}
                      className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`${
                          isSender ? "bg-green-600 text-white" : "bg-gray-200 text-gray-900"
                        } rounded-lg px-4 py-2 max-w-xs`}
                        ref={scrollRef}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 border border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxPage;
